import React, { useEffect, useState } from 'react';
import './WeddingHallItem.css';
import image from '../s_images/weddingHall/1.jpg'
import Numeral from 'numeral';
import { BsBookmarkHeart, BsBookmarkHeartFill, BsCartPlus, BsCartPlusFill } from 'react-icons/bs';
import axios from 'axios';

const WeddingHallItem = ({item}) => {

    const {imgPath,name,addr,tag,menu,price,rating} = item

    const filename = imgPath.split('\\').pop();


    const postData = async (event) => {
        event.preventDefault();
        const confirmation = window.confirm(`'${name}'을 장바구니에 담으시겠습니까?`);
        if (confirmation) {
            const data = {
                name: name, 
                price: price ,
                category: '웨딩홀'
               };    
           try {
               const response = axios.post('/api/addCart', data, {
                   withCredentials: true
               });
               console.log('POST response data:', response.data);
               alert(`${name}이(가) 장바구니에 담겼습니다.`);
           } catch (error) {
               console.error('Error posting data:', error);
           }
        } else {
            // 취소 시 실행되는 로직
            alert('취소되었습니다.');
            console.log("삭제가 취소되었습니다.");
        }
        
    };

    return (
        <>      
                <img className='wdImage' src={`/api/images/${filename}`} alt='이미지'/>
                <div className='wdSub title'>{name}</div>
                <div className='wdSub'>평점: {rating ? Number(rating).toFixed(1) : 0} </div>
                <div className='wdSub'>{addr}</div>
                <div className='wdSub' style={{fontSize:'14px'}}>{tag}</div>
                <div className='wdSub' style={{fontSize:'15px'}}>{menu}</div>
                

                <div className='wdSub' style={{fontWeight:'bold',fontSize:'15px',marginBottom:'5px'}}>
                    {Numeral(price).format('0,0')}
                    <div className='addIconLocation'>
                        <BsCartPlus onClick={postData} className='addIcon' />
                        {/* <BsCartPlusFill onClick={postData} className='addIcon'/> */}
                        <BsBookmarkHeart onClick={postData} className='addIcon'/>
                        {/* <BsBookmarkHeartFill onClick={postData} className='addIcon'/> */}
                    </div>
                </div>
        </>
    );
};

export default WeddingHallItem;