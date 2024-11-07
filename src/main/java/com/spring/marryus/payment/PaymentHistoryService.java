package com.spring.marryus.payment;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentHistoryService {
	
	private final PaymentHistoryRepositoryByDW paymentHistoryRepository;
	
	public void saveHistory(PaymentHistoryEntity paymentHistory) {
		paymentHistoryRepository.save(paymentHistory);
	}
	
	
	
	public List<PaymentHistoryDTO> getMyList(String customerId) {
	    // 주문 내역 가져오기
	    List<PaymentHistoryEntity> orders = paymentHistoryRepository.findByCustomerId(customerId);

	    // 주문 내역을 DTO로 변환하여 반환할 리스트 준비
	    List<PaymentHistoryDTO> orderDTOs = new ArrayList<>();
	    
	    for (PaymentHistoryEntity order : orders) {
	        // 주문 상품 정보 파싱
	        List<ProductDTO> products = parseProducts(order.getProducts());
	        
	        // DTO로 변환하여 추가
	        PaymentHistoryDTO orderDTO = new PaymentHistoryDTO();
	        orderDTO.setOrderId(order.getOrderId());
	        orderDTO.setProducts(products);
	        orderDTO.setDate(order.getOrderDate());
	        orderDTO.setStatus(order.getStatus());
	        orderDTO.setTotalPrice(order.getTotalPrice());
	        
	        
	        orderDTOs.add(orderDTO);
	    }

	    return orderDTOs;
	}

	// 상품 정보 파싱 메소드
	private List<ProductDTO> parseProducts(String productsStr) {
	    List<ProductDTO> products = new ArrayList<>();
	    
	    // 상품 구분자로 나누기
	    String[] productStrings = productsStr.split("/p/");
	    
	    for (String productStr : productStrings) {
	        ProductDTO product = new ProductDTO();
	        
	        // 상품의 세부 정보를 '/d/'로 나누기
	        String[] productDetails = productStr.split("/d/");
	        
	        for (String detail : productDetails) {
	            String[] keyValue = detail.split(":");
	            if (keyValue.length == 2) {
	                switch (keyValue[0]) {
	                    case "Pname":
	                        product.setPname(keyValue[1]);
	                        break;
	                    case "pId":
	                        product.setPId(Long.parseLong(keyValue[1]));
	                        break;
	                    case "Pcat":
	                        product.setPcat(keyValue[1]);
	                        break;
	                    case "Price":
	                        product.setPrice(Double.parseDouble(keyValue[1]));
	                        break;
	                }
	            }
	        }
	        
	        products.add(product);
	    }
	    
	    return products;
	}
	
}
