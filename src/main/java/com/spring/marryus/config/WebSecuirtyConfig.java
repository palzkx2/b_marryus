package com.spring.marryus.config;

import org.apache.catalina.filters.HttpHeaderSecurityFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import com.spring.marryus.oauth.BaseCustomOAuth2UserService;

//import com.web.oauth.base.service.BaseCustomOAuth2UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecuirtyConfig {
	
	private final BaseCustomOAuth2UserService baseCustomOAuth2UserService;
	
	@Bean
	public SecurityFilterChain configure(HttpSecurity http) throws Exception {
		
		http
        .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // 세션 관리 정책
        .and()
        .csrf() // CSRF 보호 기능 활성화
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()) // CSRF 토큰을 쿠키에 저장
        .and()
        .headers().frameOptions().disable() // X-Frame-Options 비활성화
        .and()
        .authorizeRequests()
            .antMatchers("/api/**", "/**").permitAll() // 모든 요청 허용
            .antMatchers("/api/vi/**").hasRole(com.spring.marryus.oauth.BaseAuthRole.USER.name()) // 특정 API 경로에 권한 설정
            .anyRequest().authenticated() // 나머지 요청은 인증 필요
        .and()
        .logout()
            .logoutUrl("/api/logout") // 로그아웃 요청 URL 설정
            .logoutSuccessUrl("/") // 로그아웃 성공 후 리다이렉트할 URL
            .invalidateHttpSession(true) // 세션 무효화
            .deleteCookies("JSESSIONID") // 세션 쿠키 삭제
            .permitAll() // 모든 사용자에게 로그아웃 허용
        .and()
        .formLogin().disable() // 기본 로그인 폼 비활성화
        .httpBasic().disable() // 기본 인증 방식 비활성화
        .oauth2Login()
            .defaultSuccessUrl("http://localhost:8080/OauthSuccess") // OAuth2 로그인 성공 시 리다이렉트할 URL
            .userInfoEndpoint()
                .userService(baseCustomOAuth2UserService); // 사용자 정보 서비스 설정
		
//		http
//		.authorizeHttpRequests((requests) -> requests
//                .antMatchers("/api/**", "/**").permitAll()  // "/main" 경로에 대한 인증 비활성화
//                .anyRequest().authenticated()
//            )
//            .formLogin().disable()  // 기본 로그인 폼 비활성화
//            .httpBasic().disable()
//            .csrf().disable().headers().frameOptions().disable()  // CSRF 보호 비활성화
//            .and()
//            .authorizeRequests()
//            .antMatchers("/api/vi/**").hasRole(com.spring.marryus.oauth.BaseAuthRole.USER.name())
//            .logout()
//            .logoutUrl("/api/logout")
//            .logoutSuccessUrl("/") //로그아웃 성공시 돌아가는 페이지 URL
//            .invalidateHttpSession(true)
//            .deleteCookies("JSESSIONID")
//            ; // 기본 인증 방식 비활성화
//		
//		http
//		.csrf().disable().headers().frameOptions().disable()
//		.and()
//		.authorizeRequests()
//		.antMatchers("/api/**", "/**").permitAll()
//		.antMatchers("/api/vi/**").hasRole(com.spring.marryus.oauth.BaseAuthRole.USER.name())
//		.anyRequest().authenticated()
//		.and()
//		.logout()
//	    .logoutUrl("/api/logout") // 로그아웃 요청 URL 설정
//	    .logoutSuccessUrl("/") // 로그아웃 성공 후 리다이렉트할 URL
//	    .invalidateHttpSession(true) // 세션 무효화
//	    .deleteCookies("JSESSIONID") // 세션 쿠키 삭제
//	    .permitAll()
//		.and()
//		.oauth2Login().defaultSuccessUrl("http://localhost:8080/OauthSuccess").userInfoEndpoint().userService(baseCustomOAuth2UserService)
//		;
		
		return http.build();
		
	}

}
