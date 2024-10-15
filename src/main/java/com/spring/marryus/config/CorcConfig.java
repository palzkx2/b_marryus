package com.spring.marryus.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorcConfig implements WebMvcConfigurer{

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		
		 registry.addMapping("/**") // 모든 경로에 대해 CORS 허용
         .allowedOrigins("http://localhost:3000") // 리액트 앱의 URL
         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
         .allowCredentials(true);
	}
	
}
