package com.spring.marryus.payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentHistoryRepositoryByDW extends JpaRepository<PaymentHistoryEntity, Long>{
	
}
