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

//���ۺ��� ���� �����͸� �����۾��Ͽ� �̸�,�̸��� ���� ����� ����.
//�����̹Ƿ� �����ؾ���.
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
		
		//���� �α����� �����ϴ� �÷���(google,kakao,naver)
		String registragtionId = 
				userRequest.getClientRegistration().getRegistrationId();
		
		//OAuth2 �α��� ����ÿ� key�� �Ǵ� �ʵ尪(primary key����)
		//����:sub��� ������ �Ѿ��.
		//���̹�: response��� ������ �Ѿ��.
		//īī��: id��� ������ �Ѿ��.
		String userNameAttributeName = 
				userRequest
				.getClientRegistration()
				.getProviderDetails()
				.getUserInfoEndpoint()
				.getUserNameAttributeName();
		
		//�ʵ尪�� Ȯ��
		System.out.println(userNameAttributeName + " ���� ��� ���� ? �����̸� SUB�� ");
		
		//�α����� ���� ������ OAuth2User�� �Ӽ��� ��Ƶδ� of �޼ҵ�. (OAuthAttributesŬ�������� ���� �޼ҵ���)
		OAuthAttributes attributes =
				OAuthAttributes.of(registragtionId,
						userNameAttributeName,
						oAuth2User.getAttributes());
		
		//������� �Ӽ� Ȯ��(Json ������ ������)
		System.out.println(attributes.getAttributes());
		
		
		//������� �Ӽ��� authUser ��ü�� ����(����� ������ ����)
		BaseAuthUser authUser = saveOrUpdate(attributes);
		
		//���ǿ� ����� ������ �����ϱ� ���� DTO Ŭ����
		httpSession.setAttribute("oauthUser", new SessionUser(authUser));
		
		return new DefaultOAuth2User(
				Collections.singleton(
						new SimpleGrantedAuthority(authUser.getRoleKey())), 
				attributes.getAttributes(), 
				attributes.getNameAttributeKey());
	}
	
	//���� ����� ������ ������Ʈ �Ǿ��� ���� ���� �޼ҵ�
	//������� �̸��̳� ������ ������ ����Ǹ� User�� ��ƼƼ���� �ݿ���
	private BaseAuthUser saveOrUpdate(OAuthAttributes attributes) {
		
		BaseAuthUser authUser =
				baseAuthUserRepository.findByEmail(attributes.getEmail())
				.map(entity -> entity.update(attributes.getName(), 
						attributes.getPicture()))
				.orElse(attributes.toEntity());
		
		return baseAuthUserRepository.save(authUser);
		
	}
	
	
	

	

	
}
