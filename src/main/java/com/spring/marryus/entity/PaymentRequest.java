package com.spring.marryus.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {
	private String merchant_uid; // 주문 ID
    private int amount; // 결제 금액
    private String name; // 상품명
    private String buyer_email; // 구매자 이메일

}
