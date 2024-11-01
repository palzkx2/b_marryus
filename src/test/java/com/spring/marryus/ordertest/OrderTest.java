package com.spring.marryus.ordertest;

import static org.mockito.ArgumentMatchers.any;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.marryus.controller.OrderController;
import com.spring.marryus.dao.CartRepository;
import com.spring.marryus.entity.Cart;
import com.spring.marryus.entity.Orders;
import com.spring.marryus.service.OrderService;
@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
public class OrderTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Mock
    private OrderService orderService;

    @Mock
    private HttpSession httpSession;

    @Mock
    private CartRepository cartRepository; // CartRepository를 Mock으로 추가

    @InjectMocks
    private OrderController orderController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

//    @Test
//    void 상품주문() throws Exception {
//        // Given: 장바구니 ID 리스트를 설정
//        List<Long> cartIds = Arrays.asList(1L, 2L);
//
//        // 세션에 회원 ID가 있다고 가정하여 주문 가능한 상태로 설정
//        when(httpSession.getAttribute("userId")).thenReturn(1L);
//
//        // Mock 설정: Cart 객체 생성 후 cartRepository의 findByIdIn 메서드가 이 객체들을 반환하도록 설정
//        Cart cart1 = new Cart(10000L, "상품1", "10000", 1);
//        Cart cart2 = new Cart(10001L, "상품2", "20000", 1);
//        List<Cart> mockCarts = Arrays.asList(cart1, cart2);
//        when(cartRepository.findByIdIn(cartIds)).thenReturn(mockCarts);
//
//        // 주문 생성 후 반환할 임시 주문 객체를 Mock 설정
//        Orders temporaryOrder = new Orders();
//        temporaryOrder.setOrderId(123L);
//        temporaryOrder.setTotalPrice(new BigDecimal(30000)); // 총 가격 설정
//        when(orderService.createOrder(any())).thenReturn(temporaryOrder);
//
//        // When: 주문 생성 요청
//        Map<String, Object> payload = new HashMap<>();
//        payload.put("cartIds", cartIds);
//        ResultActions result = mockMvc.perform(
//            post("/api/v1/order/create")
//                .sessionAttr("userId", 1L)
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(payload))
//        );
//
//        // Then: 주문 생성이 성공하고 응답 상태가 200인지 확인
//        result.andExpect(status().isOk())
//              .andExpect(mvcResult -> 
//                  assertEquals("주문 임시 저장 완료", mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8))
//              );
//    }
}