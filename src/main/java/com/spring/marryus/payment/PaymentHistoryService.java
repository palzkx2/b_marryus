package com.spring.marryus.payment;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentHistoryService {
	
	private final PaymentHistoryRepositoryByDW paymentHistoryRepository;
	
	public void saveHistory(PaymentHistoryEntity paymentHistory) {
		paymentHistoryRepository.save(paymentHistory);
	}
}
