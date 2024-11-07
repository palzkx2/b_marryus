package com.spring.marryus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.spring.marryus.entity.SearchCriteria;
import com.spring.marryus.entity.Sukso;
import com.spring.marryus.service.SuksoService;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SuksoController {

    @Autowired
    private SuksoService suksoService;  // SuksoService 주입

    @PostMapping("/insertSukso")
    public ResponseEntity<String> insertSukso(
        @RequestParam("sname") String sname,
        @RequestParam("hosil") String hosil,
        @RequestParam("price") int price,
        @RequestParam("where") String whereType,
        @RequestParam("place") String place,
        @RequestParam("pyong") int pyong,
        @RequestParam("wido") String wido,
        @RequestParam("gyungdo") String gyungdo,
        @RequestParam("addr") String addr,
        @RequestParam("imgName") MultipartFile imgName) {
    	
    	System.out.println("호출 되냐?");

        // 파일 저장 경로 설정 (원하는 경로로 수정 가능)
        String uploadDir = "C:\\Users\\itwill\\git\\b_marryus\\src\\main\\marryus\\public\\p_images\\travel\\sukso\\";
        
        System.out.println("호출 되냐?11");

        // 파일 저장 로직
        try {
            // 이미지 파일을 지정된 경로에 저장
            File uploadFile = new File(uploadDir + imgName.getOriginalFilename());
            imgName.transferTo(uploadFile);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("파일 업로드 중 오류 발생");
        }
        
        System.out.println("호출 되냐?222");
        
        // Sukso 엔티티 생성 및 데이터 설정
        Sukso sukso = new Sukso();
        sukso.setSname(sname);
        sukso.setHosil(hosil);
        sukso.setPrice(price);
        sukso.setWhereType(whereType);
        sukso.setPlace(place);
        sukso.setPyong(pyong);
        sukso.setWido(wido);
        sukso.setGyungdo(gyungdo);
        sukso.setAddr(addr);
        sukso.setImgName(imgName.getOriginalFilename());
        
        System.out.println("호출 되냐?33");

        // DB에 숙소 정보 저장
        suksoService.saveSukso(sukso);
        
        System.out.println("호출 되냐?44");

        // 클라이언트에게 성공 메시지 반환
        return ResponseEntity.ok("숙소 정보가 성공적으로 등록되었습니다.");
    }
    
    @GetMapping("/readSukso")
    public List<Sukso> readListSukso(){
    	
    	return  suksoService.getAllSukso();
    }
    
    // 숙소 삭제 메서드 추가
    @DeleteMapping("/deleteSukso/{id}")
    public ResponseEntity<String> deleteSukso(@PathVariable Long id) {
    	
    	System.out.println("숙소 삭제 메서드 실행 확인");
    	
        // 삭제할 숙소가 존재하는지 확인
        if (!suksoService.existsById(id)) {
            return ResponseEntity.status(404).body("숙소를 찾을 수 없습니다.");
        }

        // 숙소 삭제
        suksoService.deleteSuksoById(id);
        
        return ResponseEntity.ok("숙소가 성공적으로 삭제되었습니다.");
    }
    @PostMapping("/search")
    public List<Sukso> searchAgencies(@RequestBody SearchCriteria criteria) {
    	
    	System.out.println("가격 범위 : " + criteria.getPriceRange());
    	System.out.println("평점 : " + criteria.getRating());
    	System.out.println("지역 : " + criteria.getRegion());
    	
        
    	return suksoService.searchAgencies(criteria.getRegion(), criteria.getPriceRange(), criteria.getRating());
    }
}
