package com.spring.marryus.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@JsonInclude(JsonInclude.Include.ALWAYS)
public class Member {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private String name;
	
	private String phone;
	
	private String addr;
	
	private String hopeArea;
	
	@Column(nullable = true)
	private String weddingDate;
	
	private String emailAgree;
	
	private String userRole;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	private List<Cart> carts;

}
