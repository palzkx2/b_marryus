package com.spring.marryus.payment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentHistoryRepositoryByDW extends JpaRepository<PaymentHistoryEntity, Long>{
	List<PaymentHistoryEntity> findByCustomerId(String customerId);
}
