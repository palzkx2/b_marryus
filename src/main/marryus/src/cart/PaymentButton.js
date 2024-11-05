import React, { useEffect, useState } from "react";
import * as PortOne from "@portone/browser-sdk/v2";
import PaymentModal from './PaymentModal' 



const PaymentButton = ({paymentMethod}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

    const [memberInfo, setMemberInfo] = useState({//회원 데이터 저장
      memName: '',
      email: '',
      tel: '',
      post: '',
      addr1: '',
      addr2: ''
  }); // 모든 회원 정보를 담은 객체 상태  
  
  
  // 결제 요청 함수
    const requestPayment = () => {
      const paymentId = `payment-${crypto.randomUUID().slice(0, 30)}`; // Unique Payment ID를 40자 이내로 생성
  
      PortOne.requestPayment({
        storeId: "store-bbe87222-8591-4722-8181-48e02a268865", // 사용자 Store ID
        channelKey: "channel-key-f80c9eee-2239-477a-a67b-f2bf4d975a13", // 사용자 Channel Key
        paymentId:paymentId, // 결제 ID, 40자 이내로 설정
        orderName: "나이키 와플 트레이너 2 SD", // 주문명
        totalAmount: 1000, // 결제 금액
        currency: "CURRENCY_KRW", // 결제 통화
        payMethod: "CARD", // 결제 방법
        customer: {
          fullName:"배수지" ,// 고객 이름
          phoneNumber: "010-1111-2222", // 고객 전화번호
          email: "suzi@naver.com", // 고객 이메일
        },
      }).then(response => {
        if (response.error_code) {
          setModalMessage(`결제에 실패하였습니다. 에러내용: ${response.error_msg}`);
          setIsModalOpen(true); // 모달 열기
        } else if (response.success) {
          alert("결제에 성공하였습니다.");
        } else {
          setModalMessage(`결제에 실패하였습니다. 에러내용: ${response.error_msg}`);
          setIsModalOpen(true); // 모달 열기
        }
      }).catch(error => {
        setModalMessage(`결제 중 오류가 발생하였습니다: ${error.message}`);
        setIsModalOpen(true); // 모달 열기
      });
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false); // 모달 닫기
    };
  
    return (
      <>
        <button onClick={requestPayment}>결제하기</button>
        {isModalOpen && <PaymentModal message={modalMessage} onClose={handleCloseModal} />}
      </>
    );
  };
  
  export default PaymentButton;