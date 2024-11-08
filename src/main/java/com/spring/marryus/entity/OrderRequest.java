package com.spring.marryus.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.config.web.servlet.oauth2.login.UserInfoEndpointDsl;

import lombok.Data;
@Data
public class OrderRequest {
    private String paymentId;
    private List<Long> cartIds;
    private BigDecimal totalAmount;
    private Long userId; 
    private String userType;
    
    // 추가된 필드들 - 수정
    private String address; // 주소, 사용자 입력
    private LocalDateTime bookDate; // 예약 날짜, 사용자 입력
    private String ordererName; // 주문자 이름, 사용자 입력
    private String payMethod; // 결제 방식, 사용자 입력
    
    // 결제 관련 정보는 결제가 완료된 후 서버에서 설정됨 - 수정
    private String impUid; // 결제 시스템에서 제공되는 고유한 결제 ID
    private String merchantUid; // 서버 또는 결제 시스템에서 생성하는 주문 번호
    private BigDecimal paidAmount; // 실제 결제된 금액, 결제가 완료된 후 설정됨
    private LocalDateTime paidAt; // 결제가 완료된 시간, 결제가 완료된 후 설정됨
    private String receiptUrl; // 영수증 URL, 결제가 완료된 후 설정됨
    
    private String englishName; // 영문 이름
    private String englishFamilyName; // 영문 성
    private String email; // 이메일 주소
    private String phone; // 전화번호
    
    private List<OrderProductList> cartData;
    
    
   
    
    
}
