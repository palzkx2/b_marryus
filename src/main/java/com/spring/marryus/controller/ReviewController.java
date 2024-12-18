package com.spring.marryus.controller;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
	
	@PutMapping("/api/{id}/recommend")
    public ResponseEntity<Review> recommendReview(@PathVariable Long id, @RequestBody RecommendationRequest recommendationRequest) {
        Review review = reviewService.getReviewById(id);
        if (review == null) {
            return ResponseEntity.notFound().build();
        }

        // 추천 상태 업데이트
        review.setRecommended(recommendationRequest.isRecommended());
        review.setRecommendCount(review.getRecommendCount() + (recommendationRequest.isRecommended() ? 1 : -1)); // 추천 수 업데이트

        Review updatedReview = reviewService.create(review);
        return ResponseEntity.ok(updatedReview);
    }
    
    public static class RecommendationRequest {
    	
        private boolean recommended;

        public boolean isRecommended() {
            return recommended;
        }

        public void setRecommended(boolean recommended) {
            this.recommended = recommended;
        }
        
    }

}
