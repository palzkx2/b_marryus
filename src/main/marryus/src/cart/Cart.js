import React, { useState } from 'react';
import './cart.css';
import { TbShoppingCartHeart } from 'react-icons/tb';
import cartdata from './cartData';
import Numeral from 'numeral';

const Cart = () => {

    const [cartData] = useState(cartdata);

    const totalAmount = cartData.reduce((acc,item)=>{
        const itemPrice = parseInt(item.price.replace('won', ''), 10); // "won" 제거 후 숫자로 변환
        return acc + (itemPrice * item.su);
    },[])

    const resdate = cartData.map(item=>item.resdate);
    return (
        <div className='cart' style={{justifyContent:'center', display:'flex', alignContent:'center'}}>
            <div className='cart-inside'> 
                <div className='cart-content'>   
                    <div className='cart-flex-container'>
                        <h2 style={{ marginTop:'1em', marginLeft:'1em' }} className='cart-Name'>
                            <TbShoppingCartHeart className='icon1'/> 장바구니
                        </h2>
                    </div>

                    <div className='cart-flex-container2'>
                        <div className="cart-table">
                            <div className="cart-row cart-header">
                                <div className="cart-column1" >
                                    <label className='cart-custom-checkbox' style={{justifyContent:'left', alignContent:'left', display:'flex'}}>
                                        <input type="checkbox" />
                                        <span></span> 상품정보
                                    </label>
                                </div>
                                <div className="cart-column2">수량</div>
                                <div className="cart-column3">예약일자</div>
                                <div className="cart-column4">주문금액</div>
                            </div>
                            {cartData.map((item, no) => (
                                <div key={no} className="cart-row">
                                    <div className="cart-column">
                                        <label className='cart-custom-checkbox' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <input type="checkbox" />
                                            <span></span> 
                                           
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img 
                                                src={item.img} 
                                                alt={item.itemname} 
                                                style={{ width: '100px', height: '100px' }} 
                                            />
                                            <p style={{ maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0' }}>
                                                {item.itemname}
                                            </p>
                                        </div>
                                        </label>
                                    </div>
                                    <div className="cart-column" style={{flexDirection:'column'}} >
                                        {item.su} 
                                        
                                        <button>수량변경</button>
                                    </div>
                                    <div className="cart-column"style={{flexDirection:'column'}} >
                                        {item.resdate}
                                        <br/>
                                        <button>날짜변경</button>
                                    </div>
                                    <div className="cart-column">
                                        {Numeral(item.price.replace('won', '')).format('0,0')} 원
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <br/>

                    <div className='cart-flex-container2'>
                        <div className="cart-table2">
                            <div className="cart-row cart-summary">
                                <div className="cart-column" >
                                    <p style={{justifyContent: 'center', alignContent:'center', display:'flex'}}>총 주문상품</p>
                                </div>
                            </div>
                            <div className="cart-row cart-flex-item">
                                <div className="cartdiv">
                                    <p className="cartp">{Numeral(totalAmount).format('0,0')} 원</p>
                                    <p className="cartp2">상품금액</p>
                                </div>
                                <div>+</div>
                                <div>
                                    <p className="cartp">24.10.10</p>
                                    <p className="cartp2">예약일자</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/**버튼 */}
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
    );
};

export default Cart;
