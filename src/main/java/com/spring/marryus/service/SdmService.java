package com.spring.marryus.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.spring.marryus.dao.SdmRepository;
import com.spring.marryus.entity.Sdm;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SdmService {
	
	private final SdmRepository sdmRepository;
	
	public List<Sdm> getList() {
		
		return sdmRepository.findAll();
		
	}

}
