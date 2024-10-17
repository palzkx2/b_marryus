package com.spring.marryus.oauth;


import java.util.Arrays;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.entity.Member;

import lombok.RequiredArgsConstructor;
import oracle.jdbc.proxy.annotation.Post;

@RestController
@RequiredArgsConstructor
public class BaseAuthController {
	
	private BaseCustomOAuth2UserService baseCustomOAuth2UserService;
	private BaseAuthUserRepository baseAuthUserRepository;
	
	private final HttpSession httpSession;
	
  @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpServletResponse response;
	
	
	@GetMapping("/api/oauthUserInfo")
	public SessionUser getUserInfo() {
		
		// ���ǿ��� "user"��� �̸����� ����� SessionUser ��ü�� ������
        SessionUser user = (SessionUser) httpSession.getAttribute("oauthUser");
        
      
        	return user;

		
	}
	
	@PostMapping("/api/oauthregister")
	public ResponseEntity<String> insertOauth(@RequestBody BaseAuthUser member){		
	        
			 if(baseAuthUserRepository.findByEmail(member.getEmail())!=null) {
		        	return ResponseEntity.status(HttpStatus.CONFLICT).body("�̹� ��� ���� �̸����Դϴ�.");
		        }
	        
	      
	        
	        return ResponseEntity.status(HttpStatus.CREATED).body("ȸ�������� ���������� �Ϸ�Ǿ����ϴ�.");	        	 
		
	}
	@PostMapping("/api/oauthLogout")
    public void logout(Authentication authentication) {
        // 세션 객체를 가져옵니다.
        HttpSession session = request.getSession(false);
        
        if (session != null) {
            // 세션에 저장된 모든 데이터를 삭제합니다.
            session.invalidate();
        }

        // 쿠키 삭제
        Cookie cookie = new Cookie("JSESSIONID", null); // 삭제할 쿠키의 이름
        cookie.setMaxAge(0); // 쿠키의 유효 시간을 0으로 설정
        cookie.setPath("/"); // 쿠키의 경로를 설정 (필요에 따라 조정)
        response.addCookie(cookie); // 응답에 쿠키 추가하여 삭제 요청

        // 추가적인 로그아웃 처리 (예: SecurityContext에서 인증 정보 삭제)
        SecurityContextHolder.clearContext();
    }
	
	
	
}
