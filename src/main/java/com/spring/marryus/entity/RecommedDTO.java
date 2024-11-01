package com.spring.marryus.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RecommedDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long id;

    private Long userId;     // 추천한 사용자 ID
    private Long reviewId;   // 추천된 리뷰 ID


}
