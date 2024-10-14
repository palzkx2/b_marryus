package com.spring.marryus.entity;

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
	
	private Integer price;
	
	private String buffet; //뷔페 종류 (한식,중식,양식,일식)
	
	private String tag;
	
	private String imgPath;
	
	private String wido;
	
	private String gyungdo;
	
	private String imgType;

}
