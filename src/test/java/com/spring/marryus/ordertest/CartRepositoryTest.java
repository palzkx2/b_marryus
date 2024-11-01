package com.spring.marryus.ordertest;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.spring.marryus.dao.CartRepository;
import com.spring.marryus.entity.Cart;
import com.spring.marryus.service.CartService;

public class CartRepositoryTest {

	@Mock
	private CartRepository cartRepository;

	@InjectMocks
	private CartService cartService; // CartService에서 CartRepository를 사용하는 경우

	@BeforeEach
	public void setUp() {
	    MockitoAnnotations.openMocks(this);
	}
//	@Test
//	public void testFindByIdIn() {
//	    // Given: 테스트용 Cart 객체 리스트 생성 및 필드 설정
//	    Cart cart1 = new Cart(564L, "상품1", "10000", 2);
//	    Cart cart2 = new Cart(565L, "상품2", "20000", 1);
//
//	    // 테스트용 Cart 리스트 생성
//	    List<Cart> mockCarts = Arrays.asList(cart1, cart2);
//
//	    // When: mock repository의 findByIdIn 메서드 호출 시 mockCarts 반환하도록 설정
//	    when(cartRepository.findByIdIn(Arrays.asList(564L, 565L))).thenReturn(mockCarts);
//
//	    // Then: findByIdIn 메서드 호출 결과 검증
//	    List<Cart> retrievedCarts = cartRepository.findByIdIn(Arrays.asList(564L, 565L));
//	    
//	    // Cart 객체의 수와 각 Cart의 name 필드 값을 검증
//	    assertEquals(2, retrievedCarts.size()); // 총 2개의 Cart 객체 반환 확인
//	    assertEquals("상품1", retrievedCarts.get(0).getName()); // 첫 번째 객체의 name 검증
//	    assertEquals("상품2", retrievedCarts.get(1).getName()); // 두 번째 객체의 name 검증
//
//	    // Verify that the mock repository was called with the correct parameter
//	    verify(cartRepository, times(1)).findByIdIn(Arrays.asList(564L, 565L));
//	}

//	    @Test
//	    public void testFindByIdIn_NoMatchingIds() {
//	        // Given: ID 리스트를 생성 (DB에 존재하지 않는 ID)
//	        List<Cart> mockCarts = Arrays.asList();
//
//	        // When: mock repository의 findByIdIn 메서드 호출 시 빈 리스트 반환하도록 설정
//	        when(cartRepository.findByIdIn(Arrays.asList(999L))).thenReturn(mockCarts);
//
//	        // Then: findByIdIn 메서드 호출 결과 검증
//	        List<Cart> retrievedCarts = cartRepository.findByIdIn(Arrays.asList(999L));
//	        assertTrue(retrievedCarts.isEmpty());
//
//	        // Verify that the mock repository was called with the correct parameter
//	        verify(cartRepository, times(1)).findByIdIn(Arrays.asList(999L));
//	    }
//	
	
}
