package com.spring.marryus.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.marryus.dao.CartRepository;
import com.spring.marryus.entity.Cart;

@Service
public class CartService {
	
	@Autowired
	private CartRepository cartRepository; 
	
	public void addCart(String userId,int productCount,String userType,String category,String productName,String productPrice) {
		
		Cart cart = new Cart();
		cartRepository.findByNameAndUserrId(productName, userId);
		
		if (cartRepository.findByNameAndUserrId(productName, userId)!=null) {		
			cart = cartRepository.findByNameAndUserrId(productName, userId);
			cart.setCount(cart.getCount() + 1);
			cartRepository.save(cart);
		}else {
			cart.setUserrId(userId);
			cart.setCount(productCount);
			cart.setUserType(userType);
			cart.setCategory(category);
			cart.setName(productName);
			cart.setPrice(productPrice);
			cartRepository.save(cart);
		}	
	}
	
	
	public List<Cart> readCarts(String userrId,String userType){
		
		return cartRepository.findByUserrIdAndUserType(userrId, userType);
	}
	public boolean existsById(Long id) {
        return cartRepository.existsById(id);
    }
	// 숙소 삭제 메서드
    public void deleteCartById(Long id) {
    	cartRepository.deleteById(id);
    }
    public Cart getReadOneCart(String name,String userrId,String userType) {
    	return cartRepository.findByNameAndUserrIdAndUserType(name, userrId, userType);
    }
	
}
