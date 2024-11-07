package com.spring.marryus.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.marryus.entity.Member;

import com.spring.marryus.entity.OrderRequest;
import com.spring.marryus.entity.OrderResponseDto;
import com.spring.marryus.entity.OrderResponseDto.OrderDto;
import com.spring.marryus.entity.Orders;

import com.spring.marryus.service.OrderService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {
	private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
	
	private final OrderService orderService;
    private final HttpSession httpSession;
    
    //private final ObjectMapper objectMapper; // ObjectMapper 선언
    
   
  
    @PostMapping("/create")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequest orderRequest,HttpServletRequest request) {
        try {
        	
        	String paymentId = orderRequest.getPaymentId();
            List<Long> cartIds = orderRequest.getCartIds();
            BigDecimal totalAmount = orderRequest.getTotalAmount();
            System.out.println("create메소드 호출됨");
            
            HttpSession session = request.getSession(false); // 존재하지 않으면 null 반환
            
            if (session == null || session.getAttribute("user") == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            
            Member user = (Member)session.getAttribute("user");
            
            System.out.println("인증된 사용자 정보: " + user.getId());
            
            
            System.out.println(orderRequest.getPaymentId());
            System.out.println(orderRequest.getCartIds());
            System.out.println(orderRequest.getTotalAmount());
            orderRequest.setUserId(user.getId());
            
            
            
            System.out.println(orderRequest.getUserId());
            if (cartIds == null || cartIds.isEmpty()) {
                return ResponseEntity.badRequest().body("장바구니 ID가 제공되지 않았습니다.");
            }
            System.out.println("cartid 나오나"+cartIds);
           
			logger.info("Converted cart IDs: {}", cartIds);
			
            
            // 주문 생성 로직 호출
            Orders temporaryOrder = orderService.createOrder(orderRequest);
            System.out.println("temporaryOrder 나오나");
            
            httpSession.setAttribute("temporaryOrder", temporaryOrder);
            
            httpSession.setAttribute("cartIds", cartIds);
            System.out.println("cartIds 나오나");

         // OrderResponseDto로 변환하여 반환 // 수정한 부분
            OrderResponseDto responseDto = new OrderResponseDto(temporaryOrder); // 수정한 부분
            
            return ResponseEntity.ok("주문 임시 저장완료"); // 수정한 부분
            
           
            
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("장바구니에 담긴 상품이 없습니다.");
        } catch (Exception e) {
            logger.error("Unexpected error during order creation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 생성 중 오류가 발생했습니다.");
        }
    }
    
    //주문서에서 예약 정보 입력받아서 저장하는 메소드
 
	@PostMapping("/done") // HTTP POST 요청을 처리하며, URL이 "/done"인 경우 이 메서드를 호출합니다.
	public ResponseEntity<String> confirmOrder(@RequestBody OrderRequest orderRequest, HttpSession session){
        try {
        	// 세션에서 임시 주문 객체 가져오기
            Orders temporaryOrder = (Orders) session.getAttribute("temporaryOrder");
            
            if (temporaryOrder == null) {
            	
                return ResponseEntity.badRequest().body("임시 주문을 찾을 수 없습니다.");
            }
            System.out.println("좋은말로할때 나와라1");
            // orderRequest에서 필요한 정보 추출하여 업데이트
            Orders confirmedOrder = orderService.confirmOrder(
                temporaryOrder,
                orderRequest.getEnglishName(), // 수정한 부분
                orderRequest.getEnglishFamilyName(), // 수정한 부분
                orderRequest.getEmail(), // 수정한 부분
                orderRequest.getPhone(), // 수정한 부분
                orderRequest.getPayMethod() // 수정한 부분
            );
            
            System.out.println("좋은말로할때 나와라2");
            // OrderResponseDto로 변환하여 반환 // 수정한 부분
            OrderResponseDto responseDto = new OrderResponseDto(confirmedOrder); // 수정한 부분
            
            return ResponseEntity.ok(confirmedOrder.getOrderId().toString()); // 수정한 부분
            
            
        } catch (Exception e) {
        	 e.printStackTrace();
        	 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 처리 중 오류가 발생했습니다."); // 수정한 부분
        }
    }
	
	
	
}
