import React from 'react';
import './cart.css';
import {  TbShoppingCartHeart } from 'react-icons/tb';
const Cart = () => {
    return (
        
        <div className='cart'>
            <div>
                <div>   
                    <div className='cart-flex-container'>
                        <h2 style={{marginTop:'1em', marginLeft:'1em'}} className='cart-Name'><TbShoppingCartHeart className='icon1'/> 장바구니</h2>
                    </div>

                    <div className='cart-flex-container'>
                        <table className='cart-table'>
                            <colgroup>
                                <col style={{width:'189px'}}/>
                                <col style={{width:'189px'}}/>
                                <col style={{width:'147px'}}/>
                            </colgroup>
                            <thead>
                                <tr>
                                    <th className='cartleft'> 
                                        <label className='cart-custom-checkbox'>
                                            <input type="checkbox"/>
                                            <span></span> 상품정보
                                        </label>
                                    </th>
                                    <th>수량</th>
                                    <th>예약일자</th>
                                    <th> 주문금액</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td>
                                        <button>선택상품 삭제</button>
                                        <button>품절상품 삭제</button>
                                    </td>
                                    
                                    <td colSpan={3}><span>결제 시 추가 할인 적용에 따라 배송비가 변경될 수 있습니다.</span>
                                    
                                    <span>네이버페이로 결제 시 할인금액과 배송비가 변경될 수 있습니다.</span>
                                    </td>
                                </tr>
                            </tfoot>
                            <tbody>
                                <tr>
                                    <td className='cartleft'>
                                        <label className='cart-custom-checkbox'>
                                            <input type="checkbox" />
                                            <span></span>에베레스트 간당
                                        </label>    
                                    </td>
                                    <td>1 <br/><button>수량변경</button></td>
                                    <td>24.10.09<br/><button>날짜변경</button></td>
                                    <td>$777</td>
                                </tr>
                                <tr>
                                    <td className='cartleft'>
                                        <label className='cart-custom-checkbox'>
                                            <input type="checkbox" />
                                            <span></span>괌 간당
                                        </label>
                                    </td>
                                    <td>2<br/><button>수량변경</button></td>
                                    <td>24.10.09<br/><button>날짜변경</button></td>
                                    <td>$777</td>
                                </tr>
                                <tr>
                                    <td className='cartleft'>
                                        <label className='cart-custom-checkbox'>
                                            <input type="checkbox"/><span></span>온가족이 호주 간당
                                        </label>
                                    </td>
                                    <td>5<br/><button>수량변경</button></td>
                                    <td>24.10.09<br/><button>날짜변경</button></td>
                                    <td>$777</td>
                                </tr>
                                <tr>
                                    <td className='cartleft'>
                                        <label className='cart-custom-checkbox'>
                                            <input type="checkbox" />
                                            <span></span>괌 안간당 보라카이간당
                                        </label>
                                    </td>
                                    <td>5<br/><button>수량변경</button></td>
                                    <td>24.10.09<br/><button>날짜변경</button></td>
                                    <td>$777</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <div className='cart-flex-container2'>
                        <table className='cart-table2'>
                            <thead>
                                <tr>
                                    <th rowSpan={2}>총 주문상품</th>
                                </tr>    
                            </thead>
                            <tfoot className='cart-flex-item'>
                                <tr>
                                    <td>
                                        <div className='cartdiv'>
                                            <div>
                                                <p className='cartp'>666,000원</p>
                                                <p className='cartp2'>상품금액</p>
                                            </div>
                                            <div> + </div>
                                            <div>
                                                <p className='cartp'>25.10.09</p>
                                                <p className='cartp2'>예약일자</p>
                                            </div>
                                        </div>
                                        <div>
                                            <i>::before</i>
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        
                        <div className='cart-order'>
                            <div className='codiv'>
                                <button className='codbtn'> 주문하기</button>
                            </div>
                            <div className='codiv'>
                                <button className='codbtn2'>네이버페이로 간편구매</button>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        </div>
    );
};

export default Cart;