package com.spring.marryus.service;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.spring.marryus.dao.ReviewRepository;
import com.spring.marryus.dao.UserRecommendationRepository;
import com.spring.marryus.dao.WeddingHallRepository;
import com.spring.marryus.entity.Review;
import com.spring.marryus.entity.ReviewDTO;
import com.spring.marryus.entity.UserRecommendation;
import com.spring.marryus.entity.WeddingHall;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

	private final ReviewRepository reviewRepository;
	private final WeddingHallRepository weddingHallRepository;
	private final UserRecommendationRepository userRecommendationRepository;
	
	@Transactional
    public boolean toggleRecommendation(String email, Long reviewId) {
        boolean exists = userRecommendationRepository.existsByEmailAndReviewId(email, reviewId);
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new IllegalArgumentException("Invalid review ID"));

        if (exists) {
            userRecommendationRepository.deleteByEmailAndReviewId(email, reviewId);
            review.setRecommendCount(review.getRecommendCount() - 1); // 추천 수 감소
        } else {
            UserRecommendation recommendation = new UserRecommendation();
            recommendation.setEmail(email);
            recommendation.setReviewId(reviewId);
            userRecommendationRepository.save(recommendation);
            review.setRecommendCount(review.getRecommendCount() + 1); // 추천 수 증가
        }

        reviewRepository.save(review); // 변경된 추천 수 저장
        return !exists; // 추천 상태 반환
    }
	

    public boolean isRecommended(String email, Long reviewId) {
        return userRecommendationRepository.existsByEmailAndReviewId(email, reviewId);
    }
	
	public Review create(Review review) {
		return reviewRepository.save(review);
	}
	
	public List<Review> findByWeddingHallName(String weddingHallName){
		return reviewRepository.findByWeddingHallName(weddingHallName);
	}
	
	public void deleteReview(Long id) {
		reviewRepository.findById(id);
	}
	
	public Review updateReview(Long id, Review review) {
		
		Review r1 = reviewRepository.getById(id);
		
		r1.setContent(review.getContent());
		r1.setCreated(review.getCreated());
		r1.setRating(review.getRating());

		return reviewRepository.save(r1);
		
	}
	
	public void averageReview(String weddingHallName) {
		
		double average = reviewRepository.findAverageRatingByWeddingHallName(weddingHallName);
		System.out.println("평균 나왔나 : " + average);
		
		// 평균을 String으로 변환
        String averageRatingString = String.valueOf(average);
        
        // wedding_hall 테이블 업데이트
        WeddingHall weddingHall = weddingHallRepository.findByName(weddingHallName);
        
        if (weddingHall != null) {
        	
            weddingHall.setRating(averageRatingString);
            weddingHallRepository.save(weddingHall);
            System.out.println("업데이트 완료: " + weddingHallName + "의 평균 평점 " + averageRatingString + " 저장됨.");
            
        } else {
            System.out.println("해당 wedding hall을 찾을 수 없습니다: " + weddingHallName);
        }
        
	}

	public Review getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid review ID"));
    }
	
}
