package com.spring.marryus.payment;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentHistoryDTO {
	private String orderId;
    private List<ProductDTO> products; // 상품 리스트
    private String date;
    private String totalPrice;
    private String status;
}
