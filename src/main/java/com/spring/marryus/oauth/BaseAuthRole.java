package com.spring.marryus.oauth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BaseAuthRole {
	
	GUEST("ROLE_GUEST","�մ�"),
	USER("ROLE_USER","�Ϲ� �����");
	
	private final String key;//ROLE_GUEST , ROLE_USER
	private final String title;//�մ� , �Ϲ� �����
	 //DB �� ������ GUEST, USER �� ��.
	

}
