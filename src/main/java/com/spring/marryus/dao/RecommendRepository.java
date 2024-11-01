package com.spring.marryus.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.RecommedDTO;

public interface RecommendRepository extends JpaRepository<RecommedDTO, Long>{

	boolean existsByUserIdAndReviewId(Long userId, Long reviewId);
	
}
