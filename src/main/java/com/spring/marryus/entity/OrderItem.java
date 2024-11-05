package com.spring.marryus.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class OrderItem {

	 	@Id
	 	@GeneratedValue(strategy = GenerationType.AUTO)
	    @Column(name = "order_item_id")
	    private Long orderItemId; // 주문 항목 ID

	    @ManyToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "order_id")
	    private Orders order; // 주문 정보 (FK)

	    @Column(name = "product_name")
	    private String productName; // 아이템 이름

	    @Column(name = "price")
	    private BigDecimal price; // 아이템 가격

	    @Column(name = "quantity")
	    private int quantity; // 수량
	
	    
	    //== 생성 메서드 ==//
	    public static OrderItem createOrderItem(String productName, BigDecimal price, int quantity) {
	        OrderItem orderItem = new OrderItem();
	        orderItem.productName = productName;
	        orderItem.price = price;
	        orderItem.quantity = quantity;
	        
	        
	     
	     // Sdm 엔티티의 removeStock 메서드 호출하여 재고 감소
	     //   sdm.removeStock(quantity); 
	        
	        return orderItem;
	    }


	    //== 조회 로직 ==//
	    public BigDecimal getTotalPrice() {
	        return this.price.multiply(BigDecimal.valueOf(quantity)); // 개별 아이템 총 가격 계산
	    }
	    
	  //== 예약 날짜와 관련된 메서드 ==//
	    public LocalDateTime getBookDate() {
	        return order != null ? order.getBookDate() : null; // Order에서 예약 날짜를 가져옴
	    }

		public String getProductName() {
			
			return  productName;
		}

		public int getQuantity() {
			// TODO Auto-generated method stub
			 return quantity;
		}

		public void add(OrderItem orderItem) {
			// TODO Auto-generated method stub
			
		}
		 public BigDecimal getPrice() {
		        return price;
		    }
		 //== 연관관계 메서드 ==//
		 public void setOrder(Orders order) {
		    this.order = order; // Orders 객체 설정
		 }
	
}
