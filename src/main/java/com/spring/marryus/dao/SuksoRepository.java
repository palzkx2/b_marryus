package com.spring.marryus.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.Sukso;

public interface SuksoRepository extends JpaRepository<Sukso, Long>{
	 List<Sukso> findByPlaceAndPriceLessThanEqualAndPyongGreaterThanEqual(String region, int price, int pyong);
}
