package com.spring.marryus.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.WeddingHall;

public interface WeddingHallRepository extends JpaRepository<WeddingHall, Long>{
	Page<WeddingHall> findAllByOrderByIdDesc(Pageable pageable);
	WeddingHall findByName(String name);
	Page<WeddingHall> findByNameContaining(String name, Pageable pageable);
	Optional<WeddingHall> findByImgPath(String imgPath);
}
