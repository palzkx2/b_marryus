package com.spring.marryus.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

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
import com.spring.marryus.oauth.BaseAuthUser;
import com.spring.marryus.oauth.SessionUser;
import com.spring.marryus.service.MemberService;

@RestController
public class MemberController {
    
    @Autowired
    private MemberService memberService;
    
    @PostMapping("/api/register")
    public ResponseEntity<String> registerMember(@RequestBody Member member) {
        
        if(memberService.checkEmailExists(member.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 이메일입니다.");
        }
        
        Member savedMember = memberService.saveMember(member);
        
        return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 성공적으로 완료되었습니다.");
        
    }
    
    //인증코드 생성, 이메일 전송 메소드
    @PostMapping("/api/sendEmail")
    public ResponseEntity<String> sendEmail(@RequestParam String email) {
    	
    	try {
			
    		String certificationNumber = memberService.sendcertificationEmail(email);
    		return ResponseEntity.ok(certificationNumber);
    		
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 전송 실패");
		}
    	
    }
    
    // 이메일 중복 확인
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
            return ResponseEntity.status(401).body("이메일 또는 비밀번호를 확인해주세요.");
        }
        
        // 인증된 사용자의 정보를 세션에 저장
        HttpSession session = httpRequest.getSession();
        
        session.setAttribute("user", authenticatedMember);
        session.setAttribute("userRole", authenticatedMember.getUserRole()); // userRole도 저장
        session.setAttribute("email", authenticatedMember.getEmail());
        session.setAttribute("name", authenticatedMember.getName());
        session.setAttribute("phone", authenticatedMember.getPhone());
        session.setAttribute("addr", authenticatedMember.getAddr());
        session.setAttribute("hopeArea", authenticatedMember.getHopeArea());
        session.setAttribute("weddingDate", authenticatedMember.getWeddingDate());
        
        System.out.println("세션에 저장된 사용자 정보:");
        System.out.println("userRole: " + session.getAttribute("userRole"));
        System.out.println("email: " + session.getAttribute("email"));
        System.out.println("name: " + session.getAttribute("name"));
        System.out.println("phone: " + session.getAttribute("phone"));
        System.out.println("addr: " + session.getAttribute("addr"));
        System.out.println("hopeArea: " + session.getAttribute("hopeArea"));
        System.out.println("weddingDate: " + session.getAttribute("weddingDate"));
        
        return ResponseEntity.ok("로그인 성공");
        
    }
    
    @GetMapping("/api/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/";
    }
    
    @DeleteMapping("/api/deleteUser")
    public ResponseEntity<String> deleteUser(HttpSession session, HttpServletResponse response) throws IllegalAccessException {
        
        String userEmail = (String)session.getAttribute("email");
        
        System.out.println(userEmail);
        
        if(userEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인하지 않은 사용자입니다.");
        }
        
        memberService.deleteUser(userEmail);
        
        // JSESSIONID 쿠키 삭제 (로그아웃)
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);  // 쿠키 삭제
        response.addCookie(cookie);
        
        return ResponseEntity.ok("회원 삭제가 성공적으로 완료되었습니다.");
        
    }
    
    
    @GetMapping("/api/session")
    public ResponseEntity<Map<String, String>> getSessionData(HttpServletRequest request) {
        
        System.out.println("api session 요청");
        
        HttpSession session = request.getSession(false); // 존재하지 않으면 null 반환
        
        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        
        Member user = (Member)session.getAttribute("user");
        
        System.out.println("인증된 사용자 정보: " + user); // 인증된 사용자 정보 출력

        Map<String, String> response = new HashMap<>();

        response.put("userRole", user.getUserRole());
        response.put("email", user.getEmail());
        response.put("name", user.getName());
        response.put("phone", user.getPhone());
        response.put("addr", user.getAddr());
        response.put("hopeArea", user.getHopeArea());
        response.put("weddingDate", user.getWeddingDate());
        
        return ResponseEntity.ok(response);
    }
    @GetMapping("/api/readUser")
	public Member updateUserInfo(HttpServletRequest httpRequest) {
			
    		HttpSession session = httpRequest.getSession();
			
			Member buser = new Member();
			buser = memberService.readUser((String)session.getAttribute("email"));
			
			System.out.println("세션의 이메일이 잘 넘어오나?");
			System.out.println((String)session.getAttribute("email"));
			
			
			return buser;
		}
    
    
    
    @PostMapping("/api/updateUser")
    public ResponseEntity<String> updateMember(HttpServletRequest httpRequest, @RequestBody Member member) {
    	
    	String name = member.getName();
		String email = member.getEmail();
		String addr = member.getAddr();
		String emailAgree = member.getEmailAgree();
		String hopeArea =  member.getHopeArea();
		String phone = member.getPhone();
		String weddingDate = member.getWeddingDate();
		String pwd = member.getPassword();
		
		System.out.println("멤버 수정");
		System.out.println(email+"이메일이 잘 넘어왔니?");
		System.out.println(pwd + "비밀번호 잘 넘어 왔나?");
		
		
		memberService.updateUser(email, addr, emailAgree, hopeArea, phone, weddingDate,pwd,name);
		
		 // 인증된 사용자의 정보를 세션에 저장
        HttpSession session = httpRequest.getSession();
        
        session.setAttribute("email", email);
        session.setAttribute("addr", addr);
        session.setAttribute("phone", phone);
        session.setAttribute("hopeArea", hopeArea);
        session.setAttribute("weddingDate", weddingDate);
        
        return ResponseEntity.status(HttpStatus.CREATED).body("회원수정 성공적으로 완료되었습니다.");
        
    }
    
    @GetMapping("/api/findEmail")
    public ResponseEntity<String> findEmail(@RequestParam String name, @RequestParam String phone) {
    	
    	String maskedEmail = memberService.findEmailByNameAndPhone(name, phone);
    	
        if (maskedEmail != null) {
            return ResponseEntity.ok(maskedEmail); // 이메일이 있을 경우
        } else {
            return ResponseEntity.ok(null); // 일치하는 이메일이 없을 경우
        }
    	
    }
    
}
