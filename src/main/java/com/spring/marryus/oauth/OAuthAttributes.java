package com.spring.marryus.oauth;

import java.util.Map;


import lombok.Builder;
import lombok.Getter;

@Getter
public class OAuthAttributes {
	
	private Map<String, Object> attributes;
	
	private String nameAttributeKey;
	private String name;
	private String email;
	private String picture;
	
	//오버로딩된 생성자 만듬
	@Builder
	public OAuthAttributes(Map<String, Object> attributes,
			String nameAttributeKey, String name,String email, String picture) {
		this.attributes = attributes;
		this.nameAttributeKey = nameAttributeKey;
		this.name= name;
		this.email = email;
		this.picture = picture;
	}
	
	//구글,카카오,네이버 등을 구분(데이터의 모양이 다름)
	public static OAuthAttributes of(String registrationId,
			String userNameAttributeName,
			Map<String, Object> attributes) {
		
		if(registrationId.equals("kakao")) {
			return ofKakao(userNameAttributeName,attributes);//(id)
		}else if(registrationId.equals("naver")) {
			return ofNaver("id",attributes);
		}
		
		return ofGoogle(userNameAttributeName,attributes);
	}
	
	private static OAuthAttributes ofNaver(String userNameAttributeName,
			Map<String, Object> attributes ) {
		
		Map<String, Object> response =
				(Map<String, Object>)attributes.get("response");
		
		return OAuthAttributes.builder()
				.name((String)response.get("name"))
				.email((String)response.get("email"))
				.picture((String)response.get("profile_image"))
				.attributes(response)
				.nameAttributeKey(userNameAttributeName)
				.build();
	}
	
	private static OAuthAttributes ofKakao(String userNameAttributeName,
			Map<String, Object> attributes) {
		
		//사용자의 정보가 맵으로 구성되어 있기때문에 받을때도 맵으로 받아줘야 함.
			
		Map<String, Object> kakaoAccount = 
				(Map<String, Object>)attributes.get("kakao_account");
		
		Map<String, Object> kakaoProfile = 
				(Map<String, Object>)kakaoAccount.get("profile");//kakao_account 안의 profile을 받아냄.
		
		return OAuthAttributes.builder()
				.name((String)kakaoProfile.get("nickname"))
				.email("emailTest@test.com")
				.picture((String)kakaoProfile.get("profile_image_url"))
				.attributes(attributes)
				.nameAttributeKey(userNameAttributeName)
				.build();
	
	}
	
	
	
	private static OAuthAttributes ofGoogle(String userNameAttributeName,
			Map<String, Object> attributes) {//구글의 정보를 받아 반환해줌 . 이 메소드는 위에서 실행
		
		return OAuthAttributes.builder()
				.name((String)attributes.get("name"))
				.email((String)attributes.get("email"))
				.picture((String)attributes.get("picture"))
				.attributes(attributes)
				.nameAttributeKey(userNameAttributeName)
				.build();
		
	}
	
	public BaseAuthUser toEntity() {//구글을 통해서 들어올때의 가입정보가 GUEST임. ROLE에서의 값임.
		//가입할떄의 기본 권한이 GUEST가 되는 것임.
		//이것이 엔티티를 통해서 role 컬럼에 저장되는 것이다.
		
		return BaseAuthUser.builder()
				.name(name)
				.email(email)
				.picture(picture)
				.role(BaseAuthRole.GUEST)
				.build();
	}
	

}
