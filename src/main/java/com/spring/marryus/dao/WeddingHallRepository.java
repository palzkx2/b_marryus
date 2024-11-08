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
}
