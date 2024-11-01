package com.spring.marryus.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.spring.marryus.status.OrderStatus;
import com.spring.marryus.status.PayMethod;

import lombok.Data;

// OrderResponseDto 클래스를 public으로 선언
@Data
public class OrderResponseDto {

    private Long orderId;
    private String ordererName;
    private String address;
    private PayMethod payMethod;
    private BigDecimal totalPrice;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private List<OrderItemDto> orderItems; // OrderItem을 OrderItemDto로 변경

    public OrderResponseDto(Orders order) {
    	
    	 	this.orderId = order.getOrderId(); // Orders 객체의 주문 ID를 가져와서 설정
    	 	
    	    this.ordererName = order.getOrdererName(); // 주문자의 이름 설정
    	    
    	    this.address = order.getAddress(); // 주소 설정
    	    
    	    this.payMethod = order.getPayMethod(); // 결제 방법 설정
    	    
    	    this.totalPrice = order.getTotalPrice(); // 총 가격 설정
    	    
    	    this.status = order.getStatus(); // 주문 상태 설정
    	    
    	    this.orderDate = order.getOrderDate(); // 주문 날짜 설정
    	    
    	    // OrderItem을 OrderItemDto로 변환하여 리스트로 저장
    	    
    	    this.orderItems = order.getOrderItems().stream()
    	        .map(OrderItemDto::new)
    	        .collect(Collectors.toList());
    }
    
    // OrderItemDto를 static 내부 클래스로 변경
    @Data
    public static class OrderItemDto {
        private String itemName;
        private BigDecimal price;
        private int quantity;

        public OrderItemDto(OrderItem orderItem) {
            this.itemName = orderItem.getProductName(); 
            this.price = orderItem.getTotalPrice();
            this.quantity = orderItem.getQuantity();
        }
    }
    
    // OrderDto를 static 내부 클래스로 변경
    @Data
    public static class OrderDto {
        private String ordererName;
        private String address;
        private PayMethod payMethod;
        
		public void setPayMethod(String string) {
			// TODO Auto-generated method stub
			
		}
    }
}