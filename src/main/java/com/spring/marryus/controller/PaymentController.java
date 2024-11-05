package com.spring.marryus.controller;

import java.io.IOException;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.spring.marryus.entity.PaymentDTO;
import com.spring.marryus.service.CartService;
import com.spring.marryus.service.MemberService;
import com.spring.marryus.service.Oauth2Service;
import com.spring.marryus.service.PaymentService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class PaymentController {
	

	 
 
   private final PaymentService paymentService;
   
  
   

   @ResponseBody
   @PostMapping("/payment/{imp_uid}")
   public PaymentDTO paymentByImpUid(@PathVariable("imp_uid") String imp_uid) throws IOException, IamportResponseException{
       System.out.println("진짜로 나옵니까요");
       PaymentDTO pdto;
       pdto= paymentService.verifyPayment(imp_uid);
       
       return null;
   }


}

/*
@PostMapping("/order/payment")
   public ResponseEntity<String> paymentComplete(@Login SessionUser sessionUser, @RequestBody List<OrderSaveDto> orderSaveDtos) throws IOException {
       String orderNumber = String.valueOf(orderSaveDtos.get(0).getOrderNumber());
       try {
           Long userId = sessionUser.getUserIdNo();
           paymentService.saveOrder(userId, orderSaveDtos);
           log.info("결제 성공 : 주문 번호 {}", orderNumber);

           return ResponseEntity.ok().build();

       } catch (RuntimeException e) {
           log.info("주문 상품 환불 진행 : 주문 번호 {}", orderNumber);

           String token = refundService.getToken(apiKey, secretKey);

           refundService.refundWithToken(token, orderNumber, e.getMessage());
           
           return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
       }
   }


   @PostMapping("/payment/validation/{imp_uid}")
   @ResponseBody
   public IamportResponse<Payment> validateIamport(@PathVariable String imp_uid) {
       IamportResponse<Payment> payment = iamportClient.paymentByImpUid(imp_uid);
       log.info("결제 요청 응답. 결제 내역 - 주문 번호: {}", payment.getResponse().getMerchantUid());
       return payment;
   } * 
 */
