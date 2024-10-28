package com.spring.marryus.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.entity.Cart;
import com.spring.marryus.entity.Member;
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
        SessionUser oauthUser = (SessionUser) session.getAttribute("oauthUser");
        Member defaultUser = (Member) session.getAttribute("user");

        String userId = "유저ID";
        String userType = "회원종류";
        
        if (oauthUser != null) {
            userId = oauth2Service.readUser(oauthUser.getEmail()).getId().toString();
            userType = "oauth";
        } else if (defaultUser != null) {
            userId = memberService.readUser(defaultUser.getEmail()).getId().toString();
            userType = "default";
        }
        
        // 카트 추가
        cart.setUserrId(userId);
        cartService.addCart(userId, 1, userType, cart.getCategory(), cart.getName(), cart.getPrice(), cart);
    }

    @GetMapping("/api/readCart")
    public List<Cart> cartList(HttpSession session) {
        SessionUser oauthUser = (SessionUser) session.getAttribute("oauthUser");
        Member defaultUser = (Member) session.getAttribute("user");
        
        String userId = "유저ID";
        String userType = "회원종류";
        
        if (oauthUser != null) {
            userId = oauth2Service.readUser(oauthUser.getEmail()).getId().toString();
            userType = "oauth";
            return cartService.readCarts(userId, userType);
        } else if (defaultUser != null) {
            userId = memberService.readUser(defaultUser.getEmail()).getId().toString();
            userType = "default";
            return cartService.readCarts(userId, userType);
        }
        
        return null;
    }
}
