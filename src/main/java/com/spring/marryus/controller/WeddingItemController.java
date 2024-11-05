package com.spring.marryus.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.marryus.dao.WeddingItemRepository;
import com.spring.marryus.entity.WeddingItemDTO;
import com.spring.marryus.service.WeddingItemService;

@RestController
@RequestMapping("/api")
public class WeddingItemController {
    
    @Autowired
    private WeddingItemService weddingItemService;
    
    @Autowired
    private WeddingItemRepository weddingItemRepository;
    
    @GetMapping("/weddingItem")
    public List<WeddingItemDTO> getWeddingItems(@RequestParam(required = false) String category) {
        if (category != null) {
            return weddingItemService.getItemsByCategory(category);
        } else {
            return weddingItemService.getAllItems();
        }
    }
    
    @GetMapping("/weddingItem/{id}")
    public ResponseEntity<WeddingItemDTO> getWeddingItemById(@PathVariable Long id) {
        WeddingItemDTO item = weddingItemService.findById(id);
        if (item != null) {
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/weddingItem/{id}/details")
    public ResponseEntity<List<WeddingItemDTO>> getItemCategoryDetails(@PathVariable Long id) {
        String category = weddingItemService.getCategoryById(id);
        List<WeddingItemDTO> details = weddingItemService.getCategoryDetails(category);
        return ResponseEntity.ok(details);
    }
    
    @PostMapping("/weddingItem")
    public ResponseEntity<String> addWeddingItem(
            @RequestParam("item") String itemJson,
            @RequestParam("image") MultipartFile image) {
        
        // JSON 문자열을 WeddingItem 객체로 변환
        WeddingItemDTO item = parseJsonToWeddingItem(itemJson);
        
        // 이미지 파일 처리 (저장 로직 등)
        String category = item.getCategory();
        String uploadDir = "C:\\Users\\itwill\\git\\b_marryus\\src\\main\\marryus\\public\\s_images\\weddingItem\\"+ category + "\\"; // 실제 경로로 변경
        try {
            File uploadFile = new File(uploadDir + image.getOriginalFilename());
            image.transferTo(uploadFile);
            item.setImgName(item.getImgName()); // 상품 이름을 imgName에 설정
            item.setImgAddr("/s_images/weddingItem/" + item.getCategory() + "/" + image.getOriginalFilename());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 중 오류 발생");
        }

        // 이미지 파일 처리 (저장 로직 등)
        // 이 예시에서는 메타데이터만 DB에 저장
        weddingItemRepository.save(item);
        return ResponseEntity.status(HttpStatus.CREATED).body("아이템이 추가되었습니다!");
    }
    
 // DELETE 요청 처리
    @DeleteMapping("/weddingItem/{id}")
    public ResponseEntity<String> deleteWeddingItem(@PathVariable Long id) {
        if (!weddingItemRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("아이템을 찾을 수 없습니다.");
        }
        
        weddingItemRepository.deleteById(id);
        return ResponseEntity.ok("아이템이 삭제되었습니다.");
    }

    private WeddingItemDTO parseJsonToWeddingItem(String itemJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(itemJson, WeddingItemDTO.class);
        } catch (IOException e) {
            throw new RuntimeException("JSON 파싱 오류", e);
        }
    }
    
}
