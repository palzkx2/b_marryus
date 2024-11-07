package com.spring.marryus.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
		  	
		 //System.out.println("호출됨");
		 //System.out.println("호출됨");
		 //System.out.println("호출됨");
		 
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
	            //System.out.println("OAuth 사용자 이름: " + oauthUser.getName());
	            userId = oauth2Service.readUser(oauthUser.getEmail()).getId().toString();	  
	            userType = "oauth";
	        } else {
	            //System.out.println("OAuth 사용자 정보가 세션에 없습니다.");
	        }

	        if (defaultUser != null) {
	            //System.out.println("일반 사용자 이름: " + defaultUser.getName());
	            userId = memberService.readUser(defaultUser.getEmail()).getId().toString();
	            userType = "default";
	        } else {
	            //System.out.println("일반 사용자 정보가 세션에 없습니다.");
	        }
	        
	        cart.getRingFemaleSize();
	        cart.getRingMaleSize();
	        
	        
	        cartService.addCart(userId, productCount, userType, category, productName, productPrice);
	        
	    }
	 
	 @PostMapping("/api/addWeddingItemCart")
	    public void addWeddingItemCart(@RequestBody Cart cart, HttpSession session) {

		 System.out.println("호출됨");
		 
	        // 세션에서 값을 읽어오기
	        SessionUser oauthUser = (SessionUser) session.getAttribute("oauthUser");
	        Member defaultUser = (Member) session.getAttribute("user");
	        
	        String userId="유저ID";
	        int productCount = 1;
	        String userType = "회원종류";       	        

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
	        
	        cartService.addWeddingItemCart(userId, productCount, userType,
	        		cart.getCategory(), cart.getName(), cart.getPrice(), cart);
        
	    }
	 
	
	@GetMapping("/api/readCart")
	public List<Cart> cartList(HttpSession session){
		
		SessionUser oauthUser = (SessionUser) session.getAttribute("oauthUser");
        Member defaultUser = (Member) session.getAttribute("user");
        
        String userId="유저ID";
        String userType = "회원종류";
        
        // 세션에서 읽은 값이 null이 아닌지 확인
        if (oauthUser != null) {
            //System.out.println("OAuth 사용자 이름: " + oauthUser.getName());
            userId = oauth2Service.readUser(oauthUser.getEmail()).getId().toString();	  
            userType = "oauth";
            return cartService.readCarts(userId, userType);
        } else {
            //System.out.println("OAuth 사용자 정보가 세션에 없습니다.");
        }

        if (defaultUser != null) {
            //System.out.println("일반 사용자 이름: " + defaultUser.getName());
            userId = memberService.readUser(defaultUser.getEmail()).getId().toString();
            userType = "default";
            return cartService.readCarts(userId, userType);
        } else {
            //System.out.println("일반 사용자 정보가 세션에 없습니다.");
        }
        
		
		return null;
	}
	
	//삭제 메서드 추가
    @DeleteMapping("/api/deleteCart/{id}")
    public ResponseEntity<String> deleteCart(@PathVariable Long id) {
    	
    	//System.out.println("장바구니 삭제 메서드 실행 확인");
    	
        // 삭제할 숙소가 존재하는지 확인
        if (!cartService.existsById(id)) {
            return ResponseEntity.status(404).body("장바구니 내역을 찾을 수 없습니다.");
        }

        // 숙소 삭제
        cartService.deleteCartById(id);
        
        return ResponseEntity.ok("장바구니 내역이 성공적으로 삭제되었습니다.");
    }
    
    
    @GetMapping("/api/readOneCart")
    public Map<String, Object> readOneCart(HttpSession session,@RequestParam String name){
    	SessionUser oauthUser = (SessionUser) session.getAttribute("oauthUser");
        Member defaultUser = (Member) session.getAttribute("user");
        
        String userId="유저ID";
        String userType = "회원종류";
        
        // 세션에서 읽은 값이 null이 아닌지 확인
        if (oauthUser != null) {
            userId = oauth2Service.readUser(oauthUser.getEmail()).getId().toString();	  
            userType = "oauth";           
        }
        if (defaultUser != null) {
            userId = memberService.readUser(defaultUser.getEmail()).getId().toString();
            userType = "default";    
        }
        System.out.println("유저Id" + userId);
        System.out.println("회원 종류" + userType);
        System.out.println("웨딩홀 이름"+name);
        
        Cart c = cartService.getReadOneCart(name, userId, userType);
        
        Map<String, Object> hMap = new HashMap<String, Object>();
        
        hMap.put("id", c.getId());
        hMap.put("category", c.getCategory());
        hMap.put("name", c.getName());
        hMap.put("price", c.getPrice());
        hMap.put("count", c.getCount());
        hMap.put("bookDate", c.getBookDate());
        hMap.put("userType", c.getUserType());
        hMap.put("userrId", c.getUserrId());
//        hMap.put("ringMaleSize", c.getCategory());
//        hMap.put("ringFemaleSize", c.getCategory());
//        hMap.put("suitColor", c.getCategory());
//        hMap.put("suitSize", c.getCategory());
//        hMap.put("suitPantsSize", c.getCategory());
//        hMap.put("suitVest", c.getCategory());
//        hMap.put("suitJacket", c.getCategory());
//        hMap.put("flowerColor", c.getCategory());
        
        return hMap;
    }

}
