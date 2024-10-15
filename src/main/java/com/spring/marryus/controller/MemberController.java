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
        	return ResponseEntity.status(HttpStatus.CONFLICT).body("�̹� ��� ���� �̸����Դϴ�.");
        }
        
        Member savedMember = memberService.saveMember(member);
        
        return ResponseEntity.status(HttpStatus.CREATED).body("ȸ�������� ���������� �Ϸ�Ǿ����ϴ�.");
        
    }
	
	// �ߺ� Ȯ�� ��� �߰�
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
    		return ResponseEntity.status(401).body("���̵� �� ��й�ȣ�� Ȯ�����ּ���.");
    	}
    	
    	// ���� ���� �� ���� ���� �� ����� ������ ���ǿ� ����
        HttpSession session = httpRequest.getSession();
        
        session.setAttribute("user", authenticatedMember);
        session.setAttribute("userRole", authenticatedMember.getUserRole()); // userRole�� ���ǿ� ����
    	
    	return ResponseEntity.ok("�α��� ����");
    	
    }
    
    @GetMapping("/api/session")
    public ResponseEntity<Map<String, String>> getSessionData(HttpServletRequest request) {
    	
    	System.out.println("api session ȣ��");
    	
        HttpSession session = request.getSession(false); // ������ ������ null ��ȯ
        
        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        
        Member user = (Member)session.getAttribute("user");
        
        System.out.println("���ǿ� ����� ����� ����: " + user); // �α� �߰�
        
        Map<String, String> response = new HashMap<>();
        
        response.put("userRole", user.getUserRole());
        
        return ResponseEntity.ok(response);
    }

}
