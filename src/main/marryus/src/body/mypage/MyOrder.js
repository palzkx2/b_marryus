import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Bar from './Bar';
import './myOrder.css';
import numeral from 'numeral';

const MyOrder = () => {

    const orders = [
        {
            weddingHall: '웨딩홀 A',
            weddingHallPrice: 1000000,
            sdmeInfo: '스드메 A',
            sdmePrice: 500000,
            weddingGoodsInfo: '혼수 A',
            weddingGoodsPrice: 300000,
            travelInfo: '여행지 A',
            travelPrice: 150000,
            customerName: '홍길동',
            customerPhone: '010-1234-5678',
            customerEmail: 'hong@example.com',
            reserverLastName: '홍',
            reserverFirstName: '길동',
            reserverEmail: 'gildong@example.com',
            reserverPhone: '010-9876-5432',
            totalAmount: 2000000,
            paymentMethod: '신용카드',
        },
    ];

    return (
        <div>
            <div className='alignGood'><Bar /></div>
            
            <div className='mainContainer'>
                <div className='myAccHeader'>내 주문목록</div>
                {orders.map((order, index) => (
                    <div key={index} className='cartConbox'>
                        <div className='cart-item'>
                            <div>웨딩홀 정보: {order.weddingHall}</div>
                            <div>웨딩홀 가격: {numeral(order.weddingHallPrice).format('0,0')} 원</div>
                        </div>
                        <div className='cart-item'>
                            <div>스드메 정보: {order.sdmeInfo}</div>
                            <div>스드메 가격: {numeral(order.sdmePrice).format('0,0')} 원</div>
                        </div>
                        <div className='cart-item'>
                            <div>혼수 정보: {order.weddingGoodsInfo}</div>
                            <div>혼수 가격: {numeral(order.weddingGoodsPrice).format('0,0')} 원</div>
                        </div>
                        <div className='cart-item'>
                            <div>여행지 정보: {order.travelInfo}</div>
                            <div>여행지 가격: {numeral(order.travelPrice).format('0,0')} 원</div>
                        </div>
                        <div className='cart-item'>
                            <div>주문자 이름: {order.customerName}</div>
                        </div>
                        <div className='cart-item'>
                            <div>주문자 번호: {order.customerPhone}</div>
                        </div>
                        <div className='cart-item'>
                            <div>주문자 이메일: {order.customerEmail}</div>
                        </div>
                        <div className='cart-item'>
                            <div>예약자 성: {order.reserverLastName}</div>
                        </div>
                        <div className='cart-item'>
                            <div>예약자 이름: {order.reserverFirstName}</div>
                        </div>
                        <div className='cart-item'>
                            <div>예약자 이메일: {order.reserverEmail}</div>
                        </div>
                        <div className='cart-item'>
                            <div>예약자 번호: {order.reserverPhone}</div>
                        </div>
                        <div className='cart-item'>
                            <div>총액: {numeral(order.totalAmount).format('0,0')} 원</div>
                        </div>
                        <div className='cart-item'>
                            <div>결제수단: {order.paymentMethod}</div>
                        </div>
                        <hr />
                    </div>
                ))}
                <div className='conBox'>
                    <Link to='/myPage'>
                        <p className='byeBtn order-button'>돌아가기</p>
                    </Link>
                    <Link to='#'>
                        <p className='byeBtn norder-button'>수정 완료</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;
