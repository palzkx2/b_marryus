package com.spring.marryus.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.spring.marryus.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
	List<Review> findByWeddingHallName(String weddingHallName);
	Review getById(Long id);
	
	@Query("SELECT AVG(r.rating) FROM Review r WHERE r.weddingHallName = :weddingHallName")
    Double findAverageRatingByWeddingHallName(@Param("weddingHallName") String weddingHallName);
}
