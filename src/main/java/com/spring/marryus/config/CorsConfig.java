package com.spring.marryus.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 요청에 대해 CORS 허용
        .allowedOrigins("http://192.168.16.23:3000", "http://localhost:3000") // 필요한 IP를 추가
        .allowedMethods("GET", "POST", "PUT", "DELETE") // 필요한 HTTP 메소드만 허용
        .allowedHeaders("*") // 모든 헤더 허용
        .allowCredentials(true); // 쿠키 인증 정보 허용 (필요 시)
    }
}


/*
 	모든 IP에서 접근을 허용하고자 한다면 allowedOrigins를 와일드카드 *로 설정하면 됩니다. 
 	다만, 일반적인 상용 환경에서는 모든 IP를 허용하는 것은 보안상 위험할 수 있으므로 권장되지 않으며, 
 	특정 도메인만 허용하는 것이 좋습니다. 예를 들어, https://marryus.com과 같은 신뢰할 수 있는 도메인만 
 	허용하는 방식으로 설정하는 것이 일반적입니다.
 */


/*
	사용자 인증이 필요한 경우: 예를 들어 로그인 상태를 유지해야 하거나 민감한 데이터를 다루는 경우 
	allowCredentials(true)로 설정하여 쿠키와 인증 정보를 포함할 수 있게 해야 합니다.
	공개 API 호출인 경우: 특정 정보가 공개되어 인증 없이 누구나 접근할 수 있도록 설계된 API라면 allowCredentials(false)로 
	설정하여 쿠키 없이 접근할 수 있게 할 수 있습니다.
	주의: allowCredentials(true)로 설정할 경우, allowedOrigins에 *을 사용할 수 없습니다. 
	허용된 특정 도메인만을 명시해야 합니다.
*/