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
		
		System.out.println("api oauthUserInfo 호출");
		
		// 세션에서 "user"라는 이름으로 저장된 SessionUser 객체를 가져옴
        SessionUser user = (SessionUser) httpSession.getAttribute("oauthUser");
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 세션이 없을 경우 401 반환
        }
        
        System.out.println("OAuth세션에 저장된 사용자 정보" + user);

		return ResponseEntity.ok(user);
		
	}
	
	
	
}
