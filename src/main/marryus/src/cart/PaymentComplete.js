import React, { useEffect, useState } from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";
import './paymentComplete.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Numeral from 'numeral';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const PaymentComplete = () => {

    const location = useLocation();
    const orderNum = location.state?.orderNum;
    console.log(orderNum+'잘받는데?');
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        // orderNum이 있으면 API 요청을 보냄
        if (orderNum) {
            axios.get(`/api/payment/orderComplete?orderId=${orderNum}`)
            .then(response => {
                setOrderData(response.data);  // API 응답 데이터를 state에 저장
            })
            .catch(error => {
                console.error('Error fetching order data:', error);
            });
        }
       
    }, [orderNum]);

    if (!orderData) {
        return <div>Loading...</div>;
    }

    // order와 products를 분리하여 사용
    const { order, products } = orderData;


    return (
        <div className='content-center'>

            <div style={{border:'1px solid black', width:'600px', margin:'40px 0 60px', borderRadius:'24px', boxShadow:'7px 7px 10px 0px rgba(0, 0, 0, 0.3)'}}>

                <div className='content-center' style={{marginTop:'30px'}}>
                    <FaRegCircleCheck style={{width:'80px', height:'80px', color:'red'}}/>
                </div>

                <div className='content-center'>
                    <strong style={{fontSize:'22pt', marginTop:'25px'}}>구매가 완료되었습니다. 주문번호: {orderNum}</strong>
                </div>

                <div className='content-center'>
                    <p style={{color:'red', fontSize:'11pt', marginRight:'400px', marginTop:'30px'}}>결제 이메일</p>
                </div>

                <div className='content-center'>
                    <div style={{flexDirection:'column', alignItems:'flex-start', width:'470px'}}>
                        <p style={{fontSize:'11pt'}}>{order.member.email}</p>
                    </div>
                </div>

                <div className='content-center'>
                    <p style={{color:'red', fontSize:'11pt', marginRight:'430px', marginTop:'30px'}}>상품명</p>
                </div>

                <div className='content-center'>
                    <div style={{flexDirection:'column', alignItems:'flex-start', width:'470px'}}>
                        {products.map((product, index) => (
                            <div style={{display:'flex'}} key={index}>
                                <p style={{fontSize:'11pt'}}>- {product.pname},</p>
                                <p style={{fontSize:'11pt',paddingLeft:'13px'}}>{product.pcat},</p>
                                <p style={{fontSize:'11pt',paddingLeft:'13px'}}>{Numeral(product.price).format('0,0')}원</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='content-center'>
                    <p style={{color:'red', fontSize:'11pt', marginRight:'415px', marginTop:'30px'}}>결제수단</p>
                </div>

                <div className='content-center'>
                    <div style={{flexDirection:'column', alignItems:'flex-start', width:'470px'}}>
                        <p style={{fontSize:'11pt'}}>
                            { order.payMethod==='CREDIT_CARD'
                                    ? '신용카드' : '그외 결제방법'
                            }
                        </p>
                    </div>
                </div>

                <div className='content-center'>
                    <p style={{color:'red', fontSize:'11pt', marginRight:'415px', marginTop:'30px'}}>결제금액</p>
                </div>

                <div className='content-center'>
                    <div style={{flexDirection:'column', alignItems:'flex-start', width:'470px'}}>
                        <p style={{fontSize:'11pt'}}>{Numeral(order.totalPrice).format('0,0')}</p>
                    </div>
                </div>

                <div className='content-center'>
                    <Link to='/main'>
                        <button className='completeBtn'>확&nbsp;&nbsp;인</button>
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default PaymentComplete;