package com.spring.marryus.status;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum SdmItemSellStatus {
	SELL, SOLD_OUT;
	
	 @JsonCreator
	    public static SdmItemSellStatus fromString(String key) {
	        return key == null ? null : SdmItemSellStatus.valueOf(key.toUpperCase());
	    }
}
