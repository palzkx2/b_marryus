package com.spring.marryus.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.marryus.dao.SdmRepository;
import com.spring.marryus.dto.SdmDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SdmService {
	
	private final SdmRepository sdmRepository;
	
	public List<SdmDTO> getList() {
		
		return sdmRepository.findAll();
		
	}

}
