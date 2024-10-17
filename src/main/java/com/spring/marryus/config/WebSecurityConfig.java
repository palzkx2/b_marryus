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
            .csrf().disable()  // CSRF ��ȣ ��Ȱ��ȭ
            .headers().frameOptions().disable() // H2 �ܼ��� ����ϱ� ���� frame options ��Ȱ��ȭ
            .and()
            .authorizeHttpRequests((requests) -> requests
                .antMatchers("/**", "/css/**", "/images/**", "/js/**", "/h2-console/**").permitAll()  // Ư�� ��� ���
                .antMatchers("/api/vi/**").hasRole(BaseAuthRole.USER.name())  // USER ���Ҹ� ���
                .anyRequest().authenticated()  // ��� ��û�� ���� �ʿ�
            )
            .logout()
                .logoutUrl("/api/logout")  // �α׾ƿ� URL ����
                .logoutSuccessUrl("/")  // �α׾ƿ� ���� �� �̵��� URL
                .invalidateHttpSession(true)  // ���� ��ȿȭ
                .deleteCookies("JSESSIONID")  // JSESSIONID ��Ű ����
            .and()
            .oauth2Login()
                .defaultSuccessUrl("/OauthSuccess")  // OAuth �α��� ���� �� �̵��� URL
                .userInfoEndpoint()
                    .userService(baseCustomOAuth2UserService);  // ����� ���� ���� ����

        return http.build();
    }
}
