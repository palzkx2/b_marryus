package com.spring.marryus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.spring.marryus.dao.ReviewRepository;
import com.spring.marryus.entity.ReviewDTO;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	
	
	 // 리뷰 저장
    public ReviewDTO saveReview(ReviewDTO review) {
        return reviewRepository.save(review);
    }

    // 리뷰 조회
    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll();
    }

    // 리뷰 ID로 조회
    public ReviewDTO getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    // 리뷰 삭제
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    //카테고리와 상품 ID로 리뷰 가져오기
    public List<ReviewDTO> getReviewsByCategoryAndProductId(String category, Long productId) {
        return reviewRepository.findByCategoryAndProductId(category, productId);
    }
    
}
