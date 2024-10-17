package com.spring.marryus.oauth;


import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class OauthSuccessController {
	
	 private final HttpSession httpSession;
	 
	 @Autowired
	 private final BaseAuthUserRepository baseAuthUserRepository;
		
	
	@GetMapping("/OauthSuccess")
	public String oauthSuccess() {
		
		 int flag = 1;
		
		 SessionUser user = (SessionUser) httpSession.getAttribute("oauthUser");
		 
		 List<BaseAuthUser> lists = baseAuthUserRepository.findAll();
		 
		 Iterator<BaseAuthUser> iterator = lists.iterator();

		 while (iterator.hasNext()) {
			 
		     BaseAuthUser user1 = iterator.next();

		     if(user1.getAddr()==null) {
		    	 flag=0;
		     }
		 }
		 System.out.println("데이터가 있는지 검증하기-------");
		 System.out.println(flag + "데이터가 있니? 없니?");
		 
		 if(flag==1) {
			 
			 return "OauthSucces";
			 
		 }else {
			 
			 return "OauthSingUp";
		 }
		
	}

}
