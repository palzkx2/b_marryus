package com.spring.marryus.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchCriteria {
	private String region;
    private int priceRange;
    private int rating;
}
