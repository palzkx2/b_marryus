package com.spring.marryus.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.spring.marryus.entity.WeddingHall;

public interface WeddingHallRepository extends JpaRepository<WeddingHall, Long>{
	List<WeddingHall> findAllByOrderByIdDesc();
	WeddingHall findByName(String name);
	List<WeddingHall> findByNameContainingIgnoreCase(String name);
	Optional<WeddingHall> findByImgPath(String imgPath);
    List<WeddingHall> findByImgType(String imgType);
	
	// 최신 등록순 (등록 날짜 기준 내림차순)
    @Query("SELECT w FROM WeddingHall w ORDER BY w.created DESC")
    List<WeddingHall> findAllByOrderByCreatedAtDesc();

    // 평점순 (평점 기준 내림차순)
    @Query("SELECT w FROM WeddingHall w ORDER BY w.rating DESC")
    List<WeddingHall> findAllByOrderByRatingDesc();

    // 낮은 가격순 (가격 기준 오름차순)
    @Query("SELECT w FROM WeddingHall w ORDER BY w.price ASC")
    List<WeddingHall> findAllByOrderByPriceAsc();

    // 높은 가격순 (가격 기준 내림차순)
    @Query("SELECT w FROM WeddingHall w ORDER BY w.price DESC")
    List<WeddingHall> findAllByOrderByPriceDesc();
}
