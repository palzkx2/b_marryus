import React, { useEffect } from 'react';

const Payment2 = () => {

  useEffect(() => {
    // SDK 로드
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);




  const requestPay=()=> {
  
    const {IMP} = window.IMP;
    IMP.init("imp00314174")
    
    
        IMP.request_pay(
            {
              channelKey: "kakaopay",
              pay_method: "card",
              merchant_uid: `payment-${crypto.randomUUID()}`, // 주문 고유 번호
              name: "노르웨이 회전 의자",
              amount: 64900,
              buyer_email: "gildong@gmail.com",
              buyer_name: "홍길동",
              buyer_tel: "010-4242-4242",
              buyer_addr: "서울특별시 강남구 신사동",
              buyer_postcode: "01181",
            },
            function (response) {
              // 결제 종료 시 호출되는 콜백 함수
              // response.imp_uid 값으로 결제 단건조회 API를 호출하여 결제 결과를 확인하고,
              // 결제 결과를 처리하는 로직을 작성합니다.
            },
          );
    }


    

    return (
        <div>
            <button onClick={requestPay}>I'll pay</button>
        </div>
    );
};

export default Payment2;