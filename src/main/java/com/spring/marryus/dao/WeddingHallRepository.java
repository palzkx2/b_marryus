package com.spring.marryus.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.marryus.entity.WeddingHall;

public interface WeddingHallRepository extends JpaRepository<WeddingHall, Long>{
	Page<WeddingHall> findAllByOrderByIdDesc(Pageable pageable);
	WeddingHall findByName(String name);
	Page<WeddingHall> findByNameContaining(String name, Pageable pageable);
	Optional<WeddingHall> findByImgPath(String imgPath);
	
	// 최신 등록순 (등록 날짜 기준 내림차순)
    @Query("SELECT w FROM WeddingHall w ORDER BY w.created DESC")
    Page<WeddingHall> findAllByOrderByCreatedAtDesc(Pageable pageable);

    // 평점순 (평점 기준 내림차순)
    @Query("SELECT w FROM WeddingHall w ORDER BY w.rating DESC")
    Page<WeddingHall> findAllByOrderByRatingDesc(Pageable pageable);

    // 낮은 가격순 (가격 기준 오름차순)
    @Query("SELECT w FROM WeddingHall w ORDER BY w.price ASC")
    Page<WeddingHall> findAllByOrderByPriceAsc(Pageable pageable);

    // 높은 가격순 (가격 기준 내림차순)
    @Query("SELECT w FROM WeddingHall w ORDER BY w.price DESC")
    Page<WeddingHall> findAllByOrderByPriceDesc(Pageable pageable);
    
    Page<WeddingHall> findByImgType(String imgType, Pageable pageable);
}
