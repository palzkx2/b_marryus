package com.spring.marryus.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
    	
    	String email = loginData.get("email");
    	String password = loginData.get("password");
    	
    	Member authenticatedMember = memberService.authenticate(email, password);
    	
    	if(authenticatedMember == null) {
    		return ResponseEntity.status(401).body("아이디 및 비밀번호를 확인해주세요.");
    	}
    	
    	// 인증 성공 시 세션 생성 및 사용자 정보를 세션에 저장
        HttpSession session = httpRequest.getSession();
        
        session.setAttribute("user", authenticatedMember);
        session.setAttribute("userRole", authenticatedMember.getUserRole()); // userRole을 세션에 저장
    	
    	return ResponseEntity.ok("로그인 성공");
    	
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
