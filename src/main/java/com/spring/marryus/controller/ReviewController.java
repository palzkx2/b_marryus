package com.spring.marryus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.dao.ReviewRepository;
import com.spring.marryus.entity.ReviewDTO;
import com.spring.marryus.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
	
	@Autowired
    private ReviewService reviewService;
	
	@Autowired
    private ReviewRepository reviewRepository;
	
	// 리뷰 추가
    @PostMapping("/create")
    public ResponseEntity<ReviewDTO> createReview(@RequestBody ReviewDTO review) {
        ReviewDTO savedReview = reviewService.saveReview(review);
        return ResponseEntity.ok(savedReview);
    }

    // 모든 리뷰 조회
    @GetMapping("/all")
    public ResponseEntity<List<ReviewDTO>> getAllReviews() {
        List<ReviewDTO> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }

    // ID로 리뷰 조회
    @GetMapping("/{id}")
    public ResponseEntity<ReviewDTO> getReviewById(@PathVariable Long id) {
        ReviewDTO review = reviewService.getReviewById(id);
        return review != null ? ResponseEntity.ok(review) : ResponseEntity.notFound().build();
    }

    // 리뷰 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id, Authentication authentication) {
    	ReviewDTO existingReview = reviewService.getReviewById(id);
        if (existingReview == null) {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 리뷰를 찾을 수 없음
        }

        // 현재 로그인한 사용자 확인
        String author = existingReview.getAuthor();
        if (author == null || !author.equals(author)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 없음
        }

        // 리뷰 삭제
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build(); // 삭제 성공
    }
    
    // 리뷰 수정 로직 추가
    @PutMapping("/{id}")
    public ResponseEntity<ReviewDTO> updateReview(@PathVariable Long id, @RequestBody ReviewDTO updatedReview, Authentication authentication) {
        ReviewDTO existingReview = reviewService.getReviewById(id);
        if (existingReview == null) {
        	return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 리뷰를 찾을 수 없음
        }

        // 현재 로그인한 사용자 확인
        String author = existingReview.getAuthor();
        if (author == null || !author.equals(author)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 권한 없음
        }

        // 리뷰 수정 로직
        existingReview.setReviewContent(updatedReview.getReviewContent());
        
        // 별점 수정 로직 추가
        if (updatedReview.getRating() != null) {
            existingReview.setRating(updatedReview.getRating());
        }       
        
        ReviewDTO savedReview = reviewService.saveReview(existingReview);
        return ResponseEntity.ok(savedReview);
    }
    
    
    //카테고리와 상품 ID로 리뷰 가져오기
    @GetMapping
    public List<ReviewDTO> getReviews(
        @RequestParam String category,
        @RequestParam Long productId) {
        return reviewService.getReviewsByCategoryAndProductId(category, productId);
    }
    
    // 추천 상태 업데이트
    @PutMapping("/{id}/recommend")
    public ResponseEntity<ReviewDTO> recommendReview(@PathVariable Long id, @RequestBody RecommendationRequest recommendationRequest) {
        ReviewDTO review = reviewService.getReviewById(id);
        if (review == null) {
            return ResponseEntity.notFound().build();
        }

        // 추천 상태 업데이트
        review.setRecommended(recommendationRequest.isRecommended());
        review.setRecommendCount(review.getRecommendCount() + (recommendationRequest.isRecommended() ? 1 : -1)); // 추천 수 업데이트

        ReviewDTO updatedReview = reviewService.saveReview(review);
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
    
    @PostMapping
    public ResponseEntity<ReviewDTO> addReview(@RequestBody ReviewDTO review) {
        ReviewDTO savedReview = reviewRepository.save(review);
        reviewService.updateAverageRating(review.getProductId()); // 평균 별점 업데이트
        return ResponseEntity.ok(savedReview);
    }

    // 특정 상품의 평균 별점 조회
    @GetMapping("/averageRating")
    public ResponseEntity<Integer> getAverageRating(@RequestParam Long productId) {
        int averageRating = reviewService.calculateAverageRating(productId);
        return ResponseEntity.ok(averageRating);
    }
    
    // 내 리뷰 조회
    @GetMapping("/email/{email}")
    public ResponseEntity<List<ReviewDTO>> getReviewsByEmail(@PathVariable String email) {
    	try {
            List<ReviewDTO> reviews = reviewRepository.findByEmail(email);
            
            if (reviews.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(reviews);
            }
            
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            e.printStackTrace(); // 에러 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
