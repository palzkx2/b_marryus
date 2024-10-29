package com.spring.marryus.controller;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.entity.Review;
import com.spring.marryus.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReviewController {
	
	private final ReviewService reviewService;
	
	@PostMapping("/api/createReview")
	public String create(@RequestBody Review review) {
		
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		String formattedDateTime = now.format(formatter);
		
		review.setCreated(formattedDateTime);
		
		System.out.println("웨딩홀 이름 : " + review.getWeddingHallName());
		
		reviewService.create(review);
		
		return "리뷰추가완료";
		
	}
	
	@GetMapping("/api/list")
	public void list() {
		
	}

}
