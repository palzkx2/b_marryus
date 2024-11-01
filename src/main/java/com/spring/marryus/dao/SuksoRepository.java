package com.spring.marryus.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.Sukso;
import com.spring.marryus.entity.WeddingItemDTO;

public interface SuksoRepository extends JpaRepository<Sukso, Long>{
	 List<Sukso> findByPlaceAndPriceLessThanEqualAndPyongGreaterThanEqual(String region, int price, int pyong);
	 Optional<Sukso> findBySname(String sname);
	 
}
