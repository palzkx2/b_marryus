import React, { useState } from 'react';
import './cartBar.css'
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const CartBar = () => {
    const [isOpen, setIsOpen] = useState(false); // 장바구니 상태
    const toggleCart = () => {
        setIsOpen(!isOpen); // 상태 변경
    };

    return (
       <div>
            <div className='cccarttLoc'>
                <PiShoppingCartSimpleLight className='cccarttIcn'/>
            </div>




       </div>
    );
};

export default CartBar;