package com.spring.marryus.oauth;


import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BaseAuthController {
	
	private BaseCustomOAuth2UserService baseCustomOAuth2UserService;
	
	 private final HttpSession httpSession;
	
	
	
	@GetMapping("/api/oauthUserInfo")
	public SessionUser getUserInfo() {
		
		// ���ǿ��� "user"��� �̸����� ����� SessionUser ��ü�� ������
        SessionUser user = (SessionUser) httpSession.getAttribute("oauthUser");

		return user;
		
	}
	
	
	
}
