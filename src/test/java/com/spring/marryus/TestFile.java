package com.spring.marryus;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestFile {
	
	@GetMapping("/main")
	public List abc() {
		return Arrays.asList("1.테스트1","2.테스트2","3.리액트로 데이터가 넘어가는지");
	}

}
