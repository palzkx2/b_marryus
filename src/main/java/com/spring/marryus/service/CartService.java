package com.spring.marryus.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.marryus.dao.CartRepository;
import com.spring.marryus.entity.Cart;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository; 

    public void addCart(String userId, int productCount, String userType, String category, String productName, String productPrice, Cart cart) {
        cart.setUserrId(userId);
        cart.setCount(productCount);
        cart.setUserType(userType);
        cart.setCategory(category);
        cart.setName(productName);
        cart.setPrice(productPrice);
        cartRepository.save(cart);
    }

    public List<Cart> readCarts(String userrId, String userType) {
        return cartRepository.findByUserrIdAndUserType(userrId, userType);
    }
}
