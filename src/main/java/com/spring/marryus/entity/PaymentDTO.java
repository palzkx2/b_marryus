package com.spring.marryus.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentDTO {
		
	 	private String impUid;
	 	private String name;
	    private BigDecimal amount;
	    private String status;
		
	 // 생성자 추가
	    public PaymentDTO(String impUid, String name, BigDecimal amount, String status) {
	        this.impUid = impUid;
	        this.name = name;
	        this.amount = amount;
	        this.status = status;
	    }
	   
	
}
