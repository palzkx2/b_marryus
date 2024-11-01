import React, { useEffect, useState } from 'react';
import './payment.css';
import Numeral from 'numeral';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import * as PortOne from "@portone/browser-sdk/v2";

const Payment = () => {
    const location = useLocation(); // useLocation 사용
    const [cartData] = useState(location.state?.items || []); // 전달받은 데이터 사용
    const [userName,setUserName] = useState('');//이름 불러오기
    const [phone,setPhone] = useState('');//전화번호 불러오기
    const [email, setEmail] = useState(''); //이메일 불러오기
    const [totalPrice,setTotalPrice]= useState(0);
    const [paymentMethod, setPaymentMethod] = useState(null);

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
            const total = cartData.reduce((acc, item) => acc + item.price, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [cartData]);


    const handlePaymentMethodChange = (event) => {
        const selectedMethod = event.target.value;
        setPaymentMethod((prev) => (prev === selectedMethod ? null : selectedMethod));
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
                                                <p style={{ marginRight: '10px', marginTop: '9px' }}>{Numeral(totalPrice).format('0,0')} 원</p>
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
                            <div className='reservationInformation' style={{ width: '90%', maxWidth: '472px', height:'414px',margin: '0 auto', padding: '20px' }}>
                                <h3 className='ritems'>
                                    예약 정보 입력
                                </h3>

                                <div className='ritemsName' style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
                                        <label style={{ marginBottom: '5px' }}>영문 이름</label>
                                        <input placeholder='gildong' style={{ width: '100%', height: '30px', padding: '5px' }} />
                                    </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
                                            <label style={{ marginBottom: '5px' }}>영문 성</label>
                                            <input placeholder='hong' style={{ width: '100%', height: '30px', padding: '5px' }} />
                                        </div>
                                </div>
  
                                        <div>
                                            <p style={{ fontSize: '10pt',marginTop:'-11px',color: '#999'}}>
                                                띄어쓰기 없이 입력해주세요.
                                            </p>
                                        </div>

                                        <div className='ritemsEmail' style={{ display: 'flex', flexDirection: 'column', margin: '15px 0' }}>
                                            <label style={{ marginBottom: '5px' }}>이메일</label>
                                                <input placeholder='email@example.com' style={{ width: '100%', height: '30px', padding: '5px' }} />
                                        </div>

                                        <div className='ritemsPhone' style={{ display: 'flex', flexDirection: 'column', margin: '15px 0' }}>
                                            <label style={{ marginBottom: '5px' }}>번호</label>
                                                <input placeholder='010-0000-0000' style={{ width: '100%', height: '30px', padding: '5px' }} />
                                        </div>
                                        <div  className='lastButton' >
                                                    <button className='lastBtn' style={{ display: 'flex', 
                                                        justifyContent: 'center', alignItems: 'center',  width: '103%', 
                                                        height: '50px'  }}>입력하기
                                                    </button>
                                        </div>
                            </div>
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

                            {/* 결제 수단 선택 */}
                        <div className='realPayment'>
                            <h2>결제 수단</h2>
                            <div>
                                <input 
                                    type='radio' 
                                    name='payment' 
                                    id='creditCard' 
                                    value='CARD' 
                                    
                                />
                                <label htmlFor='creditCard' style={{ fontSize: '18px', marginBottom: '10px' }}>신용카드</label>
                                
                                
                            </div>
                        </div>
                            

                            <div className='lastAgreement' style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                                <input type='checkbox' />
                                <label style={{marginBottom: '5px',fontSize:'18px'}}>전체 주문 동의</label>
                            </div>
                            {/* 결제하기 버튼 */}
                                <div className='lastButton'>
                                    <button className='lastBtn' onClick={() => { 
                                        // 결제 요청 처리
                                        console.log('선택된 결제 방법:', paymentMethod); 
                                        // 여기에 PaymentButton 호출 및 결제 로직 추가
                                    }}>결제하기</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Payment;