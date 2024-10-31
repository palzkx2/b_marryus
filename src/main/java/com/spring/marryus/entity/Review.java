package com.spring.marryus.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.servlet.http.HttpSession;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String weddingHallName;
	
	private String SdmName;
	
	private String HonsuName;
	
	private String travelName;
	
	private String email;
	
	private String name;
	
	private String created;
	
	private String content;
	
	private double rating;

}
