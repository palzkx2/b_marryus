package com.spring.marryus.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class WeddingHall {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String imageName;
	
	private String name;
	
	private String addr;
	
	private Integer rating;
	
	@Column(length = 100)
	private Integer price;
	
	private String buffet; // 뷔페 종류 (뷔페, 한정식, 석식, 조식)
	
	private String tag;
	
	private String imgPath;
	
	private String wido; // 시도
	private String gyungdo; // 경도
	
	private String imgType;

}
