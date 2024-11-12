package com.spring.marryus.service;


import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.spring.marryus.dao.ReviewDTORepository;
import com.spring.marryus.dao.SdmRepository;
import com.spring.marryus.dao.WeddingItemRepository;
import com.spring.marryus.entity.ReviewDTO;
import com.spring.marryus.entity.Sdm;
import com.spring.marryus.entity.WeddingItemDTO;

@Service
public class ReviewDTOService {
	
//	@Autowired
//	private SdmRepository sdmRepository;
	
	
	@Autowired
	private ReviewDTORepository reviewRepository;
	
	@Autowired
	private WeddingItemRepository weddingItemRepository;

	
	
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
    
    //별점수정
    public int calculateAverageRating(Long productId) {
        List<ReviewDTO> reviews = reviewRepository.findByProductId(productId);
        if (reviews.isEmpty()) {
            return 0; // 리뷰가 없으면 0 반환
        }
        double averageRating = reviews.stream().mapToInt(ReviewDTO::getRating).average().orElse(0);
        
        System.out.println("Calculated average rating for productId " + productId + ": " + averageRating);
        
        return (int) Math.round(averageRating); // 정수로 반올림
    }
    
    @Transactional
    public void updateAverageRating(Long productId) {
        int averageRating = calculateAverageRating(productId);
        WeddingItemDTO item = weddingItemRepository.findById(productId)
        		.orElseThrow(() -> new RuntimeException("WeddingItem not found for productId: " + productId));
       
        System.out.println("Updating WeddingItem with productId: " + productId + " to rate: " + averageRating);
        
//        Sdm sdm = sdmRepository.findById(productId)
//                .orElseThrow(() -> new RuntimeException("해당 Sdm 아이템을 찾을 수 없습니다.")); // 예외 메시지 추가
        
        
        //weddingItem
        item.setRate(averageRating);
        weddingItemRepository.save(item);
        
        System.out.println("WeddingItem with productId " + productId + " saved with rate: " + item.getRate());
        
        //sdm
//        sdm.setRating(averageRating);
//        sdmRepository.save(sdm);
    }
    
    // 이메일로 리뷰 가져오기
    public List<ReviewDTO> getReviewsByEmail(String email) {
        return reviewRepository.findByEmail(email); // Repository에서 해당 메서드 호출
    }
    
}