package com.spring.marryus.oauth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BaseAuthRole {
	
	GUEST("ROLE_GUEST","손님"),
	USER("ROLE_USER","일반 사용자");
	
	private final String key;//ROLE_GUEST , ROLE_USER
	private final String title;//손님 , 일반 사용자
	 //DB 에 들어갈때는 GUEST, USER 가 들어감.
	

}
