package com.spring.marryus.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.UserRecommendation;

public interface UserRecommendationRepository extends JpaRepository<UserRecommendation, Long> {
	boolean existsByEmailAndReviewId(String email, Long reviewId);
    void deleteByEmailAndReviewId(String email, Long reviewId);
}
