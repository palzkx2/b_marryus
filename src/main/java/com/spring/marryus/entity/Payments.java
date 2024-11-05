package com.spring.marryus.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
@Table(name = "payments")
public class Payments {

	 	@Id
	 	@GeneratedValue(strategy = GenerationType.AUTO)
	    private Long payment_id;
	 	
	 	@Column(name = "imp_uid")
	    private String impUid;
	    private String name;	   
	    private BigDecimal amount;
	   	private String status;
	   	
	   	public Payments(PaymentDTO dto){
	   		this.impUid=dto.getImpUid();
	   		this.amount=dto.getAmount();
	   		this.name=dto.getName();
	   		this.status=dto.getStatus();
	   	}
  
}

//private String payMethod;
//private LocalDateTime paidAt;
//private LocalDateTime cancelledAt;
//private String failReason;
//private String cancelReason;
//private String receiptUrl;
//private String merchantUid;


