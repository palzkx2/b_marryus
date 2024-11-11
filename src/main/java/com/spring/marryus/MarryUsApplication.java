package com.spring.marryus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MarryUsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MarryUsApplication.class, args);
	}

}
