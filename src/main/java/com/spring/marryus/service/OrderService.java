package com.spring.marryus.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.spring.marryus.dao.CartRepository;
import com.spring.marryus.dao.MemberRepository;
import com.spring.marryus.dao.OrderRepository;

import com.spring.marryus.dao.SdmRepository;
import com.spring.marryus.dao.SuksoRepository;
import com.spring.marryus.dao.WeddingHallRepository;
import com.spring.marryus.dao.WeddingItemRepository;

import com.spring.marryus.entity.Cart;
import com.spring.marryus.entity.Member;

import com.spring.marryus.entity.OrderItem;
import com.spring.marryus.entity.OrderRequest;
import com.spring.marryus.entity.OrderResponseDto;
import com.spring.marryus.entity.OrderResponseDto.OrderDto;
import com.spring.marryus.entity.Orders;

import com.spring.marryus.entity.Sdm;
import com.spring.marryus.entity.Sukso;
import com.spring.marryus.entity.WeddingHall;
import com.spring.marryus.entity.WeddingItemDTO;
import com.spring.marryus.status.OrderStatus;
import com.spring.marryus.status.PayMethod;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	

	// cart의 userid랑  member가 제대로 연결되었을때
	 private final MemberRepository memberRepository;
	 private final CartRepository cartRepository;
	 private final OrderRepository orderRepository;
	 
	
	 public Orders createOrder(OrderRequest orderRequest) {
	 	
	 	 // userId로 Member 조회
	     Long userId = orderRequest.getUserId();
	     
	     System.out.println(userId + "createOrder 서비스 호출 됨");
	     
	     Member member = memberRepository.findById(userId)
	     		
	         .orElseThrow(() -> new NoSuchElementException("사용자를 찾을 수 없습니다. ID: " + userId));

	     // cartIds를 사용해 Cart 항목들 조회
	     List<Cart> carts = cartRepository.findAllById(orderRequest.getCartIds());

	     // 각 Cart에 대해 사용자 정보가 맞는지 확인
	     for (Cart cart : carts) {
	     	
	         if (cart.getUserrId() == null) {
	         	
	             throw new IllegalStateException("Cart ID " + cart.getId() + "에 연결된 사용자 정보가 누락되었거나 일치하지 않습니다.");
	         }
	     }

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

	     // 모든 장바구니 항목이 동일한 사용자에 속하는지 확인
	        boolean sameMember = carts.stream()
	                .allMatch(cart -> cart.getUserrId().equals(String.valueOf(member.getId())));
	        if (!sameMember || member == null) {
	            return null; // 사용자 불일치 시 주문 생성 실패
	        }
	     
	     // 총 가격 계산
	     BigDecimal totalPrice = calculateTotalPrice(orderItems);

	     
	     // 임시 주문 객체 생성
	     Orders temporaryOrder = new Orders();
	     
	     temporaryOrder.setOrderItems(orderItems);
	     
	     temporaryOrder.setTotalPrice(totalPrice);
	     
	     temporaryOrder.setMember(member);
	     
	     temporaryOrder.setStatus(OrderStatus.TEMPORARY);
	     // 임시 상태로 설정
	     temporaryOrder.setOrderDate(LocalDateTime.now());
	     
	     
	     
	     // DB에 저장하지 않고 임시 객체 반환
	        return temporaryOrder;
	        
	 }



    @Transactional
    public Orders confirmOrder(Orders temporaryOrders, String englishName, String englishFamilyName, String email, String phone, String payMethod,String products) { // 수정한 부분
        
    	 String merchantUid = generateMerchantUid(); // 주문번호 생성 //수정한 부분
    	
    	

    	  // 사용자 입력 정보 업데이트
    	    temporaryOrders.updateUserInfo(englishName, englishFamilyName, email, phone); // 수정한 부분
    	    
    	    temporaryOrders.setPayMethod(PayMethod.valueOf(payMethod)); // 결제 방식 설정 // 수정한 부분
    	    temporaryOrders.setMerchantUid(merchantUid); // 주문번호 설정 // 수정한 부분
    	    temporaryOrders.setStatus(OrderStatus.CONFIRMED); // 주문 상태 변경 // 수정한 부분
    	    temporaryOrders.setPoducts(products);

    	    return orderRepository.save(temporaryOrders);

    }


    private String generateMerchantUid() {
    	 // 현재 날짜와 시간을 포함한 고유한 문자열 생성
        String uniqueString = UUID.randomUUID().toString().replace("-", "");
        LocalDateTime today = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDay = today.format(formatter).replace("-", "");

        // 무작위 문자열과 현재 날짜/시간을 조합하여 주문번호 생성
        return formattedDay + '-' + uniqueString;
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

   /*
     * 특정 사용자의 모든 장바구니 항목을 삭제하는 메서드.
     *
     * @param memberId 회원 ID
     */
    private void clearUserCarts(Long memberId) {
        cartRepository.deleteById(memberId);
    }
    
    
    public Orders getOrders(Long orderId) {
        try {
            return orderRepository.findById(orderId).orElse(null); // null 반환을 선호한다면
        } catch (NumberFormatException e) {
            System.out.println("유효하지 않은 주문 ID 형식: " + orderId);
            return null;
        }
    }

   
}


