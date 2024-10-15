package com.spring.marryus.oauth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class OauthSuccessController {
	
	@GetMapping("/OauthSuccess")
	public String oauthSuccess() {

		return "OauthSucces";
	}

}
