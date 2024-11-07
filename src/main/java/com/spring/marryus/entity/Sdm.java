package com.spring.marryus.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.spring.marryus.status.SdmItemSellStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sdm")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE sdm SET del_flag = true WHERE id = ?")
@Where(clause = "del_flag = false")
public class Sdm {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	
	private String itemNm;

	
	private String addr;

	
	private int totalLikes = 0;

	private String itemDetail;

	
	private int stockNumber;

	
	private Integer price;

	
	private Integer rating;

	
	private String tag;

	
	private String category; //

	@Enumerated(EnumType.STRING)
	private SdmItemSellStatus itemsellstatus; // 상품 판매상태
	
	private LocalDateTime regTime; // 등록시간
	
	private LocalDateTime updateTime; // 수정시간
	
	
	private boolean delFlag;
	
	@ElementCollection
	@Builder.Default
	private List<SdmImg> imageList = new ArrayList<>();
	    
		
	public void changePrice(int price) {
	    this.price = price;
	  }
	
	public void changeItemDetail(String itemDetail) {
		this.itemDetail=itemDetail;
	}
	
	public void changeItemNm(String itemNm) {
		this.itemNm=itemNm;
	}
	
	//사진을 수정할경우 string 형태를 수정할수도 있고 image자체를 수정할수도 잇음
	//1.
	    public void addImage(SdmImg sdmImg) {
	        imageList.add(sdmImg);
	    }
	 //2. string형태 바꾸기   
	    public void addImageString(String imgName,boolean isThumbnail) {
	    	
	    	
			SdmImg sdmImg= SdmImg.builder()
	    			.imgName(imgName)
	    			.isThumbnail(isThumbnail)
	    			.build();
	    	addImage(sdmImg);
	    	
	    	
	    }
	    
	    
	    public void clearList() {
	        this.imageList.clear();
	    }

		public Object getUploadFileNames() {
			return null;
		}
	
		 // 재고 감소 메서드
	    public void removeStock(int quantity) {
	        if (this.stockNumber < quantity) {
	            throw new IllegalArgumentException("재고가 부족합니다."); // 재고 부족 시 예외 처리
	        }
	        this.stockNumber -= quantity; // 재고 수량 감소
	    }
	    
	    public void setRating(Integer rating) {
	        this.rating = rating;
	    }

}
