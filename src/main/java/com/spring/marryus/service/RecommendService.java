package com.spring.marryus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.marryus.dao.RecommendRepository;
import com.spring.marryus.entity.RecommedDTO;

@Service
public class RecommendService {

	@Autowired
    private RecommendRepository recommendationRepository;

    // 추천 저장
    public RecommedDTO saveRecommendation(RecommedDTO recommendation) {
        return recommendationRepository.save(recommendation);
    }

    // 특정 사용자와 리뷰의 추천 여부 확인
    public boolean hasRecommended(Long userId, Long reviewId) {
        return recommendationRepository.existsByUserIdAndReviewId(userId, reviewId);
    }
    
}
