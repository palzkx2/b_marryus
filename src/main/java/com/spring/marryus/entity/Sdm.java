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
	private String Name;
	
	@Column(nullable = false)
	private String addr;
	
	@Column
	private Integer rating;
	
	@Column
	private String tag;
	
	@Column(nullable = false)
	private String category; //스튜디오, 드레스, 메이크업 분류해서 입력

}
