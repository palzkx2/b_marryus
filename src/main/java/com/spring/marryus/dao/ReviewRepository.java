package com.spring.marryus.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{

}
