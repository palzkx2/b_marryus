package com.spring.marryus.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.siot.IamportRestClient.IamportClient;
import com.spring.marryus.dao.OrderRepository;
import com.spring.marryus.dao.PaymentRepository;
import com.spring.marryus.entity.Orders;
import com.spring.marryus.entity.Payment;
import com.spring.marryus.entity.PaymentDTO;

@Service
public class PaymentService {

	 private  PaymentRepository paymentRepository;

	    public PaymentDTO getPayment(String impUid) {
	        Payment payment = paymentRepository.findByImpUid(impUid)
	            .orElseThrow(() -> new RuntimeException("Payment not found"));
	        return convertToDTO(payment);
	    }

	    public List<PaymentDTO> getPaymentsByStatus(String status) {
	        return paymentRepository.findByStatus(status).stream()
	            .map(this::convertToDTO)
	            .collect(Collectors.toList());
	    }

	    public PaymentDTO cancelPayment(String impUid, BigDecimal amount) {
	        Payment payment = paymentRepository.findByImpUid(impUid)
	            .orElseThrow(() -> new RuntimeException("Payment not found"));
	        
	        // 여기에 실제 결제 취소 로직 구현
	        payment.setStatus("cancelled");
	        payment.setCancelAmount(amount);
	        payment.setCancelledAt(LocalDateTime.now());

	        Payment updatedPayment = paymentRepository.save(payment);
	        return convertToDTO(updatedPayment);
	    }

	    private PaymentDTO convertToDTO(Payment payment) {
	        PaymentDTO dto = new PaymentDTO();
	        BeanUtils.copyProperties(payment, dto);
	        return dto;
	    }

}
