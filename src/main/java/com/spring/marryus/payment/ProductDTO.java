package com.spring.marryus.payment;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
	private String pname;
    private Long pId;
    private String pcat;
    private Double price;
}
