import React, { useEffect, useState } from 'react';
import PaymentModal from './PaymentModal';
import * as PortOne from "@portone/browser-sdk/v2";

const DWPayment = () => {

    const  LetsPay = async () => {
        const response = await PortOne.requestPayment({
            storeId: "store-9b57f72e-69ea-41b3-aadf-c57541ce33ba",
            channelKey: "channel-key-5d5ddf15-c935-4d80-8c2c-ea68627e11b8",
            paymentId: `payment-${crypto.randomUUID().slice(0, 32)}`,
            orderName: "나이키 와플 트레이너 2 SD",
            totalAmount: 1000,
            currency: "CURRENCY_KRW",
            payMethod: "CARD",
            customer:{
                customerId: 'eodnd3312',
                fullName: '황대웅씨',
                email:'eodnd3312@gmail.com',
                phoneNumber: '0803350020'
            }
        })
        console.log(response)
        if (response.code != null) {
            // 오류 발생
            return alert(response.message);
          }else{
            console.log(response)
          }
        // /payment/complete 엔드포인트를 구현해야 합니다. 다음 목차에서 설명합니다.
        const notified = await fetch('api/payment/complete', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // paymentId와 주문 정보를 서버에 전달합니다
            body: JSON.stringify({
            paymentId: response.paymentId,
            order: response.txId,
            // 주문 정보...
            }),
        });
    }
    
    return (
        <div>
            <button onClick={LetsPay}>
                
                결제하기 눌러봐
                </button>
        </div>
    );
};

export default DWPayment;