package com.spring.marryus.config;

import org.apache.catalina.filters.HttpHeaderSecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

//import com.web.oauth.base.service.BaseCustomOAuth2UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecuirtyConfig {
	
//	@Autowired
//	private final BaseCustomOAuth2UserService baseCustomOAuth2UserService;
	
	@Bean
	public SecurityFilterChain configure(HttpSecurity http) throws Exception {
		
		http
		.authorizeHttpRequests((requests) -> requests
                .antMatchers("/api/**", "/**").permitAll()  // "/main" ��ο� ���� ���� ��Ȱ��ȭ
                .anyRequest().authenticated()
            )
            .formLogin().disable()  // �⺻ �α��� �� ��Ȱ��ȭ
            .httpBasic().disable()
            ; // �⺻ ���� ��� ��Ȱ��ȭ
		
		return http.build();
		
	}

}
