package com.spring.marryus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.entity.Sdm;
import com.spring.marryus.service.SdmService;

@RestController
public class SdmController {
	
	@Autowired
	private SdmService sdmService;
	
	@GetMapping("/api/sdm")
	public List<Sdm> sdmList() throws Exception {
		
		return sdmService.getList();
		
	}

}
