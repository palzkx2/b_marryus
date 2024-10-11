package com.spring.marryus.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.dao.SdmRepository;
import com.spring.marryus.dto.SdmDTO;
import com.spring.marryus.service.SdmService;

@RestController
public class SdmController {
	
	private SdmService sdmService;
	
	@GetMapping("/api/sdm")
	public String sdmList() throws Exception {
		
		System.out.println("lists받아올거야");
		
//		List<SdmDTO> lists = sdmService.getList();
		
		System.out.println("lists받아지냐");
//		System.out.println(lists);
		
		return "서버 호출됨";
		
	}

}
