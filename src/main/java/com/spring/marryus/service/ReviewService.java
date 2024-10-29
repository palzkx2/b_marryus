package com.spring.marryus.service;

import org.springframework.stereotype.Service;

import com.spring.marryus.dao.ReviewRepository;
import com.spring.marryus.entity.Review;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {

	private final ReviewRepository reviewRepository;
	
	public void create(Review review) {
		reviewRepository.save(review);
	}
	
}
