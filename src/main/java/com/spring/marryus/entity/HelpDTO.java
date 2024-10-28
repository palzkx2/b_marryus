package com.spring.marryus.entity;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class HelpDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;
	
	@Column(name = "num")
	private int num;//순번
	
	@Column(name = "name")
	private String name;//작성자
	
	@Column(name = "pwd")
	private String pwd;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "subject")
	private String subject;//제목
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "hitCount")
	private int hitCount;//조회수
	
	@Column(name = "created")
	private String created;//작성일

}
