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
            .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // ���� ���� ��å
        .and()
        .csrf() // CSRF ��ȣ ��� Ȱ��ȭ
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()) // CSRF ��ū�� ��Ű�� ����
        .and()
        .headers().frameOptions().disable() // X-Frame-Options ��Ȱ��ȭ
        .and()
        .authorizeRequests()
            .antMatchers("/api/**", "/**").permitAll() // ��� ��û ���
            .antMatchers("/api/vi/**").hasRole(com.spring.marryus.oauth.BaseAuthRole.USER.name()) // Ư�� API ��ο� ���� ����
            .anyRequest().authenticated() // ������ ��û�� ���� �ʿ�
        .and()
        .logout()
            .logoutUrl("/api/logout") // �α׾ƿ� ��û URL ����
            .logoutSuccessUrl("/") // �α׾ƿ� ���� �� �����̷�Ʈ�� URL
            .invalidateHttpSession(true) // ���� ��ȿȭ
            .deleteCookies("JSESSIONID") // ���� ��Ű ����
            .permitAll() // ��� ����ڿ��� �α׾ƿ� ���
        .and()
        .formLogin().disable() // �⺻ �α��� �� ��Ȱ��ȭ
        .httpBasic().disable() // �⺻ ���� ��� ��Ȱ��ȭ
        .oauth2Login()
            .defaultSuccessUrl("http://localhost:8080/OauthSuccess") // OAuth2 �α��� ���� �� �����̷�Ʈ�� URL
            .userInfoEndpoint()
                .userService(baseCustomOAuth2UserService); // ����� ���� ���� ����
		
//		http
//		.authorizeHttpRequests((requests) -> requests
//                .antMatchers("/api/**", "/**").permitAll()  // "/main" ��ο� ���� ���� ��Ȱ��ȭ
//                .anyRequest().authenticated()
//            )
//            .formLogin().disable()  // �⺻ �α��� �� ��Ȱ��ȭ
//            .httpBasic().disable()
//            .csrf().disable().headers().frameOptions().disable()  // CSRF ��ȣ ��Ȱ��ȭ
//            .and()
//            .authorizeRequests()
//            .antMatchers("/api/vi/**").hasRole(com.spring.marryus.oauth.BaseAuthRole.USER.name())
//            .logout()
//            .logoutUrl("/api/logout")
//            .logoutSuccessUrl("/") //�α׾ƿ� ������ ���ư��� ������ URL
//            .invalidateHttpSession(true)
//            .deleteCookies("JSESSIONID")
//            ; // �⺻ ���� ��� ��Ȱ��ȭ
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
//	    .logoutUrl("/api/logout") // �α׾ƿ� ��û URL ����
//	    .logoutSuccessUrl("/") // �α׾ƿ� ���� �� �����̷�Ʈ�� URL
//	    .invalidateHttpSession(true) // ���� ��ȿȭ
//	    .deleteCookies("JSESSIONID") // ���� ��Ű ����
//	    .permitAll()
//		.and()
//		.oauth2Login().defaultSuccessUrl("http://localhost:8080/OauthSuccess").userInfoEndpoint().userService(baseCustomOAuth2UserService)
//		;
		
		return http.build();
		
	}

}
