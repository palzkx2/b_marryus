package com.spring.marryus.oauth;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
public class BaseAuthUser {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String picture;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private BaseAuthRole role;
	
	
	
	@Builder
	public BaseAuthUser(String name,String email, String picture, BaseAuthRole role) {
		this.name = name;
		this.email = email;
		this.picture = picture;
		this.role = role;
	}
	
	//회원 정보 수정(구글에 있는 그림같은 것을 바꿧을때 와서 바뀌게끔 함)
	public BaseAuthUser update(String name,String picture) {//이메일은 아이디므로 바뀔수 없다. 이름이나 픽쳐는 바뀔 수있음
		this.name = name;
		this.picture = picture;
		
		return this;//자기 자신에게 반환하라고 함.
	}
	
	public String getRoleKey() {
		return this.role.getKey();//role의 key값 . 즉, ROLE_USER 갖고옴.
	}
}
