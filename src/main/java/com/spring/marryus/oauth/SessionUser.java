package com.spring.marryus.oauth;

import java.io.Serializable;

import lombok.Getter;

@Getter
public class SessionUser implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String name;
	private String email;
	private String picture;
	
	public SessionUser(BaseAuthUser user) {
		this.name = user.getName();
		this.email = user.getEmail();
		this.picture = user.getPicture();
	}

}