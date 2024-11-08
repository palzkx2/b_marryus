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
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class BaseAuthUser {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column(nullable = true)
	private String name;
	
	@Column(nullable = true)
	private String email;
	
	@Column(nullable = true)
	private String picture;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private BaseAuthRole role;
	
	private String addr;
	
	private String phone;
	private String hopeArea;
	private String weddingDate;
	private String emailAgree;
	
	@Builder
	public BaseAuthUser(String name, String email, String picture, BaseAuthRole role) {
		this.name = name;
		this.email = email;
		this.picture = picture;
		this.role = role;
	}
	
	// 사용자 정보를 업데이트하는 메서드
	public BaseAuthUser update(String name, String picture) {
		this.name = name; // 이름 업데이트
		this.picture = picture; // 사진 업데이트
		
		return this; // 업데이트된 객체 반환
	}
	
	// 역할의 키 값을 반환하는 메서드
	public String getRoleKey() {
		return this.role.getKey(); // role의 key 반환
	}
}
