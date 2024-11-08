import React from 'react';
import { FaRegCircleCheck } from "react-icons/fa6";
import './paymentComplete.css'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Numeral from 'numeral';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const PaymentComplete = () => {

    const location = useLocation();
    const orderNum = location.state?.orderNum;



    return (
        <div className='content-center'>

            <div style={{border:'1px solid black', width:'600px', margin:'40px 0 60px', borderRadius:'24px', boxShadow:'7px 7px 10px 0px rgba(0, 0, 0, 0.3)'}}>

                <div className='content-center' style={{marginTop:'30px'}}>
                    <FaRegCircleCheck style={{width:'80px', height:'80px', color:'red'}}/>
                </div>

                <div className='content-center'>
                    <strong style={{fontSize:'22pt', marginTop:'25px'}}>구매가 완료되었습니다.</strong>
                </div>

                <div className='content-center'>
                    <p style={{color:'red', fontSize:'11pt', marginRight:'400px', marginTop:'30px'}}>결제 이메일</p>
                </div>

                <div className='content-center'>
                    <div style={{flexDirection:'column', alignItems:'flex-start', width:'470px'}}>
                        <p style={{fontSize:'11pt'}}>abcd@naver.com</p>
                    </div>
                </div>

                <div className='content-center'>
                    <p style={{color:'red', fontSize:'11pt', marginRight:'430px', marginTop:'30px'}}>상품명</p>
                </div>

                <div className='content-center'>
                    <div style={{flexDirection:'column', alignItems:'flex-start', width:'470px'}}>
                        <p style={{fontSize:'11pt'}}>- 웨딩홀</p>
                        <p style={{fontSize:'11pt'}}>- 스튜디오</p>
                        <p style={{fontSize:'11pt'}}>- 드레스</p>
                        <p style={{fontSize:'11pt'}}>- 메이크업</p>
                        <p style={{fontSize:'11pt'}}>- 부케</p>
                    </div>
                </div>

                <div className='content-center'>
                    <p style={{color:'red', fontSize:'11pt', marginRight:'415px', marginTop:'30px'}}>결제수단</p>
                </div>

                <div className='content-center'>
                    <div style={{flexDirection:'column', alignItems:'flex-start', width:'470px'}}>
                        <p style={{fontSize:'11pt'}}>신용카드</p>
                    </div>
                </div>

                <div className='content-center'>
                    <p style={{color:'red', fontSize:'11pt', marginRight:'415px', marginTop:'30px'}}>결제금액</p>
                </div>

                <div className='content-center'>
                    <div style={{flexDirection:'column', alignItems:'flex-start', width:'470px'}}>
                        <p style={{fontSize:'11pt'}}>{Numeral(3000000).format('0,0')}</p>
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