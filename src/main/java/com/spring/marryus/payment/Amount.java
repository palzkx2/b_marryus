package com.spring.marryus.payment;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class Amount {
	private BigDecimal total;
	private int taxFree;
	private int vat;
	private int supply;
	private int discount;
	private int paid;
	private int cancelled;
	private int cancelledTaxFree;
}
