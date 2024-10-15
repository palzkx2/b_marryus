package com.spring.marryus.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.entity.Member;
import com.spring.marryus.service.MemberService;

@RestController
public class MemberController {
	
	@Autowired
	private MemberService memberService;
	
	@PostMapping("/api/register")
    public ResponseEntity<String> registerMember(@RequestBody Member member) {
        
        if(memberService.checkEmailExists(member.getEmail())) {
        	return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 이메일입니다.");
        }
        
        Member savedMember = memberService.saveMember(member);
        
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 성공적으로 완료되었습니다.");
        
    }
	
	// 중복 확인 기능 추가
    @GetMapping("/api/checkEmail")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
    	
        boolean exists = memberService.checkEmailExists(email);
        
        return ResponseEntity.ok(exists);
        
    }
    
    @PostMapping("/api/login")
    public ResponseEntity<String> login(HttpServletRequest httpRequest, @RequestBody Map<String, String> loginData) {
    	
    	// 세션 존재 여부 확인
        HttpSession session = httpRequest.getSession(false);
        if (session != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 로그인 상태입니다.");
        }
    	
    	String email = loginData.get("email");
    	String password = loginData.get("password");
    	
    	Member authenticatedMember = memberService.authenticate(email, password);
    	
    	if(authenticatedMember == null) {
    		return ResponseEntity.status(401).body("아이디 및 비밀번호를 확인해주세요.");
    	}
    	
    	// 인증 성공 시 세션 생성 및 사용자 정보를 세션에 저장
        session = httpRequest.getSession();
        
        session.setAttribute("user", authenticatedMember);
        session.setAttribute("userRole", authenticatedMember.getUserRole()); // userRole을 세션에 저장
        session.setAttribute("email", authenticatedMember.getEmail());
    	
    	return ResponseEntity.ok("로그인 성공");
    	
    }
    
    @PostMapping("/api/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        // SecurityContext에서 인증 정보를 가져와 로그아웃 처리
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        
        // 현재 세션 무효화
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // JSESSIONID 쿠키 삭제
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/"); // 쿠키의 경로를 설정
        cookie.setMaxAge(0); // 쿠키 만료 시간을 0으로 설정하여 삭제
        response.addCookie(cookie);

        return ResponseEntity.ok("로그아웃 성공");
    }
    
    @DeleteMapping("/api/deleteUser")
    public ResponseEntity<String> deleteUser(HttpSession session, HttpServletResponse response) throws IllegalAccessException {
    	
    	String userEmail = (String)session.getAttribute("email");
    	
    	System.out.println(userEmail);
    	
    	if(userEmail == null) {
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인된 사용자 정보가 없습니다.");
    	}
    	
    	memberService.deleteUser(userEmail);
    	
    	// JSESSIONID 쿠키 삭제 (만료)
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);  // 쿠키 만료
        response.addCookie(cookie);
        
    	return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
    	
    }
    
    
    @GetMapping("/api/session")
    public ResponseEntity<Map<String, String>> getSessionData(HttpServletRequest request) {
    	
    	System.out.println("api session 호출");
    	
        HttpSession session = request.getSession(false); // 세션이 없으면 null 반환
        
        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        
        Member user = (Member)session.getAttribute("user");
        
        System.out.println("세션에 저장된 사용자 정보: " + user); // 로그 추가

        Map<String, String> response = new HashMap<>();

        response.put("userRole", user.getUserRole());
        
        return ResponseEntity.ok(response);
        
    }

}
