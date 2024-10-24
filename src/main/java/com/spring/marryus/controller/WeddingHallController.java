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
    public ResponseEntity<Page<WeddingHall>> getImages(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "9") int size){
        Pageable pageable = PageRequest.of(page, size);
        Page<WeddingHall> imagePage = weddingHallService.getImages(pageable);
        return ResponseEntity.ok(imagePage);
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
    public ResponseEntity<Page<WeddingHall>> searchWeddingHall(@RequestParam String name, Pageable pageable){
        
        Page<WeddingHall> results = weddingHallService.searchWeddingHall(name, pageable);
        
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
    public Page<WeddingHall> getSortedWeddingHalls(@RequestParam String sortType,@PageableDefault(size = 9) Pageable pageable) {
    	
    	System.out.println("sortType넘어왔나------------" + sortType);
    	
        switch (sortType) {
            case "newest":
                return weddingHallService.getWeddingHallsSortedByNewest(pageable);
            case "rating":
                return weddingHallService.getWeddingHallsSortedByRating(pageable);
            case "lowPrice":
                return weddingHallService.getWeddingHallsSortedByLowestPrice(pageable);
            case "highPrice":
                return weddingHallService.getWeddingHallsSortedByHighestPrice(pageable);
            default:
                throw new IllegalArgumentException("Invalid sort type: " + sortType);
        }
        
    }
    
    // imgType에 따른 데이터를 가져오는 엔드포인트
    @GetMapping("/api/category")
    public ResponseEntity<Page<WeddingHall>> getImagesByCategory(@RequestParam(value = "imgType") String imgType,Pageable pageable) {
        
        Page<WeddingHall> images = weddingHallService.getImagesByCategory(imgType, pageable);
        return ResponseEntity.ok(images);
        
    }

}
