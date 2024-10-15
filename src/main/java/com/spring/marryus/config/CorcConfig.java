package com.spring.marryus.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorcConfig implements WebMvcConfigurer{

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		
		 registry.addMapping("/**") // ��� ��ο� ���� CORS ���
         .allowedOrigins("http://localhost:3000") // ����Ʈ ���� URL
         .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
         .allowCredentials(true);
	}
	
}
