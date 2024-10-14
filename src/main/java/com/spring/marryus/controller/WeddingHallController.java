package com.spring.marryus.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.marryus.service.WeddingHallService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000") // React 애플리케이션의 URL로 변경
@RequiredArgsConstructor
@RestController
public class WeddingHallController {
	
	private final WeddingHallService weddingHallService;
	
	@PostMapping("/api/insertWeddingHall")
	public String insertWeddingHall(@RequestParam("imageName") String imageName,
            @RequestPart("imageFile") MultipartFile imageFile,
            @RequestParam("name") String name,
            @RequestParam("addr") String addr,
            @RequestParam("price") Integer price,
            @RequestParam("buffet") String buffet,
            @RequestParam("tag") String tag) throws Exception {

		// 서비스 메서드를 호출하여 웨딩홀 정보를 추가
		weddingHallService.insert(imageName, imageFile, name, addr, price, buffet, tag);
		return "웨딩홀 입력이 완료되었습니다.";
	}

}
