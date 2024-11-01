package com.spring.marryus.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "payments")
public class Payment {

	 	@Id
	 	@GeneratedValue(strategy = GenerationType.AUTO)
	    private Long id;

	    private String impUid;
	    private String merchantUid;
	    private BigDecimal amount;
	    private BigDecimal cancelAmount;
	    private String status;
	    private String payMethod;
	    private LocalDateTime paidAt;
	    private LocalDateTime cancelledAt;
	    private String failReason;
	    private String cancelReason;
	    private String receiptUrl;
		
	   
}
