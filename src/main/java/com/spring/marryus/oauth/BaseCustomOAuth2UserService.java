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

//占쏙옙占쌜븝옙占쏙옙 占쏙옙占쏙옙 占쏙옙占쏙옙占싶몌옙 占쏙옙占쏙옙占쌜억옙占싹울옙 占싱몌옙,占싱몌옙占쏙옙 占쏙옙占쏙옙 占쏙옙占쏙옙占� 占쏙옙占쏙옙.
//占쏙옙占쏙옙占싱므뤄옙 占쏙옙占쏙옙占쌔억옙占쏙옙.
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
		
		//占쏙옙占쏙옙 占싸깍옙占쏙옙占쏙옙 占쏙옙占쏙옙占싹댐옙 占시뤄옙占쏙옙(google,kakao,naver)
		String registragtionId = 
				userRequest.getClientRegistration().getRegistrationId();
		
		//OAuth2 占싸깍옙占쏙옙 占쏙옙占쏙옙첼占� key占쏙옙 占실댐옙 占십드값(primary key占쏙옙占쏙옙)
		//占쏙옙占쏙옙:sub占쏙옙占� 占쏙옙占쏙옙占쏙옙 占싼억옙占�.
		//占쏙옙占싱뱄옙: response占쏙옙占� 占쏙옙占쏙옙占쏙옙 占싼억옙占�.
		//카카占쏙옙: id占쏙옙占� 占쏙옙占쏙옙占쏙옙 占싼억옙占�.
		String userNameAttributeName = 
				userRequest
				.getClientRegistration()
				.getProviderDetails()
				.getUserInfoEndpoint()
				.getUserNameAttributeName();
		
		//占십드값占쏙옙 확占쏙옙
		System.out.println(userNameAttributeName + " 占쏙옙占쏙옙 占쏙옙占� 占쏙옙占쏙옙 ? 占쏙옙占쏙옙占싱몌옙 SUB占쏙옙 ");
		
		//占싸깍옙占쏙옙占쏙옙 占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙 OAuth2User占쏙옙 占쌈쇽옙占쏙옙 占쏙옙틉灌占� of 占쌨소듸옙. (OAuthAttributes클占쏙옙占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙 占쌨소듸옙占쏙옙)
		OAuthAttributes attributes =
				OAuthAttributes.of(registragtionId,
						userNameAttributeName,
						oAuth2User.getAttributes());
		
		//占쏙옙占쏙옙占쏙옙占� 占쌈쇽옙 확占쏙옙(Json 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙)
		System.out.println(attributes.getAttributes());
		
		
		//占쏙옙占쏙옙占쏙옙占� 占쌈쇽옙占쏙옙 authUser 占쏙옙체占쏙옙 占쏙옙占쏙옙(占쏙옙占쏙옙占� 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙)
		BaseAuthUser authUser = saveOrUpdate(attributes);
		
		//占쏙옙占실울옙 占쏙옙占쏙옙占� 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占싹깍옙 占쏙옙占쏙옙 DTO 클占쏙옙占쏙옙
		
	
		httpSession.setAttribute("oauthUser", new SessionUser(authUser));
		
		return new DefaultOAuth2User(
				Collections.singleton(
						new SimpleGrantedAuthority(authUser.getRoleKey())), 
				attributes.getAttributes(), 
				attributes.getNameAttributeKey());
	}
	
	//占쏙옙占쏙옙 占쏙옙占쏙옙占� 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙트 占실억옙占쏙옙 占쏙옙占쏙옙 占쏙옙占쏙옙 占쌨소듸옙
	//占쏙옙占쏙옙占쏙옙占� 占싱몌옙占싱놂옙 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙占쏙옙 占쏙옙占쏙옙퓔占� User占쏙옙 占쏙옙티티占쏙옙占쏙옙 占쌥울옙占쏙옙
	private BaseAuthUser saveOrUpdate(OAuthAttributes attributes) {
		
		BaseAuthUser authUser =
				baseAuthUserRepository.findByEmail(attributes.getEmail())
				.map(entity -> entity.update(attributes.getName(), 
						attributes.getPicture()))
				.orElse(attributes.toEntity());
		
		return baseAuthUserRepository.save(authUser);
		
	}
	
	

	
	
	
	

	

	
}
