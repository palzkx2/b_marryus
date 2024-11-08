import React, { useEffect, useState } from 'react';
import './payment.css';
import cartdata from './cartData';
import Numeral from 'numeral';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
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
    const [btnToggle,setBtnToggle] = useState(false);
    const [orderNum,setOrderNum] = useState('');

    const history = useHistory();

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

        const fetchOauthData = async () => { //OAuth 데이터 가져오기
            try {
                const response = await axios.get('/api/oauthReaduser');          
                    setUserName(response.data.name);
                    setPhone(response.data.phone);
                    setEmail(response.data.email);              
            } catch (error) {
                console.log('OAuth 데이터 가져오기 실패:', error);
            }
        };


        fetchSessionData();
       fetchOauthData(); // OAuth 데이터 가져오는 함수 호출
       
    }, []);
    
    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = cartData.reduce((acc, item) => acc + item.price*item.quantity, 0);
            setTotalPrice(total);
        };
        calculateTotalPrice();
    }, [cartData]);

    const requestPayment = async() => {
        
        const paymentId = `payment-${crypto.randomUUID().slice(0, 30)}`;
        //const paymentId = 123;
        const cartIds = cartData.map(item => item.id);
        const cartProductNames = cartData.map(item => item.name);
        
        alert('결제하기 함수 호출도미')
        const response = await PortOne.requestPayment({
            storeId: "store-9b57f72e-69ea-41b3-aadf-c57541ce33ba",
            channelKey: "channel-key-5d5ddf15-c935-4d80-8c2c-ea68627e11b8",
            paymentId: `payment-${crypto.randomUUID().slice(0, 32)}`,
            orderName: (cartProductNames.length-1===0) ? cartProductNames[0] : cartProductNames[0]+'외 '+ (cartProductNames.length-1)+'개 의 상품',
            totalAmount: totalPrice,
            currency: "CURRENCY_KRW",
            payMethod: "CARD",
            customer:{
                customerId: userName,
                fullName: userName,
                email:email,
                phoneNumber: phone
            }
        })
        console.log('결제처리됨 반환값은1?',response)
        if (response.code != null) {
            // 오류 발생
            return alert('결제처리안안됨됨 반환값은?',response.message);
          }else{
            console.log('결제처리됨 반환값은2?',response)
          }
        
        const notified = await fetch('api/payment/complete', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            paymentId: response.paymentId,
            txId: response.txId,
            orderId: orderNum,
            // 주문 정보...
            }),
        });
        const message = await notified.text();  // 응답 메시지를 텍스트로 받기
        console.log(message);
        if(message==='결제 완료'){
            console.log('Redirecting with orderNum:', orderNum);
            history.push({
                pathname: '/paymentComplete',
                state: { orderNum: orderNum  }
            });
        }
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
                                                {/* <img src={item.img} alt={item.name} style={{ width: '60px', height: '60px', marginRight: '10px' }} /> */}
                                                <p style={{ marginRight: '10px', marginTop: '10px' }}>{item.name}</p>
                                                <p style={{ marginRight: '10px', marginTop: '10px' }}>{item.category}</p>
                                                <p style={{ marginRight: '10px', marginTop: '9px' }}>{Numeral(item.price).format('0,0')} 원</p>
                                                <p style={{ marginRight: '10px', marginTop: '9px' }}>X {item.quantity}</p>
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
                            <PaymentInputs setOrderNum={setOrderNum} cartData={cartData}/>
            </div>
                        <div className='rightItem' style={{ position: 'sticky', top: '90px' }}>
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
                                <button onClick={requestPayment} className={`lastBtn ${btnToggle ? 'active' : 'lastInactiveBtn'}`}>결제하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;