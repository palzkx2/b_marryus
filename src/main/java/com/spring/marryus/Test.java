package com.spring.marryus;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test {
	
	@GetMapping("/api/data")
	public List test() {
		return Arrays.asList("테스트1","2번","데이터넘기기");
	}
	
}
