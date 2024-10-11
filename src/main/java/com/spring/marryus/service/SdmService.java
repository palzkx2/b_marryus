package com.spring.marryus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.marryus.dao.SdmRepository;
import com.spring.marryus.dto.SdmDTO;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SdmService {
	
	@Autowired
	private final SdmRepository sdmRepository;
	
	public List<SdmDTO> getList() {
		
		return sdmRepository.findAll();
		
	}

}
