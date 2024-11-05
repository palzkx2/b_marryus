import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './carttoorder.css';

<<<<<<< HEAD
const CarttoOrder = ({ handleOrder, checkedItems, calculateTotal }) => {
    
    // 세션 정보 가져오기
    const [userName, setUserName] = useState(''); // 이름 불러오기
    const [phone, setPhone] = useState(''); // 전화번호 불러오기
    const [email, setEmail] = useState(''); // 이메일 불러오기
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
        fetchSessionData();
    }, []);

    const ssgOrderPost = async () => {
        // 총 결제 금액을 계산 (calculateTotal이 존재하는지 확인)
        const totalAmount = typeof calculateTotal === 'function' ? calculateTotal() : 0;
        
        // checkedItems를 사용하여 cartIds 추출
        const cartIds = checkedItems.map(item => item.id); // checkedItems에서 id 추출
        
        // 결제에 필요한 추가 정보 구성
        const payload = {
            paymentId: `payment${crypto.randomUUID()}`,
            cartIds: cartIds,
            totalAmount: totalAmount // 추가된 총 결제 금액 필드
        };

        try {
            const response = await axios.post('http://localhost:8080/api/order/create', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            
            console.log("서버 응답 데이터 order/create: ", response.data);
           
            if (response.data.result === 'success') {
                console.log("등록 성공!");
                // history 객체 사용 (React Router에서 useHistory를 통해 가져올 수 있습니다)
               history.push('/'); // 페이지 이동
            } else {
                console.log("등록 실패:", response.data);
            }
=======
const CarttoOrder = ({ handleOrder, checkedItemsWithCategory, totalAmount }) => {
    
    // 세션 정보 가져오기
    const [userName, setUserName] = useState(''); // 이름 불러오기
    const [phone, setPhone] = useState(''); // 전화번호 불러오기
    const [email, setEmail] = useState(''); // 이메일 불러오기
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
        fetchSessionData();
    }, []);

    const ssgOrderPost = async () => {
        // 총 결제 금액을 계산 (calculateTotal이 존재하는지 확인)
        const totalAmountValue = totalAmount ||0;
        
        // checkedItems를 사용하여 cartIds 추출
        const cartIds = checkedItemsWithCategory.map(item => item.id); // checkedItems에서 id 추출
        



        
        // 결제에 필요한 추가 정보 구성
        const payload = {
            paymentId: `payment${crypto.randomUUID()}`,
            cartIds: cartIds,
            totalAmount: totalAmountValue // 추가된 총 결제 금액 필드
            ,
            bookDate: new Date().toISOString(), // 예약 날짜, 현재 날짜 사용 예시 //수정한 부분
            ordererName: userName, // 주문자 이름 //수정한 부분
            payMethod: 'CREDIT_CARD', // 결제 방식, 예시로 신용카드 사용 //수정한 부분
            email: email, // 이메일 
            phone: phone // 전화번호 


        };

        try {
            const response = await axios.post('http://localhost:8080/api/order/create', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            
            console.log("서버 응답 데이터 order/create: ", response.data);
           
            
            
>>>>>>> refs/remotes/origin/hhhh
        } catch (error) {
            console.error("제출 중 오류 발생:", error.response ? error.response.data : error.message);
        }
    };

    const handleClick = (event) => {
        ssgOrderPost(); // 주문 제출 함수 호출
        handleOrder(event); // 주문 핸들러 호출
    };

    return (
        <div className='carttoorder'>
            <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                <button style={{ width: '300px', marginRight: '20px' }} className="order-button" onClick={handleClick}>
                    주문하기
                </button>
                <button style={{ width: '300px' }} className="norder-button" onClick={handleClick}>
                    카카오 페이로 주문하기
                </button>
            </div>
        </div>
    );
};

export default CarttoOrder;
