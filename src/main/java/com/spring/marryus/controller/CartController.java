package com.spring.marryus.controller;

import java.util.HashMap;
import java.util.List;
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

import com.spring.marryus.entity.Cart;
import com.spring.marryus.entity.Member;
import com.spring.marryus.oauth.BaseCustomOAuth2UserService;
import com.spring.marryus.oauth.SessionUser;
import com.spring.marryus.service.CartService;
import com.spring.marryus.service.MemberService;
import com.spring.marryus.service.Oauth2Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CartController {
	
	private final CartService cartService;
	private final Oauth2Service oauth2Service;
	private final MemberService memberService;
	
	 @PostMapping("/api/addCart")
	    public void addCart(@RequestBody Cart cart, HttpSession session) {
	        
	        // 세션에서 값을 읽어오기
	        SessionUser oauthUser = (SessionUser) session.getAttribute("oauthUser");
	        Member defaultUser = (Member) session.getAttribute("user");
	        
	        String userId="유저ID";
	        int productCount = 1;
	        String userType = "회원종류";
	        
	        String category = cart.getCategory();
	        String productName = cart.getName();
	        String productPrice = cart.getPrice();
	        

	        // 세션에서 읽은 값이 null이 아닌지 확인
	        if (oauthUser != null) {
	            System.out.println("OAuth 사용자 이름: " + oauthUser.getName());
	            userId = oauth2Service.readUser(oauthUser.getEmail()).getId().toString();	  
	            userType = "oauth";
	        } else {
	            System.out.println("OAuth 사용자 정보가 세션에 없습니다.");
	        }

	        if (defaultUser != null) {
	            System.out.println("일반 사용자 이름: " + defaultUser.getName());
	            userId = memberService.readUser(defaultUser.getEmail()).getId().toString();
	            userType = "default";
	        } else {
	            System.out.println("일반 사용자 정보가 세션에 없습니다.");
	        }
	        
	        cartService.addCart(userId, productCount, userType, category, productName, productPrice);
	        
	    }
	 
	
	@GetMapping("/api/readCart")
	public List<Cart> cartList(HttpSession session){
		
		SessionUser oauthUser = (SessionUser) session.getAttribute("oauthUser");
        Member defaultUser = (Member) session.getAttribute("user");
        
        String userId="유저ID";
        String userType = "회원종류";
        
        // 세션에서 읽은 값이 null이 아닌지 확인
        if (oauthUser != null) {
            System.out.println("OAuth 사용자 이름: " + oauthUser.getName());
            userId = oauth2Service.readUser(oauthUser.getEmail()).getId().toString();	  
            userType = "oauth";
            return cartService.readCarts(userId, userType);
        } else {
            System.out.println("OAuth 사용자 정보가 세션에 없습니다.");
        }

        if (defaultUser != null) {
            System.out.println("일반 사용자 이름: " + defaultUser.getName());
            userId = memberService.readUser(defaultUser.getEmail()).getId().toString();
            userType = "default";
            return cartService.readCarts(userId, userType);
        } else {
            System.out.println("일반 사용자 정보가 세션에 없습니다.");
        }
        
		
		return null;
	}

}
