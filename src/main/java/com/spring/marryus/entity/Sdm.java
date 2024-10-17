package com.spring.marryus.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sdm")
public class Sdm {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private String imageName;
	
	@Column(nullable = false)
	private String name; // 변수명을 camelCase로 수정
	
	@Column(nullable = false)
	private String addr;
	
	@Column
	private Integer rating;
	
	@Column
	private String tag;
	
	@Column(nullable = false)
	private String category; // 카테고리: 웨딩홀, 스드메, 혼수 컬렉션 등

}
