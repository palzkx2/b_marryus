package com.spring.marryus.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "payment_history")
public class PaymentHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "payment_history_id")
    private Long id; // PK

    // 다대일 관계: 여러 결제 내역은 하나의 사용자에게 연관됨
    @ManyToOne(fetch = FetchType.LAZY) // 지연 로딩 적용
    @JoinColumn(name = "member_id", nullable = false) // 외래키 컬럼명을 명시적으로 수정
    private Member member; // 사용자

    // 다대일 관계: 여러 결제 내역은 하나의 주문과 연관됨
    @ManyToOne(fetch = FetchType.LAZY) // 지연 로딩 적용
    @JoinColumn(name = "order_id", nullable = false) // 외래키 컬럼명을 명시적으로 수정
    private Orders orders; // 주문 테이블과 다대일 관계 (연관관계 주인은 주문)

    // Store the product type as a String (to indicate which type of product it is)
    @Column(name = "product_type")
    private String productType; // 상품 유형 (예: "Sdm", "WeddingHall", 등)

    @Column(name = "product_name")
    private String productName; // 상품 이름

    @Column(name = "product_option")
    private String productOption; // 상품 옵션

    @Column(name = "product_price", nullable = false)
    private Integer price; // 가격

    @Column(name = "total_price", nullable = false)
    private Long totalPrice; // 결제한 총 가격

    // 결제 시각을 저장하며 기본값을 현재 시각으로 설정
    @Column(name = "paid_at", nullable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime paidAt; // 결제 시각

    @Column(name = "status")
    private Boolean status = true; // 결제 상태 (true = 성공)

    @Column(name = "review")
    private Boolean review = false; // 리뷰 작성 여부

    // Updated constructor to reflect your logic for passing product information
    public PaymentHistory(Member member, Orders orders, Object product, String productName, String productOption, Integer price, Long totalPrice) {
        this.member = member;
        this.orders = orders;
        this.productName = productName;
        this.productOption = productOption;
        this.price = price;
        this.totalPrice = totalPrice;
        this.paidAt = LocalDateTime.now(); // 결제 시각을 현재 시각으로 설정

        // Set the product type based on the actual product passed
        if (product instanceof Sdm) {
            this.productType = "Sdm";
        } else if (product instanceof WeddingHall) {
            this.productType = "WeddingHall";
        } else if (product instanceof WeddingItemDTO) {
            this.productType = "WeddingItem";
        } else if (product instanceof Sukso) {
            this.productType = "Sukso";
        } else {
            this.productType = "Unknown";
        }
    }

    // 리뷰 상태 업데이트 메서드
    public void setReview(Boolean review) {
        this.review = review;
    }
}
