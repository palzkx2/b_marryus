package com.spring.marryus.controller;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.controller.ReviewDTOController.RecommendationRequest;
import com.spring.marryus.entity.Review;
import com.spring.marryus.entity.ReviewDTO;
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
		
		reviewService.create(review);
		
		return "리뷰추가완료";
		
	}
	
	@GetMapping("/api/listByName")
	public List<Review> listByName(@RequestParam String weddingHallName){
		return reviewService.findByWeddingHallName(weddingHallName);
	}
	
	@DeleteMapping("/api/deleteReview/{id}")
	public void deleteReview(@PathVariable Long id) {
		reviewService.deleteReview(id);
	}
	
	@PostMapping("/api/updateReview/{id}")
	public Review updateReview(@PathVariable Long id,@RequestBody Review review) {
		
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		String formattedDateTime = now.format(formatter);
		
		review.setCreated(formattedDateTime);
		
		return reviewService.updateReview(id, review);
	}
	
	@GetMapping("/api/average")
	public void getAverageReview(@RequestParam String weddingHallName) {
		reviewService.averageReview(weddingHallName);
	}
    
	@PostMapping("/api/toggleRecommendation")
	public ResponseEntity<Map<String, Object>> toggleRecommendation(@RequestParam String email, @RequestParam Long reviewId) {
	    boolean isRecommended = reviewService.toggleRecommendation(email, reviewId);
	    Review review = reviewService.getReviewById(reviewId); // 리뷰 정보 가져오기
	    
	    Map<String, Object> response = new HashMap<>();
	    response.put("isRecommended", isRecommended);
	    response.put("recommendCount", review.getRecommendCount());
	    
	    return ResponseEntity.ok(response);
	}
	
	@GetMapping("/api/checkRecommendation")
	public ResponseEntity<Map<String, Boolean>> checkRecommendation(
	    @RequestParam String email,
	    @RequestParam Long reviewId) {
	    
	    boolean isRecommended = reviewService.isRecommended(email, reviewId);
	    return ResponseEntity.ok(Collections.singletonMap("isRecommended", isRecommended));
	}

}
