package com.spring.marryus.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.marryus.dao.CartRepository;
import com.spring.marryus.dao.MemberRepository;
import com.spring.marryus.dao.OrderRepository;
import com.spring.marryus.dao.PaymentHistoryRepository;
import com.spring.marryus.dao.PaymentRepository;
import com.spring.marryus.dao.SdmRepository;
import com.spring.marryus.dao.SuksoRepository;
import com.spring.marryus.dao.WeddingHallRepository;
import com.spring.marryus.dao.WeddingItemRepository;

import com.spring.marryus.entity.Cart;
import com.spring.marryus.entity.Member;
import com.spring.marryus.entity.OrderItem;
import com.spring.marryus.entity.OrderResponseDto.OrderDto;
import com.spring.marryus.entity.Orders;
import com.spring.marryus.entity.PaymentHistory;
import com.spring.marryus.entity.Sdm;
import com.spring.marryus.entity.Sukso;
import com.spring.marryus.entity.WeddingHall;
import com.spring.marryus.entity.WeddingItemDTO;
import com.spring.marryus.status.OrderStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	
	 
    private final MemberRepository memberRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final SuksoRepository suksoRepository;
    private final WeddingHallRepository weddingHallRepository;
    private final WeddingItemRepository weddingItemRepository;
    private final SdmRepository sdmRepository;
    private final PaymentRepository paymentRepository;
    private PaymentHistoryRepository paymentHistoryRepository;
    
    /**
     * 주문 생성 메서드.
     * 전달된 장바구니 ID 목록을 기반으로 임시 주문을 생성합니다.
     *
     * @param cartIds 장바구니 ID 리스트
     * @return 생성된 임시 주문 객체
     */
    public Orders createOrder(List<Long> cartIds) {
        // 전달된 장바구니 ID로 장바구니 목록 조회
        List<Cart> carts = cartRepository.findByIdIn(cartIds);
        
        System.out.println("Received cartIds: " + cartIds);
        System.out.println("Found carts: " + carts);

        // 장바구니가 비어있는지 확인
        if (carts.isEmpty()) {
            throw new NoSuchElementException("장바구니에 담긴 상품이 없습니다.");
        }

        // 첫 번째 장바구니 항목의 사용자 ID를 기준으로 모든 장바구니 항목이 동일한 사용자에게 속하는지 확인
        Long memberId = carts.get(0).getUser().getId();
        		verifyUserIdMatch(memberId);

        boolean sameMember = carts.stream()
            .allMatch(cart -> cart.getUser().getId().equals(memberId));
        if (!sameMember) {
            throw new IllegalArgumentException("모든 장바구니 항목은 동일한 회원에게 속해야 합니다.");
        }

        // 회원 정보 조회
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new NoSuchElementException("회원 정보를 찾을 수 없습니다."));

        // 주문할 상품 목록 생성
        List<OrderItem> orderItems = new ArrayList<>();
        for (Cart cart : carts) {
            OrderItem orderItem = OrderItem.createOrderItem(
                cart.getName(),
                new BigDecimal(cart.getPrice()),// price가 String일 경우 BigDecimal로 변환
                cart.getCount()
            );
            orderItems.add(orderItem);
        }

        // 총 가격 계산
        BigDecimal totalPrice = calculateTotalPrice(orderItems);

        
        // 임시 주문 객체 생성
        Orders temporaryOrder = new Orders();
        
        temporaryOrder.setOrderItems(orderItems);
        
        temporaryOrder.setTotalPrice(totalPrice);
        
        temporaryOrder.setMember(member);

        return temporaryOrder;
    }

    /**
     * 주문 확정 메서드.
     * 임시 주문과 주문 상세 정보를 기반으로 최종 주문을 생성하고 저장합니다.
     *
     * @param temporaryOrder 임시 주문 객체
     * @param orderDto       주문 상세 정보 DTO
     * @return 저장된 최종 주문 객체
     */
    public Orders orderConfirm(Orders temporaryOrder, OrderDto orderDto) {
        // 주문 상세 정보 설정
        temporaryOrder.setOrdererName(orderDto.getOrdererName());
        temporaryOrder.setAddress(orderDto.getAddress());
        temporaryOrder.setPayMethod(orderDto.getPayMethod());
        temporaryOrder.setStatus(OrderStatus.ORDER);
        temporaryOrder.setOrderDate(LocalDateTime.now());

        // 주문 저장
        Orders savedOrder = orderRepository.save(temporaryOrder);

        // 결제 내역 저장
        for (OrderItem item : savedOrder.getOrderItems()) {

            // 각 상품 타입에 따른 리포지토리에서 상품 정보 조회
            Sdm sdm = null;
            WeddingHall weddingHall = null;
            WeddingItemDTO weddingItem = null;
            Sukso sukso = null;

            // 상품 이름에 따라 알맞은 리포지토리에서 조회
            if (isSdmProduct(item.getProductName())) {
                sdm = sdmRepository.findSingleByItemNm(item.getProductName())
                    .orElseThrow(() -> new NoSuchElementException("상품을 찾을 수 없습니다: " + item.getProductName()));
            } else if (isWeddingHallProduct(item.getProductName())) {
                weddingHall = weddingHallRepository.findByName(item.getProductName());
                		if (weddingHall == null) {
                	        // 로깅 처리
                	        System.out.println("결혼식장을 찾을 수 없습니다: " + item.getProductName());
                	        return null; // 또는 기본값 반환
                	    }	
                		
                    
            } else if (isWeddingItemProduct(item.getProductName())) {
                weddingItem = weddingItemRepository.findByImgName(item.getProductName())
                    .orElseThrow(() -> new NoSuchElementException("결혼 상품을 찾을 수 없습니다: " + item.getProductName()));
            } else if (isSuksoProduct(item.getProductName())) {
                sukso = suksoRepository.findBySname(item.getProductName())
                    .orElseThrow(() -> new NoSuchElementException("숙소를 찾을 수 없습니다: " + item.getProductName()));
            } else {
                throw new IllegalArgumentException("알 수 없는 상품 타입입니다: " + item.getProductName());
            }

            
            
            
            
            // 결제 내역 생성
            PaymentHistory paymentHistory = new PaymentHistory(
                savedOrder.getMember(),
                savedOrder,
                sdm != null ? sdm : (weddingHall != null ? weddingHall : (weddingItem != null ? weddingItem : sukso)), // 적절한 객체 할당
                item.getProductName(),
                "", // 옵션이 없으므로 빈 문자열
                item.getPrice().intValue(),
                item.getTotalPrice().longValue()
            );

            // 결제 내역 저장
            paymentHistoryRepository.save(paymentHistory);
        }

        // 주문 완료 후 장바구니 비우기
        clearUserCarts(savedOrder.getMember().getId());

        return savedOrder;
    }

    // 상품 유형 확인 메서드들
    private boolean isSdmProduct(String productName) {
        // 제품명이 Sdm 유형인지 확인하는 로직 (예: 특정 패턴으로 확인)
        return productName.startsWith("Sdm_"); // 예시
    }

    private boolean isWeddingHallProduct(String productName) {
        // 제품명이 Wedding Hall 유형인지 확인하는 로직
        return productName.startsWith("WeddingHall_"); // 예시
    }

    private boolean isWeddingItemProduct(String productName) {
        // 제품명이 Wedding Item 유형인지 확인하는 로직
        return productName.startsWith("WeddingItem_"); // 예시
    }

    private boolean isSuksoProduct(String productName) {
        // 제품명이 Sukso 유형인지 확인하는 로직
        return productName.startsWith("Sukso_"); // 예시
    }

    /**
     * 사용자 ID 검증 메서드.
     * 로그인된 사용자의 ID와 요청된 회원 ID가 일치하는지 확인합니다.
     *
     * @param memberId 요청된 회원 ID
     */
    private void verifyUserIdMatch(Long memberId) {
        // 구현 필요: 현재 로그인된 사용자의 ID를 가져와서 비교
        // 예: if (!currentUserId.equals(memberId)) { throw new UnauthorizedException("권한 없음"); }
    }

    /**
     * 주문 항목 목록의 총 가격을 계산하는 메서드.
     *
     * @param orderItems 주문 항목 리스트
     * @return 총 가격
     */
    private BigDecimal calculateTotalPrice(List<OrderItem> orderItems) {
        return orderItems.stream()
            .map(OrderItem::getTotalPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * 특정 사용자의 모든 장바구니 항목을 삭제하는 메서드.
     *
     * @param memberId 회원 ID
     */
    private void clearUserCarts(Long memberId) {
        cartRepository.deleteByUserId(memberId);
    }
}