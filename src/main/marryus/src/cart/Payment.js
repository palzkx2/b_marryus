import React, { useEffect, useState } from 'react';
import './payment.css';
import cartdata from './cartData';
import Numeral from 'numeral';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import * as PortOne from "@portone/browser-sdk/v2";
import PaymentInputs from './PaymentInputs';

const Payment = () => {

    const location = useLocation(); // useLocation 사용
    const [cartData] = useState(location.state?.items || []); // 전달받은 데이터 사용
    const [userName,setUserName] = useState('');//이름 불러오기
    const [phone,setPhone] = useState('');//전화번호 불러오기
    const [email, setEmail] = useState(''); //이메일 불러오기
    const [totalPrice, setTotalPrice] = useState(location.state?.totalAmount || 0);
  

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get('/api/session');
                setUserName(response.data.name);
                setPhone(response.data.phone);
                setEmail(response.data.email); 
            } catch (error) {
                console.log('세션 데이터 가져오기 실패:', error);
            }
        };

        // const fetchOauthData = async () => { //OAuth 데이터 가져오기
        //     try {
        //         const response = await axios.get('/api/oauthReaduser');          
        //             setUserName(response.data.name);
        //             setPhone(response.data.phone);
        //             setEmail(response.data.email);              
        //     } catch (error) {
        //         console.log('OAuth 데이터 가져오기 실패:', error);
        //     }
        // };

        fetchSessionData();
       // fetchOauthData(); // OAuth 데이터 가져오는 함수 호출
    }, []);
    
    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartData.reduce((acc, item) => acc + item.price*item.quantity, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cartData]);

    const requestPayment = () => {
        const paymentId = `payment-${crypto.randomUUID().slice(0, 30)}`;
        //const paymentId = 123;
        const cartIds = cartData.map(item => item.id);
        
        PortOne.requestPayment({
            storeId: "store-bbe87222-8591-4722-8181-48e02a268865",
            channelKey: "channel-key-f80c9eee-2239-477a-a67b-f2bf4d975a13",
            paymentId,
            orderName: "상품이름이나와야하는데..",
            totalAmount: totalPrice,
            currency: "CURRENCY_KRW",
            payMethod: "CARD",
            customer: {
                fullName: userName,
                phoneNumber: phone,
                email: email,
            },
        }, async (response) => {
            if (response.success) {
                const impUid = response.data.imp_uid;
                console.log("imp_uid 왜 안나와",impUid)
                try {
                     // 1. 결제 확인 요청 - PaymentController의 /api/order/payment/{imp_uid}로 요청 전송
                     const verifyPaymentResponse = await axios.get(`/api/order/payment/${impUid}`, { 
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true,
                    });

                    console.log("서버로부터 결제 확인 응답:", verifyPaymentResponse.data); // 수정2차
                    if (verifyPaymentResponse.data.status === "paid") {
                        alert("결제가 성공적으로 완료되었습니다.");
                        // 결제가 성공한 후 추가 로직을 넣을 수 있습니다.
                    } else {
                        alert("결제 검증 실패: 결제가 완료되지 않았습니다."); // 수정2차
                    }
                } catch (error) {
                    console.error("결제 확인 중 오류 발생:", error); // 수정2차
                    alert("결제 확인 중 오류 발생"); // 수정2차
                }
            } else {
                alert("결제 실패");
            }
        });
    };


    return (
        <div className='shopContent'>
            <div className='shopPayment'>
                <div className='shopPaymentTitle'>
                    <h1 className='sph1' style={{padding:'10px'}} >결제하기</h1>
                </div>
                {/*주문 상품정보 */}
                <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                    <div className='totalItems' style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <div className='naeItem'>
                            <div className='itemInformation' style={{ borderTop: '#ddd' ,padding:'24px'}}>
                                <h3 style={{paddingTop:'12px',paddingLeft:'22px',paddingBottom:'10px',fontWeight:'800',borderBottom:'3px solid #999'}}> 주문 상품 정보
                                </h3>
                                
                                {cartData.length > 0 && (
                                    <div style={{ display: 'flex', flexDirection: 'column',  margin: '30px' }}>
                                    <p>장소      /    가격</p>
                                    {cartData.map((item) => (
                                            <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', marginRight: '10px' }} />
                                                <p style={{ marginRight: '10px', marginTop: '10px' }}>{item.name}</p>
                                                <p style={{ marginRight: '10px', marginTop: '9px' }}>{Numeral(item.price).format('0,0')} 원</p>
                                            </div>
                                        ))}
                            
                            </div>
                                )}
                        </div>
                    {/*주문자 정보 */}
                                {cartData.length > 0 && (    
                                <div className='myOrderInformation'> 
                                    <h3 style={{borderBottom:'3px solid #999'}}>주문자 정보</h3>
                                    <div className='columnNameBox'>
                                        <div className='jumuntextLine'>{userName}</div>
                                        <div className='jumuntextLine'>{phone}</div>
                                        <div className='jumuntextLine'>{email}</div>
                                    </div>
                                </div>
                                )}

                    {/*예약 상품정보 */}
                            <PaymentInputs/>
            </div>
                        <div className='rightItem' style={{ position: 'sticky', top: '20px' }}>
                            {cartData.length > 0 && (
                                <div className='jumunyoyak' >
                                    <h6 style={{fontSize:'1em', marginBottom:'28px'}}>주문요약</h6>
                                    <div className='yoyakgrey'>
                                        <p className='textgrey'>상품가격</p>
                                        <p className='textgrey'>예약날짜</p>
                                    </div>

                                    <div className='yoyakblack'>
                                        <p className='textblack'>
                                        {Numeral(totalPrice).format('0,0')} 원
                                        </p>
                                        <p>{cartData[0].resdate}</p>
                                    </div>
                                </div>
                            )}

                            <div className='realPayment'>
                                <h2>결제 수단</h2>
                                    <div>
                                        <input type='radio' name='payment' id='creditCard' />
                                        <label htmlFor='creditCard' style={{fontSize: '18px' ,marginBottom:'10px'}}>신용카드</label>
                                        <br />
                                        
                                    </div>
                            </div>
                            

                            <div className='lastAgreement' style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                <input type='checkbox' />
                                <label style={{marginBottom: '5px',fontSize:'18px'}}>전체 주문 동의</label>
                            </div>
                            <div className='lastButton'>
                                <button className='lastBtn' onClick={requestPayment}>결제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;