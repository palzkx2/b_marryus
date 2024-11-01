package com.spring.marryus.controller;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.marryus.dao.PaymentRepository;
import com.spring.marryus.entity.OrderResponseDto;
import com.spring.marryus.entity.OrderResponseDto.OrderDto;
import com.spring.marryus.entity.Orders;
import com.spring.marryus.entity.Payment;
import com.spring.marryus.service.OrderService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;



@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class OrderController {
	private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
	
	private final OrderService orderService;
    private final HttpSession httpSession;
    private final PaymentRepository paymentRepository;
    private final ObjectMapper objectMapper; // ObjectMapper 선언
    
   
    
    @PostMapping("/createorders")
    public ResponseEntity<String> createOrder(@RequestBody Map<String, Object> payload) {
        try {
        	
        	 String paymentId = (String) payload.get("paymentId");
        	// 요청받은 장바구니 ID 리스트를 Long 타입으로 직접 가져옵니다.
            List<Integer> cartIdsInteger = (List<Integer>) payload.get("cartIds");

            if (cartIdsInteger == null || cartIdsInteger.isEmpty()) {
                return ResponseEntity.badRequest().body("장바구니 ID가 제공되지 않았습니다.");
            }

            // Integer를 Long으로 변환
            List<Long> cartIds = cartIdsInteger.stream()
                                               .map(Long::valueOf)  // Integer를 Long으로 변환
                                               .collect(Collectors.toList());

            logger.info("Converted cart IDs: {}", cartIds);

            // 주문 생성 로직 호출
            Orders temporaryOrder = orderService.createOrder(cartIds);

            httpSession.setAttribute("temporaryOrder", temporaryOrder);
            httpSession.setAttribute("cartIds", cartIds);

            return ResponseEntity.ok("주문 임시 저장 완료");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("장바구니에 담긴 상품이 없습니다.");
        } catch (Exception e) {
            logger.error("Unexpected error during order creation", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("주문 생성 중 오류가 발생했습니다.");
        }
    }
   
    	@PostMapping("/done") // HTTP POST 요청을 처리하며, URL이 "/done"인 경우 이 메서드를 호출합니다.
    	public ResponseEntity<Object> completeOrder(@RequestBody OrderDto request) { // 요청 본문에서 OrderDto 형식의 데이터를 받아옵니다.
        Orders temporaryOrder = (Orders) httpSession.getAttribute("temporaryOrder"); // 세션에서 "temporaryOrder"라는 이름으로 저장된 임시 주문 정보를 가져옵니다.

        // 임시 주문 정보가 없을 경우, 클라이언트에게 에러 응답을 반환합니다.
        if (temporaryOrder == null) {
            return ResponseEntity.badRequest().body("임시 주문 정보를 찾을 수 없습니다."); // 잘못된 요청 응답을 반환합니다.
        }

        // ObjectMapper를 사용하여 요청으로 받은 OrderDto를 OrderDto로 변환합니다.
        OrderDto orders = objectMapper.convertValue(request, OrderDto.class);
        
        // 임시 주문과 요청받은 주문 정보를 바탕으로 최종 주문을 생성합니다.
        Orders completedOrder = orderService.orderConfirm(temporaryOrder, orders);

        // 생성된 주문 정보를 OrderResponseDto 형식으로 변환합니다.
        OrderResponseDto orderResponseDto = new OrderResponseDto(completedOrder);

        // 최종 주문 응답을 클라이언트에게 반환합니다.
        return ResponseEntity.ok(orderResponseDto); // 200 OK 응답을 반환하며, 응답 본문에는 주문 정보가 포함됩니다.
    }
	
	
	
}
