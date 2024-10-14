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

@CrossOrigin(origins = "http://localhost:3000") // React ���ø����̼��� URL�� ����
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

		// ���� �޼��带 ȣ���Ͽ� ����Ȧ ������ �߰�
		weddingHallService.insert(imageName, imageFile, name, addr, price, buffet, tag);
		return "����Ȧ �Է��� �Ϸ�Ǿ����ϴ�.";
	}

}
