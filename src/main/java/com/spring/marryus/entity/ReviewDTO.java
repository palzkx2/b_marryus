package com.spring.marryus.entity;

import java.time.LocalDateTime;

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
public class ReviewDTO {
	
	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "review_content")
    private String reviewContent;//리뷰내용

    @Column(nullable = false)
    private Integer rating;//별점

    private String category;//카테고리
    private String subcategory;//세부카테고리
    
    @Column(name = "product_id")
    private Long productId;//리뷰상품id
    
    private String author;//작성자
    
    @Column(name = "product_name")
    private String productName;//리뷰상품

    private boolean recommended;//추천
    
    private int recommendCount; 

    @Column(name = "created_at")
    private String createdAt;//작성날짜
    
    private String email;

}
