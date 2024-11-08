import React from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";
import './paymentComplete.css'

const PaymentComplete = () => {
    return (
        <div>

            <div className='content-center'>
                <FaRegCircleCheck style={{width:'80px', height:'80px', color:'red'}}/>
            </div>

            <div className='content-center'>
                <strong style={{fontSize:'22pt', marginTop:'25px'}}>구매가 완료되었습니다.</strong>
            </div>

            <div className='content-center'>
                <p style={{color:'red', fontSize:'11pt', marginRight:'400px', marginTop:'30px'}}>결제 이메일</p>
            </div>
            <div className='content-center'>
                <p style={{fontSize:'11pt', marginRight:'400px'}}>abcd@naver.com</p>
            </div>

        </div>
    );
};

export default PaymentComplete;