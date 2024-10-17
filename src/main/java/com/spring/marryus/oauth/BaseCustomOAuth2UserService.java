package com.spring.marryus.oauth;

import java.util.Collections;
import javax.servlet.http.HttpSession;
import org.hibernate.annotations.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BaseCustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    
    @Autowired
    private final BaseAuthUserRepository baseAuthUserRepository;

    @Autowired
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        
        OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = 
                new DefaultOAuth2UserService();
        
        OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
        
        // OAuth2 사용자 등록 ID
        String registrationId = 
                userRequest.getClientRegistration().getRegistrationId();
        
        // OAuth2 사용자 이름 속성 이름
        String userNameAttributeName = 
                userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();
        
        // 디버그: 사용자 이름 속성 이름
        System.out.println(userNameAttributeName + " is the user name attribute for registration ID: " + registrationId);
        
        // OAuth2User 정보 처리
        OAuthAttributes attributes =
                OAuthAttributes.of(registrationId,
                        userNameAttributeName,
                        oAuth2User.getAttributes());
        
        // 디버그: OAuthAttributes
        System.out.println(attributes.getAttributes());
        
        // 사용자 정보 저장 또는 업데이트
        BaseAuthUser authUser = saveOrUpdate(attributes);
        
        // 세션에 사용자 정보 저장
        httpSession.setAttribute("oauthUser", new SessionUser(authUser));
        
        return new DefaultOAuth2User(
                Collections.singleton(
                        new SimpleGrantedAuthority(authUser.getRoleKey())), 
                attributes.getAttributes(), 
                attributes.getNameAttributeKey());
    }
    
    // 사용자 저장 또는 업데이트
    private BaseAuthUser saveOrUpdate(OAuthAttributes attributes) {
        
        BaseAuthUser authUser =
                baseAuthUserRepository.findByEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getName(), 
                        attributes.getPicture()))
                .orElse(attributes.toEntity());
        
        return baseAuthUserRepository.save(authUser);
    }
}
