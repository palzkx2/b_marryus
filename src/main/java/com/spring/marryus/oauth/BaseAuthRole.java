package com.spring.marryus.oauth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BaseAuthRole {
	
	GUEST("ROLE_GUEST", "손님"),
	USER("ROLE_USER", "사용자");
	
	private final String key; // ROLE_GUEST, ROLE_USER
	private final String title; // 손님, 사용자
	// DB에 저장될 때는 GUEST, USER로 저장됩니다.
}
