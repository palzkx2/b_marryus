package com.spring.marryus.payment;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class PaymentHistoryEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String orderId;//주문 id
	
	private Date orderDate;//주문일자
	
	private String status;//주문 상태(결제완료, 배송중, 배송 완료, 취소 등)
	
	private String customerEmail;//주문자 이메일
	
	private String customerId;//주문자 아이디
	
	private String customerType;//주문자 타입(oauth,일반)
	
	private String customerName;//주문자 이름
	
	private String customerContact;//주문자 연락처 등등
	
	private String shippingAddress;//배송지
	
	private String productID;//상품 id
	
	private String productName;//상품이름
	
	private String quantity;//주문상품 갯수
	
	private String price;//개별 상품의 단가
	
	private String totalPrice;//수량과 단가를 곱한 총 지불금액
	
	private String PaymentMethod;//지불방법
	
	private String paymentStatus;//결제 상태: 결제완료,대기,실패 등의 상태
	
	private String transactionId;//거래ID : 결제 거래에 대한 고유 ID
	
	private String shippingMethod;//배송 방식:배송 옵션 (예: 일반 배송, 익일 배송 등),
	
	private String tracking_number; // 운송장 번호.
	
	private String estimatedDeliveryDate;//예상 배송 날짜.
	
	private String ShippingStatus;//배송 상태: 배송 준비 중, 배송 중 배송 완료 등의 상태
	
	private String discount;//할인금액
	private String tax;//세금 금액
	private String remarks;//고객 요청이나 메모
	
	
	
	
	
	
	
	
/*
	1. 주문 관련 기본 정보
	
		order_id (주문 ID): 주문을 고유하게 식별하는 ID.
		order_date (주문 날짜): 주문이 발생한 날짜와 시간.
		status (주문 상태): 현재 주문 상태 (예: 결제 완료, 배송 중, 배송 완료, 취소 등).
		
	2. 고객 정보
	
		customer_id (고객 ID): 주문자와 연결된 고유 ID.
		customer_name (고객 이름): 주문자 이름.
		customer_contact (연락처): 고객 연락 정보(전화번호, 이메일 등).
		shipping_address (배송 주소): 주문 상품의 배송지 주소.
		
	3. 상품 정보
	
		product_id (상품 ID): 주문한 상품을 고유하게 식별하는 ID.
		product_name (상품 이름): 주문한 상품의 이름.
		quantity (수량): 주문된 상품의 개수.
		price (단가): 개별 상품의 단가.
		total_price (총 가격): 상품 수량과 단가를 곱한 값.
		
	4. 결제 정보
	
		payment_method (결제 방식): 사용된 결제 방법 (예: 카드, 계좌 이체, 페이팔 등).
		payment_status (결제 상태): 결제 완료, 대기, 실패 등의 상태.
		transaction_id (거래 ID): 결제 거래에 대한 고유 ID.
		
	5. 배송 정보
	
		shipping_method (배송 방식): 배송 옵션 (예: 일반 배송, 익일 배송 등).
		tracking_number (추적 번호): 배송 추적을 위한 고유 번호.
		estimated_delivery_date (예상 배송일): 배송 예상 날짜.
		shipping_status (배송 상태): 배송 준비 중, 배송 중, 배송 완료 등의 상태.
		
	6. 추가 정보 (선택 사항)
	
		discount (할인 금액): 할인이 적용되었을 경우 금액.
		tax (세금): 세금이 포함된 경우 세금 금액.
		remarks (비고): 고객 요청사항이나 추가 메모.
		이러한 테이블은 주문 내역을 효과적으로 관리할 수 있으며, 고객 서비스와 데이터 분석에 활용하기 유용합니다.
*/

}
