package com.spring.marryus.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Order {
	
	private Long orderId;
	private int amount;
	
	public Order(Long orderId, int amount) {
		this.orderId = orderId;
		this.amount = amount;
	}

}
