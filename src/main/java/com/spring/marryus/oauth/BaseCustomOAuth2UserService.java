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

//구글부터 받은 데이터를 분해작업하여 이름,이메일 등을 갖고올 것임.
//서비스이므로 구현해야함.
@Service
@RequiredArgsConstructor
public class BaseCustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	
	@Autowired
	private  final BaseAuthUserRepository baseAuthUserRepository;

	@Autowired
	private final HttpSession httpSession;
	
	
	
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = 
				new DefaultOAuth2UserService();
		
		OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
		
		//간편 로그인을 진행하는 플렛폼(google,kakao,naver)
		String registragtionId = 
				userRequest.getClientRegistration().getRegistrationId();
		
		//OAuth2 로그인 진행시에 key가 되는 필드값(primary key역할)
		//구글:sub라는 변수로 넘어옴.
		//네이버: response라는 변수로 넘어옴.
		//카카오: id라는 변수로 넘어옴.
		String userNameAttributeName = 
				userRequest
				.getClientRegistration()
				.getProviderDetails()
				.getUserInfoEndpoint()
				.getUserNameAttributeName();
		
		//필드값을 확인
		System.out.println(userNameAttributeName + " 뭐가 들어 오냐 ? 구글이면 SUB로 ");
		
		//로그인을 통해 가져온 OAuth2User의 속성을 담아두는 of 메소드. (OAuthAttributes클래스에서 만든 메소드임)
		OAuthAttributes attributes =
				OAuthAttributes.of(registragtionId,
						userNameAttributeName,
						oAuth2User.getAttributes());
		
		//응답받은 속성 확인(Json 형태의 데이터)
		System.out.println(attributes.getAttributes());
		
		
		//응답받은 속성을 authUser 객체에 넣음(사용자 정보에 넣음)
		BaseAuthUser authUser = saveOrUpdate(attributes);
		
		//세션에 사용자 정보를 저장하기 위한 DTO 클래스
		httpSession.setAttribute("oauthUser", new SessionUser(authUser));
		
		return new DefaultOAuth2User(
				Collections.singleton(
						new SimpleGrantedAuthority(authUser.getRoleKey())), 
				attributes.getAttributes(), 
				attributes.getNameAttributeKey());
	}
	
	//구글 사용자 정보가 업데이트 되었을 때를 위한 메소드
	//사용자의 이름이나 프로필 사진이 변경되면 User의 엔티티에도 반영됨
	private BaseAuthUser saveOrUpdate(OAuthAttributes attributes) {
		
		BaseAuthUser authUser =
				baseAuthUserRepository.findByEmail(attributes.getEmail())
				.map(entity -> entity.update(attributes.getName(), 
						attributes.getPicture()))
				.orElse(attributes.toEntity());
		
		return baseAuthUserRepository.save(authUser);
		
	}
	
	
	

	

	
}
