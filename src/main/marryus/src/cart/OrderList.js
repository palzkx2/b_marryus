import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderListStyles.css';
import studioImg from '../s_images/cartBar.jpg'

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/payment/orders');
            setOrders(response.data);
            setFilteredOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);

        const filtered = orders.filter(order => {
            const orderDate = new Date(order.date);
            const selected = new Date(selectedDate);
            return orderDate.toDateString() === selected.toDateString();
        });

        setFilteredOrders(filtered);
    };

    const fetchOrderDetail = (orderId) => {
        const order = orders.find(o => o.orderId === orderId);
        setSelectedOrder(order);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>  
            {/*  배너 이미지  */}
            <div className='alignGood'>
                <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                    <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${studioImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                    </div>
                </div>
            </div>
            {/*  배너 이미지  end*/}


        <div className='alignGood'>
            <div className='mainContainer'>
                <div className="orderListContainer_l5R6">
                    <div className="datePickerWrap_f9Y7">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>

                    <ul className="orderList_f9X2">
                        {filteredOrders.map(order => (
                            <li
                                key={order.orderId}
                                className="orderItem_b3T1"
                                onClick={() => fetchOrderDetail(order.orderId)}
                            >
                                <p className="orderId_p9T5">주문 ID: {order.orderId}</p>
                                <p>총 결제 금액: {order.totalPrice}원</p>
                                <p>주문 날짜: {new Date(order.date).toLocaleString()}</p>
                                <p>주문상태: {order.status==='CONFIRMED' && '결제완료'}</p>
                            </li>
                        ))}
                    </ul>

                    {selectedOrder && (
                        <div className="modalOverlay_s1W8" onClick={() => setSelectedOrder(null)}>
                            <div className="orderDetailModal_s3V5" onClick={(e) => e.stopPropagation()}>
                                <h2>주문 상세 정보<button style={{marginLeft:'30px'}} onClick={()=>setSelectedOrder(null)}>닫기</button></h2>
                                <ul className="productList_n9M1">
                                    {selectedOrder.products.map(product => (
                                        <li key={product.pid} className="productItem_d1L9">
                                            <p>제품명: {product.pname}</p>
                                            <p>카테고리: {product.pcat}</p>
                                            <p>가격: {product.price}원</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default OrderList;
