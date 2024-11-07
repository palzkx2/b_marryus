package com.spring.marryus.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentRequest {
    private String paymentId;
    private String orderId;
    private String txId;

    // Getters and Setters
}

