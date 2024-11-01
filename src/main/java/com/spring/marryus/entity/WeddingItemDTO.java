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
public class WeddingItemDTO {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    
    @Column(name = "category")
    private String category;
    
        
    @Column(name = "imgAddr")
    private String imgAddr;
    
    @Column(name = "imgName")
    private String imgName;
    
    @Column(name = "price")
    private Integer price;
    
    @Column(name = "rate")
    private int rate;
   
}
