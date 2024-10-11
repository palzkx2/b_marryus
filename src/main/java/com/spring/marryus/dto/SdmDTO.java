package com.spring.marryus.dto;

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
public class SdmDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String imageName;
	
	@Column(nullable = false)
	private String Name;
	
	@Column(nullable = false)
	private String addr;
	
	@Column
	private String like;
	
	@Column
	private String tag;
	
	@Column(nullable = false)
	private String category; //��Ʃ���, �巹��, ����ũ�� �з��ؼ� �Է�

}
