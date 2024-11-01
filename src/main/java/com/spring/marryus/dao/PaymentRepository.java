package com.spring.marryus.dao;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.marryus.entity.Payment;



public interface PaymentRepository extends JpaRepository<Payment, Long>{

	 Optional<Payment> findByImpUid(String impUid);
	 
	 Optional<Payment> findByMerchantUid(String merchantUid);
	    
	 List<Payment> findByStatus(String status);
	
	

}
