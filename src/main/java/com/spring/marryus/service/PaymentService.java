package com.spring.marryus.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import com.spring.marryus.dao.OrderRepository;
import com.spring.marryus.dao.PaymentRepository;
import com.spring.marryus.entity.Orders;
import com.spring.marryus.entity.Payments;
import com.spring.marryus.entity.PaymentDTO;

@Service
public class PaymentService {
	
	 private final IamportClient iamportclient;
	    private final OrderRepository orderRepository; // 수정한부분
	    private final PaymentRepository paymentRepository;

	    @Autowired
	    public PaymentService(
	        OrderRepository orderRepository, 
	        PaymentRepository paymentRepository,
	        @Value("${imp.api.key}") String apiKey, // 수정한부분
	        @Value("${imp.api.secretkey}") String apiSecret // 수정한부분
	    ) {
	        this.iamportclient = new IamportClient(apiKey, apiSecret); // 수정한부분
	        this.orderRepository = orderRepository;
	        this.paymentRepository = paymentRepository;
	    }
	    //중복주문 방지용
		public PaymentDTO verifyPayment(String imp_uid) throws IamportResponseException, IOException {
	    // Iamport API를 사용하여 imp_uid로 결제 정보 조회
	    IamportResponse<Payment> iamportResponse = iamportclient.paymentByImpUid(imp_uid);
	    
	    // 결제 정보를 가져옴
	    if (iamportResponse.getResponse() == null) { // API 호출 실패 시 처리
	        throw new IllegalArgumentException("결제 정보를 가져올 수 없습니다. 유효하지 않은 imp_uid입니다.");
	    }

	    Long amount = iamportResponse.getResponse().getAmount().longValue();
	    String name = iamportResponse.getResponse().getName();
	    String status = iamportResponse.getResponse().getStatus();

	    // 가져온 정보를 사용하여 PaymentDTO 생성
	    PaymentDTO paymentDTO = PaymentDTO.builder()
	        .impUid(imp_uid)
	        .amount(BigDecimal.valueOf(amount))
	        .status(status)
	        .name(name)
	        .build();
	    
	    // 결제 정보가 이미 저장되었는지 확인
	    if (paymentRepository.countByImpUidContainsIgnoreCase(imp_uid) == 0) {
	        // 결제 상태가 'paid'인 경우에만 저장
	        if ("paid".equals(status)) {
	            Payments payment = new Payments(paymentDTO); // 수정한 부분: Payments 엔티티로 변환
	            paymentRepository.save(payment);
	            return paymentDTO;
	        } else {
	            // 결제 오류 처리
	            paymentDTO.setStatus("결제 오류입니다. 다시 시도해주세요.");
	            return paymentDTO;
	        }
	    } else {
	        // 이미 결제된 경우 상태 업데이트
	        paymentDTO.setStatus("이미 결제 되었습니다.");
	        return paymentDTO;
	    }
	 }

    @Transactional
    public String compareProcessPayment(PaymentDTO paymentDTO, Long orderId) {
        // 주문 테이블에서 orderId에 해당하는 주문 조회
        Orders orders = orderRepository.findById(orderId).orElse(null);

        if (orders== null) {
            return "주문을 찾을 수 없습니다."; // 해당 주문이 없는 경우 
        }

       
        BigDecimal totalOrderPrice = orders.getTotalPrice(); 

        // 결제 금액과 주문 금액 비교
        if (totalOrderPrice.compareTo(paymentDTO.getAmount()) != 0) {
            return "결제 금액이 주문 금액과 일치하지 않습니다."; // 금액 불일치로 결제 불가 
        }

        // 결제 정보 저장 (결제 성공으로 간주)
        Payments payment = new Payments(paymentDTO); 
        paymentRepository.save(payment); 

        return "결제가 성공적으로 처리되었습니다."; // 결제 성공 시 메시지 반환 
    }
	
	
}

/*
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
*/