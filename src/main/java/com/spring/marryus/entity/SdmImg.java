package com.spring.marryus.entity;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SdmImg {

	
    
	 private String imgName;    // 파일 이름
	    private int ord;           // 순서
	    private boolean isThumbnail; // 썸네일 여부

	    public void setOrd(int ord) {
	        this.ord = ord;
	    }

	    public void setIsThumbnail(boolean isThumbnail) {
	        this.isThumbnail = isThumbnail;
	    }
	
}
