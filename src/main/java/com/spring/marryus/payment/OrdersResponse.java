package com.spring.marryus.payment;

import java.util.List;

import com.spring.marryus.entity.Orders;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrdersResponse {
	private Orders order;
    private List<ProductDTO> products;
    public OrdersResponse(Orders order, List<ProductDTO> products) {
        this.order = order;
        this.products = products;
    }
}
