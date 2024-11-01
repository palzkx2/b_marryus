package com.spring.marryus.entity;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PaymentDTO {

	 	private String impUid;
	    private String merchantUid;
	    private BigDecimal amount;
	    private String status;
	    private String payMethod;
	    private LocalDateTime paidAt;
	    private String receiptUrl;
	


}
