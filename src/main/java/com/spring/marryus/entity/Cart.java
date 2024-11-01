package com.spring.marryus.entity;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Cart {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    
    private String category;
    
    private String name;
    
    private String price;
    
    private int count;
    
    private String bookDate;
    
    private String userType;
    
    private String userrId;
    
    private String ringMaleSize;
    
    private String ringFemaleSize;
    
    private String suitColor;
    
    private String suitSize;
    
    private String suitPantsSize;
    
    private String suitVest; // 선택
    
    private String suitJacket; // 선택
    
    private String flowerColor;
    
    @ManyToOne // 여러 개의 카트가 하나의 사용자에게 속할 수 있음
    @JoinColumn(name = "user_id") // FK 컬럼 이름 설정
    private Member user;
}
