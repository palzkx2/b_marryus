package com.spring.marryus.oauth;


import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<SessionUser> getUserInfo() {
		
		System.out.println("api oauthUserInfo ȣ��");
		
		// ���ǿ��� "user"��� �̸����� ����� SessionUser ��ü�� ������
        SessionUser user = (SessionUser) httpSession.getAttribute("oauthUser");
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // ������ ���� ��� 401 ��ȯ
        }
        
        System.out.println("OAuth���ǿ� ����� ����� ����" + user);

		return ResponseEntity.ok(user);
		
	}
	
	
	
}
