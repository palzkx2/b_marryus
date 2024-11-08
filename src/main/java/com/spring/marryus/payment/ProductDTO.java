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
    public ProductDTO(String pname, Long pId, String pcat, Double price) {
        this.pname = pname;
        this.pId = pId;
        this.pcat = pcat;
        this.price = price;
    }
    public ProductDTO() {}
    
}

