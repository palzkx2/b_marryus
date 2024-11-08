package com.spring.marryus.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.spring.marryus.status.OrderStatus;
import com.spring.marryus.status.PayMethod;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "orders")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Orders {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "order_id")
    private Long orderId; // PK
	
	private String poducts;
 
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member; // 사용자
    
    
    @JsonIgnore // JSON 직렬화 시 이 필드를 무시
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL) // 일대다 관계
    private List<OrderItem> orderItems = new ArrayList<>(); // 주문에 포함된 주문 아이템 목록

    @JsonIgnore // JSON 직렬화 시 이 필드를 무시
    @Column(name = "book_date") // 외래 키가 될 컬럼 이름을 "book_date"로 지정
    private LocalDateTime bookDate; // 예약 날짜

    
    @Column(name = "order_name")
    private String ordererName; // 주문자 이름
 
    @Column(name = "product_names")
    private String productName; // 상품 이름
 
    @Enumerated(EnumType.STRING)
    private PayMethod payMethod; // 결제 방식
 
    @Column(length = 100, name = "merchant_uid")
    private String merchantUid; // 주문번호
 
    @Column(name = "total_price")
    private BigDecimal totalPrice; // 가격
 //order에 주소가 왜필요할까? 예약하는 장소 이런건가..
//    @Column(name = "address")
//    private String address; // 주소
    
    
    private LocalDateTime orderDate; // 주문 시간

    @Enumerated(EnumType.STRING) // Enum을 문자열로 매핑
    private OrderStatus status; // 주문 상태 (ORDER, CANCEL)

    private LocalDateTime orderDateTime; // 주문 시간
    
    
    // 결제 관련 필드 추가 굳이?
    

    @Column(name = "paid_amount")
    private BigDecimal paidAmount;
    @Column(name = "imp_uid")
    private String impUid;
/*
    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    @Column(name = "receipt_url")
    private String receiptUrl;

    
    */
    
    @Column(name = "english_name")
    private String englishName;

    @Column(name = "english_family_name")
    private String englishFamilyName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;
    
    // 생성 메서드
    public static Orders createOrder(Member member, LocalDateTime bookDate, OrderItem... orderItems) {
        Orders order = new Orders();
        order.setMember(member);
        order.setBookDate(bookDate);
        for (OrderItem orderItem : orderItems) {
            order.addOrderItem(orderItem);
        }
        order.setStatus(OrderStatus.ORDER);
        order.setOrderDate(LocalDateTime.now());
        return order;
    }

    //== 연관관계 메서드 ==//
    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this); // 올바르게 Orders 객체를 설정
    }
   
    //== 결제 정보 업데이트 메서드 ==//
    public void updatePaymentInfo(String impUid, BigDecimal paidAmount, LocalDateTime paidAt, String receiptUrl) {
        this.impUid = impUid;
        this.paidAmount = paidAmount;
        //this.paidAt = paidAt;
        //this.receiptUrl = receiptUrl;
        this.status = OrderStatus.ORDER;
    }
    
    //영어 이름 결제서에서 받은것 ordertable로 저장한다.
    public void updateUserInfo(String englishName, String englishFamilyName, String email, String phone) {
        this.englishName = englishName;
        this.englishFamilyName = englishFamilyName;
        this.email = email;
        this.phone = phone;
    }
	
	
	
}
