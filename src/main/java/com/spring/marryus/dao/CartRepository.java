package com.spring.marryus.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{
	
	Cart findByNameAndUserrId(String productName,String userrId);
	
	List<Cart> findByUserrIdAndUserType(String userrId,String userType);

}
