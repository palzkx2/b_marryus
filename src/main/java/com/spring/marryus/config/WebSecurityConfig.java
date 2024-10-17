package com.spring.marryus.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.spring.marryus.oauth.BaseAuthRole;
import com.spring.marryus.oauth.BaseCustomOAuth2UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final BaseCustomOAuth2UserService baseCustomOAuth2UserService;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // CSRF 보호 비활성화
            .headers().frameOptions().disable() // H2 콘솔에 대한 frame options 비활성화
            .and()
            .authorizeHttpRequests((requests) -> requests
                .antMatchers("/**", "/css/**", "/images/**", "/js/**", "/h2-console/**").permitAll()  // 모든 요청 허용
                .antMatchers("/api/v1/**").hasRole(BaseAuthRole.USER.name())  // USER 역할이 필요한 요청
                .anyRequest().authenticated()  // 그 외 요청은 인증 필요
            )
            .logout()
                .logoutUrl("/api/logout")  // 로그아웃 URL 설정
                .logoutSuccessUrl("/")  // 로그아웃 성공 후 리다이렉트할 URL
                .invalidateHttpSession(true)  // 세션 무효화
                .deleteCookies("JSESSIONID")  // JSESSIONID 쿠키 삭제
            .and()
            .oauth2Login()
                .defaultSuccessUrl("/OauthSuccess")  // OAuth 로그인 성공 후 리다이렉트할 URL
                .userInfoEndpoint()
                    .userService(baseCustomOAuth2UserService);  // 사용자 정보 서비스 설정

        return http.build();
    }
}
