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
import com.spring.marryus.entity.Member;
import com.spring.marryus.entity.Review;
import com.spring.marryus.entity.ReviewDTO;
import com.spring.marryus.entity.Sukso;
import com.spring.marryus.oauth.SessionUser;
import com.spring.marryus.service.MemberService;
import com.spring.marryus.service.Oauth2Service;
import com.spring.marryus.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReviewController {
	
	private final ReviewService reviewService;
	private final Oauth2Service oauth2Service;
	private final MemberService memberService;
	
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
		
		boolean isRecommended = reviewService.toggleRecommendation(email, reviewId); // 추천 상태 토글
	    Review review = reviewService.getReviewById(reviewId); // 리뷰 정보 가져오기
	    
	    Map<String, Object> response = new HashMap<>();
	    response.put("isRecommended", isRecommended); // 추천 상태
	    response.put("recommendCount", review.getRecommendCount()); // 새로운 추천 수
	    
	    return ResponseEntity.ok(response); // 응답 반환
	    
	}
	
	@GetMapping("/api/checkRecommendation")
	public ResponseEntity<Map<String, Boolean>> checkRecommendation(
	    @RequestParam String email,
	    @RequestParam Long reviewId) {
	    
		Map<String, Object> response = new HashMap<>();
	    
	    boolean isRecommended = reviewService.isRecommended(email, reviewId); // 추천 상태 확인
	    response.put("isRecommended", isRecommended);
	    
	    return ResponseEntity.ok(Collections.singletonMap("isRecommended", isRecommended));
	}
	@GetMapping("/api/getAllMyReviews")
	public List<Review> readListSukso(HttpSession session){
		
		// 세션에서 값을 읽어오기
        SessionUser oauthUser = (SessionUser) session.getAttribute("oauthUser");
        Member defaultUser = (Member) session.getAttribute("user");
        
        String userEmail="유저EMAIL";
        String userType = "회원종류";
        
        if (oauthUser != null) {
            System.out.println("OAuth 사용자 이름: " + oauthUser.getName());
            userEmail = oauth2Service.readUser(oauthUser.getEmail()).getEmail();	  
            userType = "oauth";
        } else {
            System.out.println("OAuth 사용자 정보가 세션에 없습니다.");
        }

        if (defaultUser != null) {
            System.out.println("일반 사용자 이름: " + defaultUser.getName());
            userEmail = memberService.readUser(defaultUser.getEmail()).getEmail();
            userType = "default";
        } else {
            System.out.println("일반 사용자 정보가 세션에 없습니다.");
        }
    	
    	return  reviewService.getAllMyReviews(userEmail);
    }

}
