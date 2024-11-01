package com.spring.marryus.oauth;

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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.service.Oauth2Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BaseAuthController {
	
	private final BaseCustomOAuth2UserService baseCustomOAuth2UserService;
	private final BaseAuthUserRepository baseAuthUserRepository;
	private final HttpSession httpSession;
	private final Oauth2Service oauth2Service;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpServletResponse response;

	@GetMapping("/api/oauthUserInfo")
	public SessionUser getUserInfo() {
		// 세션에서 "oauthUser" 속성을 가져와 SessionUser 객체로 변환
		
        return (SessionUser) httpSession.getAttribute("oauthUser");
	}
	
	@PostMapping("/api/oauthregister")
	public ResponseEntity<String> insertOauth(@RequestBody BaseAuthUser member) {		
		
		SessionUser sUser = (SessionUser) httpSession.getAttribute("oauthUser");
		
		String email = sUser.getEmail();
		String addr = member.getAddr();
		String emailAgree = member.getEmailAgree();
		String hopeArea =  member.getHopeArea();
		String phone = member.getPhone();
		String weddingDate = member.getWeddingDate();
		
		oauth2Service.updateUser(email, addr, emailAgree, hopeArea, phone, weddingDate);


		
		return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");	        	 
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
	
	@DeleteMapping("/api/oauthDeleteUser")
    public ResponseEntity<String> deleteUser(HttpSession session, HttpServletResponse response) throws IllegalAccessException {
        
        SessionUser user = (SessionUser)session.getAttribute("oauthUser");
        
        String userEmail = user.getEmail();
        
        System.out.println(userEmail);
        
        if(userEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인하지 않은 사용자입니다.");
        }
        
        oauth2Service.deleteUser(userEmail);
        
        // JSESSIONID 쿠키 삭제 (로그아웃)
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);  // 쿠키 삭제
        response.addCookie(cookie);
        
        return ResponseEntity.ok("회원 삭제가 성공적으로 완료되었습니다.");
        
    }
	
	@GetMapping("/api/oauthReaduser")
	public BaseAuthUser updateUserInfo() {
		
		SessionUser user = (SessionUser)httpSession.getAttribute("oauthUser");
		
	
		BaseAuthUser buser = new BaseAuthUser();
		buser = oauth2Service.readUser(user.getEmail());
		
		System.out.println(buser.getEmail());
		System.out.println(buser.getName());
		
		return buser;
	}
	
	
	
	@PostMapping("/api/oauthUpdate")
	public ResponseEntity<String> UpdateOauth(@RequestBody BaseAuthUser member) {		
		
		SessionUser sUser = (SessionUser) httpSession.getAttribute("oauthUser");
		
		String email = sUser.getEmail();
		String addr = member.getAddr();
		String emailAgree = member.getEmailAgree();
		String hopeArea =  member.getHopeArea();
		String phone = member.getPhone();
		String weddingDate = member.getWeddingDate();
		
		oauth2Service.updateUser(email, addr, emailAgree, hopeArea, phone, weddingDate);


		
		return ResponseEntity.status(HttpStatus.CREATED).body("회원수정이 완료되었습니다.");	        	 
	}
}
