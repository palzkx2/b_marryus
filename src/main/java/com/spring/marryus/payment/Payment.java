package com.spring.marryus.payment;

import java.math.BigDecimal;
import java.nio.channels.Channel;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nimbusds.oauth2.sdk.http.HTTPRequest.Method;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Payment {
	private String status;
    private String paymentId;
    private String id; // 결제 ID
    private String transactionId; // 트랜잭션 ID
    private String merchantId; // 상인 ID
    private String storeId; // 상점 ID
    private Amount amount;

}


