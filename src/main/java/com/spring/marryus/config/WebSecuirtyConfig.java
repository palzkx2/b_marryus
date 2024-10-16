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
                .antMatchers("/api/**", "/**").permitAll()  // "/main" 경로에 대한 접근 허용
                .anyRequest().authenticated()
            )
            .formLogin().disable()  // �⺻ �α��� �� ��Ȱ��ȭ
            .httpBasic().disable()
            .csrf().disable()  // CSRF ��ȣ ��Ȱ��ȭ
            .formLogin().disable()  // 기본 로그인 폼 비활성화
            .httpBasic().disable()	// 기본 HTTP 인증 비활성화
            ;

		return http.build();
		
	}

}
