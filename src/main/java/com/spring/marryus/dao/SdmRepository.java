package com.spring.marryus.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.dto.SdmDTO;

public interface SdmRepository extends JpaRepository<SdmDTO, Long>{
	
	

}
