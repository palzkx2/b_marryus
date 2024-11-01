package com.spring.marryus.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.marryus.entity.PaymentDTO;
import com.spring.marryus.service.PaymentService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
	 private final PaymentService paymentService;
	 
	 @GetMapping("/{impUid}")
	 public ResponseEntity<PaymentDTO> getPayment(@PathVariable String impUid) {
	 
		 return ResponseEntity.ok(paymentService.getPayment(impUid));
	    }

	    @GetMapping("/status/{status}")
	    public ResponseEntity<List<PaymentDTO>> getPaymentsByStatus(@PathVariable String status) {
	        return ResponseEntity.ok(paymentService.getPaymentsByStatus(status));
	    }

//	    @PostMapping("/cancel")
//	    public ResponseEntity<PaymentDTO> cancelPayment(@RequestBody Map<String, Object> payload) {
//	        String impUid = (String) payload.get("imp_uid");
//	        BigDecimal amount = new BigDecimal(payload.get("amount").toString());
//	        return ResponseEntity.ok(paymentService.cancelPayment(impUid, amount));
//	    }
//	    
}
