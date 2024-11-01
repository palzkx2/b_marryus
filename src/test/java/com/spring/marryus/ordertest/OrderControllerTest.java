package com.spring.marryus.ordertest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.marryus.dao.CartRepository;
import com.spring.marryus.dao.MemberRepository;
import com.spring.marryus.entity.Cart;
import com.spring.marryus.entity.Member;

@SpringBootTest
@AutoConfigureMockMvc
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MemberRepository memberRepository;

    private Member user;
    private Cart cart1;
    private Cart cart2;

    @BeforeEach
    public void setup() {
        // 기존 데이터 삭제
        cartRepository.deleteAll();
        memberRepository.deleteAll();

        // 테스트용 회원 데이터 삽입
        user = new Member();
        user.setName("테스트 유저");
        user.setEmail("testuser@example.com"); // email 필드 설정
        user.setPassword("123"); 
        // 기타 필요한 필드 설정
        user = memberRepository.save(user); // 회원 저장 및 ID 자동 생성

        // 테스트용 장바구니 데이터 삽입
        cart1 = new Cart();
        cart1.setName("상품A");
        cart1.setPrice("10000"); // price를 String으로 설정
        cart1.setCount(2);
        cart1.setUser(user); // 유저 객체 설정
        cart1 = cartRepository.save(cart1); // 장바구니 저장 및 ID 자동 생성

        cart2 = new Cart();
        cart2.setName("상품B");
        cart2.setPrice("20000"); // price를 String으로 설정
        cart2.setCount(1);
        cart2.setUser(user); // 동일 유저 설정
        cart2 = cartRepository.save(cart2);
        
        System.out.println("Cart1 ID: " + cart1.getId()); // 확인용
        System.out.println("Cart2 ID: " + cart2.getId()); // 확인용
        cartRepository.flush();
        
        
    }
//
//    @Test
//    public void testCreateOrder_Success() throws Exception {
//        Map<String, Object> payload = new HashMap<>();
//        
//        payload.put("cartIds", Arrays.asList(cart1.getId(), cart2.getId())); // 생성된 ID 사용
//        
//        mockMvc.perform(post("/api/createorders")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(new ObjectMapper().writeValueAsString(payload)))
//                .andExpect(status().isOk())
//                .andExpect(content().string("주문 임시 저장 완료"));
//    }

    @Test
    public void testCreateOrder_NoCarts() throws Exception {
        Map<String, Object> payload = new HashMap<>();
        payload.put("cartIds", Arrays.asList(999)); // 존재하지 않는 ID

        mockMvc.perform(post("/api/createorders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(payload)))
                .andExpect(status().isNotFound())
                .andExpect(content().string("장바구니에 담긴 상품이 없습니다."));
    }

//    @Test
//    public void testCreateOrder_InvalidCartIdsType() throws Exception {
//        Map<String, Object> payload = new HashMap<>();
//        payload.put("cartIds", Arrays.asList("1","2")); // 잘못된 타입 예시
//
//        mockMvc.perform(post("/api/createorders")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(new ObjectMapper().writeValueAsString(payload)))
//                .andExpect(status().isBadRequest())
//                .andExpect(content().string("장바구니 ID 타입이 잘못되었습니다.")); // 기대하는 오류 메시지 검증
//    }
    
    @Test
    public void testCreateOrder_NonExistentCartId() throws Exception {
        Map<String, Object> payload = new HashMap<>();
        payload.put("cartIds", Arrays.asList(9999, 10000)); // 존재하지 않는 ID들

        mockMvc.perform(post("/api/createorders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(payload)))
                .andExpect(status().isNotFound())
                .andExpect(content().string("장바구니에 담긴 상품이 없습니다.")); // 기대하는 오류 메시지 검증
    }
}