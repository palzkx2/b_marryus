package com.spring.marryus.payment;

import java.math.BigDecimal;
import java.util.Calendar;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.marryus.entity.Member;
import com.spring.marryus.entity.Orders;
import com.spring.marryus.oauth.SessionUser;
import com.spring.marryus.service.CartService;
import com.spring.marryus.service.MemberService;
import com.spring.marryus.service.Oauth2Service;
import com.spring.marryus.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

	private final OrderService orderService;
	private final PaymentHistoryService paymentHistoryService;
	
//    @Value("${portone.api.secret}")
	private String PORTONE_API_SECRET = "xkiq9G9HZyVXUPdKmSYgrvlcALXNXLLpgtEKRtfk0qwQfBodpM5f5ODBJLHqbr4V3PvNURnjFp8cTzfE";
    private static final String PORTONE_API_URL = "https://api.portone.io/payments/";
    

    @PostMapping("/complete")
    public ResponseEntity<String> completePayment(@RequestBody PaymentRequest paymentRequest,HttpSession session) {
    	System.out.println("결제 후 처리 함수 호출됨.");
        try {
            String paymentId = paymentRequest.getPaymentId();
            String orderId = paymentRequest.getOrderId();
            String txId = paymentRequest.getTxId();
            
            System.out.println(paymentId+"paymentID 넘어오냐?");
            System.out.println(orderId+"orderId 넘어오냐?");
            System.out.println(txId+"txId 넘어오냐?");

            // 1. 포트원 결제내역 단건조회 API 호출
            String url = PORTONE_API_URL + paymentId;
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "PortOne " + PORTONE_API_SECRET);

            HttpEntity<String> entity = new HttpEntity<>(headers);
            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("결제 조회 오류: " + response.getBody());
            }
            System.out.println("결제 조회 된듯?");
            
            
            
            Payment payment = parsePaymentResponse(response.getBody()); // JSON 파싱 처리 필요
            
            System.out.println("Payment 객체 - paymentId: " + payment.getPaymentId());
            System.out.println("Payment 객체 - amount: " + payment.getAmount());
            System.out.println("Payment 객체 - status: " + payment.getStatus());
            System.out.println("JSON 파싱 잘 된듯?");
            System.out.println("API 응답: " + response.getBody());

            // 2. 고객사 내부 주문 데이터의 가격과 실제 지불된 금액을 비교
            Long orderIdLong = Long.parseLong(orderId); // orderId가 올바른지 확인
            Orders order = orderService.getOrders(orderIdLong);
            
            System.out.println(order.getEmail());
            System.out.println(order.getMerchantUid());
            System.out.println(order.getPayMethod());
            if (order == null) {
                throw new RuntimeException("주문 정보를 찾을 수 없습니다. 주문 ID: " + orderId);
            }

            BigDecimal orderDBAmount = order.getTotalPrice();  // 주문 금액 확인
            System.out.println(orderDBAmount);
            if (orderDBAmount == null || payment.getAmount() == null) {
                throw new RuntimeException("결제 금액 정보가 누락되었습니다.");
            }
            System.out.println("여기까진 잘 됨 1");
            System.out.println(payment.getAmount().getTotal());
            // 결제 금액 비교
            if (orderDBAmount.compareTo(payment.getAmount().getTotal()) == 0) {
                String sangtae;
                System.out.println("여기까진 잘 됨 2");
                switch (payment.getStatus()) {
                    case "VIRTUAL_ACCOUNT_ISSUED":
                    	 System.out.println("여기까진 잘 됨 3");
                        sangtae = "VIRTUAL_ACCOUNT_ISSUED";
                        System.out.println(sangtae);
                        break;
                    case "PAID":
                        sangtae = "PAID";
                        System.out.println("여기까진 잘 됨 4");
                        System.out.println(sangtae);
                        break;
                    default:
                        throw new RuntimeException("알 수 없는 결제 상태: " + payment.getStatus());
                }
                System.out.println("여기까진 잘 됨 5");
                
                
            } else {
                throw new RuntimeException("결제 금액 불일치");
            }

            System.out.println("결제완료까지 한걸음");
            saveHistory(session, orderId, txId, order);
           
            
            return ResponseEntity.ok("결제 완료");
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("결제 검증 실패: " + e.getMessage());
        }
    }

	private Payment parsePaymentResponse(String responseBody) {
	    try {
	        ObjectMapper objectMapper = new ObjectMapper();
	        return objectMapper.readValue(responseBody, Payment.class);
	    } catch (Exception e) {
	        throw new RuntimeException("JSON 파싱 오류: " + e.getMessage());
	    }
	}
	
	
	private final Oauth2Service oauth2Service;
	private final MemberService memberService;
	
	private Customer getMemeber(HttpSession session) {
		
		System.out.println("멤버 확인 메소드 호출됨");
		
		SessionUser oauthUser = (SessionUser) session.getAttribute("oauthUser");
        Member defaultUser = (Member) session.getAttribute("user");
        Customer user = new Customer();
        String userId="유저ID";
        String userType = "회원종류";
        
        // 세션에서 읽은 값이 null이 아닌지 확인
        if (oauthUser != null) {
            userId = oauth2Service.readUser(oauthUser.getEmail()).getId().toString();	
            user.setUserId(userId);
            System.out.println("멤버 확인 메소드 호출됨1" + userId);
            
            user.setUserEmail(oauth2Service.readUser(oauthUser.getEmail()).getEmail().toString());
            System.out.println("멤버 확인 메소드 호출됨2");
            
            userType = "oauth";
            user.setUserType(userType);
            System.out.println("멤버 확인 메소드 호출됨3");
        }
        if (defaultUser != null) {
            userId = memberService.readUser(defaultUser.getEmail()).getId().toString();
            user.setUserId(userId);
            System.out.println("멤버 확인 메소드 호출됨1" + userId);
            
            user.setUserEmail(defaultUser.getEmail());
            System.out.println("멤버 확인 메소드 호출됨2");
            
            userType = "default";
            user.setUserType(userType);
            System.out.println("멤버 확인 메소드 호출됨3");
        }
        else {
            // 예외를 던지거나, 기본값 처리
            throw new RuntimeException("로그인 정보가 존재하지 않습니다.");
        }
        System.out.println("멤버 확인 메소드 호출됨5" + " : " + user.getUserEmail() + " : " + user.getUserId() + " : " + user.getUserType());
        return user;
	}
	
	private void saveHistory(HttpSession session,String orderId,String txId,Orders order) {
		System.out.println("DB 저장 메소드 호출됨");
		 Customer c1 = new Customer();
         c1 = getMemeber(session);
         System.out.println("DB 저장 메소드 호출됨1");
         
         System.out.println(c1.getAddr() + " 주소 호출됨 ");
         System.out.println(c1.getUserEmail() + " 이메일 호출됨 ");
         System.out.println(c1.getUserId() + " 아이디 호출됨 ");
         System.out.println(c1.getUserType() + " 타입 호출됨 ");
         
         PaymentHistoryEntity pHistory = new PaymentHistoryEntity();
         
         pHistory.setOrderId(orderId);
         System.out.println("DB 저장 메소드 호출됨2");
         pHistory.setTransactionId(txId);
         System.out.println("DB 저장 메소드 호출됨3");
         pHistory.setOrderDate(Calendar.getInstance().getTime());
         System.out.println("DB 저장 메소드 호출됨4");
         pHistory.setCustomerContact(order.getPhone());
         System.out.println("DB 저장 메소드 호출됨5");
         pHistory.setTotalPrice(order.getTotalPrice().toString());
         System.out.println("DB 저장 메소드 호출됨6");
         pHistory.setPaymentMethod(order.getPayMethod().toString());
         System.out.println("DB 저장 메소드 호출됨7");
         pHistory.setStatus(order.getStatus().toString());
         System.out.println("DB 저장 메소드 호출됨8");
         
         pHistory.setCustomerEmail(c1.getUserEmail());
         System.out.println("DB 저장 메소드 호출됨10");
         pHistory.setCustomerId(c1.getUserId());
         System.out.println("DB 저장 메소드 호출됨11");
         pHistory.setCustomerType(c1.getUserType());
         System.out.println("DB 저장 메소드 호출됨12");
         pHistory.setShippingAddress(c1.getAddr());
         System.out.println("DB 저장 메소드 호출됨13");
         
         paymentHistoryService.saveHistory(pHistory);
         System.out.println("DB 저장 메소드 호출됨14");
         
         System.out.println("주문내역 저장됨");
	}
	
	
}
