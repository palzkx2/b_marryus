package com.spring.marryus.oauth;

import java.util.Map;
import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthAttributes {
    
    private Map<String, Object> attributes; // OAuth 인증 시 반환되는 사용자 정보
    private String nameAttributeKey; // 사용자 이름 속성의 키
    private String name; // 사용자 이름
    private String email; // 사용자 이메일
    private String picture; // 사용자 프로필 이미지

    // Builder 패턴을 사용한 생성자
    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey, String name, String email, String picture) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.name = name;
        this.email = email;
        this.picture = picture;
    }

    // OAuth 제공자에 따라 적절한 사용자 정보를 반환
    public static OAuthAttributes of(String registrationId,
                                      String userNameAttributeName,
                                      Map<String, Object> attributes) {
        
        if (registrationId.equals("kakao")) {
            return ofKakao(userNameAttributeName, attributes); // Kakao 사용자 정보 처리
        } else if (registrationId.equals("naver")) {
            return ofNaver("id", attributes); // Naver 사용자 정보 처리
        }
        
        return ofGoogle(userNameAttributeName, attributes); // Google 사용자 정보 처리
    }

    // Naver에서 반환된 사용자 정보를 OAuthAttributes 객체로 변환
    private static OAuthAttributes ofNaver(String userNameAttributeName,
                                            Map<String, Object> attributes) {
        
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        
        return OAuthAttributes.builder()
                .name((String) response.get("name")) // 이름
                .email((String) response.get("email")) // 이메일
                .picture((String) response.get("profile_image")) // 프로필 이미지
                .attributes(response) // 전체 응답 정보
                .nameAttributeKey(userNameAttributeName) // 사용자 이름 속성의 키
                .build();
    }

    // Kakao에서 반환된 사용자 정보를 OAuthAttributes 객체로 변환
    private static OAuthAttributes ofKakao(String userNameAttributeName,
                                            Map<String, Object> attributes) {
        
        // Kakao 계정 정보 추출
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>) kakaoAccount.get("profile"); // 프로필 정보
        
        return OAuthAttributes.builder()
                .name((String) kakaoProfile.get("nickname")) // 닉네임
                .email("emailTest@test.com") // 이메일 (테스트용)
                .picture((String) kakaoProfile.get("profile_image_url")) // 프로필 이미지 URL
                .attributes(attributes) // 전체 응답 정보
                .nameAttributeKey(userNameAttributeName) // 사용자 이름 속성의 키
                .build();
    }

    // Google에서 반환된 사용자 정보를 OAuthAttributes 객체로 변환
    private static OAuthAttributes ofGoogle(String userNameAttributeName,
                                             Map<String, Object> attributes) {
        
        return OAuthAttributes.builder()
                .name((String) attributes.get("name")) // 이름
                .email((String) attributes.get("email")) // 이메일
                .picture((String) attributes.get("picture")) // 프로필 이미지
                .attributes(attributes) // 전체 응답 정보
                .nameAttributeKey(userNameAttributeName) // 사용자 이름 속성의 키
                .build();
    }

    // OAuthAttributes를 BaseAuthUser 엔티티로 변환
    public BaseAuthUser toEntity() {
        return BaseAuthUser.builder()
                .name(name) // 이름
                .email(email) // 이메일
                .picture(picture) // 프로필 이미지
                .role(BaseAuthRole.GUEST) // 기본 역할: GUEST
                .build();
    }
}
