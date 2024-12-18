package com.spring.marryus.controller;

import java.io.File;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.marryus.entity.WeddingHall;
import com.spring.marryus.service.WeddingHallService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000") // React 애플리케이션의 URL을 허용
@RequiredArgsConstructor
@RestController
public class WeddingHallController {
    
    private String imagePath = "C:/marryus/weddingHall";
    
    private final WeddingHallService weddingHallService;
    
    @PostMapping("/api/insertWeddingHall")
    public String insertWeddingHall(@RequestParam("imageName") String imageName,
            @RequestPart("imageFile") MultipartFile imageFile,
            @RequestParam("name") String name,
            @RequestParam("addr") String addr,
            @RequestParam("price") Integer price,
            @RequestParam("buffet") String buffet,
            @RequestParam("tag") String tag,
            @RequestParam("wido") String wido,
            @RequestParam("gyungdo") String gyungdo,
            @RequestParam("imgType") String imgType,
            @RequestParam("created") Instant created) throws Exception {
    	
    	LocalDateTime createdDateTime = LocalDateTime.ofInstant(created, ZoneId.systemDefault());

        // 웨딩홀 정보를 DB에 추가
        weddingHallService.insert(imageName, imageFile, name, addr, price, buffet, tag, wido, gyungdo, imgType, createdDateTime);
        return "웨딩홀 정보가 성공적으로 등록되었습니다.";
    }
    
    // 모든 웨딩홀 목록 반환
    @GetMapping("/api/images")
    public ResponseEntity<List<WeddingHall>> getImages(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "imgType", required = false) String imgType,
            @RequestParam(value = "sortType", required = false) String sortType,
            @RequestParam(value = "search", required = false) String search) {

    	List<WeddingHall> weddingHalls;

        if (search != null && !search.trim().isEmpty()) {
            // 검색어가 있을 경우 카테고리와 정렬 기준 무시하고 검색
            weddingHalls = weddingHallService.searchWeddingHall(search);
        } else {
            // 카테고리와 정렬 기준에 따라 이미지 반환
            weddingHalls = weddingHallService.getImages(category, imgType, sortType);
        }

        return ResponseEntity.ok(weddingHalls);
        
    }
    
    // 유효한 sortType인지 확인하는 메서드
    @SuppressWarnings("unused")
	private boolean isValidSortType(String sortType) {
        return sortType.equals("POPULAR") || sortType.equals("RECENT") || sortType.equals("RATING"); // 추가할 수 있음
    }
    
    // 특정 이미지 반환
    @GetMapping("/api/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename){
        
        File file = new File(imagePath, filename); // 요청한 파일 경로
        
        if (file.exists()) {
            Resource resource = new FileSystemResource(file);
            MediaType mediaType = MediaType.IMAGE_JPEG; // 기본 MIME 타입 (JPEG)

            // 파일 확장자에 따라 MIME 타입 결정
            if (filename.endsWith(".png")) {
                mediaType = MediaType.IMAGE_PNG;
            } else if (filename.endsWith(".gif")) {
                mediaType = MediaType.IMAGE_GIF;
            } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
                mediaType = MediaType.IMAGE_JPEG;
            }

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build(); // 파일이 없으면 404 반환
        }
        
    }
    
    // 이름으로 웨딩홀 정보 검색
    @GetMapping("/api/weddingHall/{name}")
    public ResponseEntity<WeddingHall> getWeddingHallByName(@PathVariable String name) {
        WeddingHall weddingHall = weddingHallService.getWeddingHallByName(name);
        return weddingHall != null ? ResponseEntity.ok(weddingHall) : ResponseEntity.notFound().build();
    }
    
    // 이름으로 웨딩홀 검색
    @GetMapping("/api/searchWeddingHall")
    public ResponseEntity<List<WeddingHall>> searchWeddingHall(@RequestParam String name){
        
        List<WeddingHall> results = weddingHallService.searchWeddingHall(name);
        
        if(results.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.ok(results);
        
    }
    
    @DeleteMapping("/api/deleteWeddingHall")
    public ResponseEntity<String> deleteWeddingHall(@RequestParam String imgPath){
        
        boolean isDeleted = weddingHallService.deleteWeddingHall(imgPath);
        System.out.println("imgPath 요청된 경로------------------" + imgPath);
        
        if(isDeleted) {
            return ResponseEntity.ok("웨딩홀이 성공적으로 삭제되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 웨딩홀의 이름을 찾을 수 없습니다.");
        }
        
    }
    
    @GetMapping("/api/sorted")
    public ResponseEntity<List<WeddingHall>> getSortedWeddingHalls(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String imgType,
            @RequestParam(required = false) String sortType) {
        
        List<WeddingHall> weddingHalls;

        if (sortType == null || sortType.isEmpty()) {
            // 기본 정렬 처리 로직
            weddingHalls = weddingHallService.getImages(category, imgType, null);
        } else {
            switch (sortType) {
                case "newest":
                    weddingHalls = weddingHallService.getWeddingHallsSortedByNewest();
                    break;
                case "rating":
                    weddingHalls = weddingHallService.getWeddingHallsSortedByRating();
                    break;
                case "lowPrice":
                    weddingHalls = weddingHallService.getWeddingHallsSortedByLowestPrice();
                    break;
                case "highPrice":
                    weddingHalls = weddingHallService.getWeddingHallsSortedByHighestPrice();
                    break;
                default:
                    return ResponseEntity.badRequest().body(null); // 잘못된 요청 처리
            }
        }

        return ResponseEntity.ok(weddingHalls);
    }
    
    // imgType에 따른 데이터를 가져오는 엔드포인트
    @GetMapping("/api/category")
    public ResponseEntity<List<WeddingHall>> getImagesByCategory(@RequestParam(value = "imgType") String imgType) {
        
        List<WeddingHall> images = weddingHallService.getImagesByCategory(imgType);
        return ResponseEntity.ok(images);
        
    }

}
