package com.spring.marryus.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserRecommendation {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    private String email;  // 추천한 사용자 이메일
    
    @Column(name = "review_id")
    private Long reviewId;

}
