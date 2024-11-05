import React, { useEffect, useState } from 'react';
import './WeddingHallItem.css';
import image from '../s_images/weddingHall/1.jpg'
import Numeral from 'numeral';
import { BsBookmarkHeart, BsBookmarkHeartFill, BsCartPlus, BsCartPlusFill } from 'react-icons/bs';
import axios from 'axios';

const WeddingHallItem = ({item}) => {

      
    const {imgPath,name,addr,tag,menu,price,rating} = item
    const filename = imgPath.split('\\').pop();
    const fetchCartData = async () => {
        try {
            const response = await axios.get(`/api/readOneCart`, {
                params: { name: name },
                withCredentials: true, // 인증이 필요하면 이 옵션을 추가합니다.
            });

            // 응답 데이터에 따라 isOnCart 상태 업데이트
            if (response.data) {
                setIsOnCart(response.data); // 장바구니에 아이템이 있을 경우
            } else {
                setIsOnCart(null); // 아이템이 없을 경우
            }

            // 로그를 통해 데이터 확인
            console.log("장바구니 데이터:", response.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

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
               fetchCartData();
           } catch (error) {
               console.error('Error posting data:', error);
           }
        } else {
            // 취소 시 실행되는 로직
            alert('취소되었습니다.');
            console.log("삭제가 취소되었습니다.");
        }
        
    };

    const [isOnCart, setIsOnCart] = useState(null);
    useEffect(() => {
        
        fetchCartData();
    }, []); // name이 변경될 때마다 호출

    const onDelete = async (event, id) => {
        event.preventDefault(); // 이벤트 기본 동작 방지
        const confirmation = window.confirm(`${name}을 장바구니에서 삭제하시겠습니까?`);
        if (confirmation) {
            try {
                // 백엔드 API 엔드포인트
                const response = await axios.delete(`/api/deleteCart/${id}`);        
                // 성공적으로 삭제된 경우
                console.log('삭제 성공:', response.data);
                alert('삭제되었습니다.');
                setIsOnCart(null); // 장바구니 상태 업데이트
            } catch (error) {
                // 오류 처리
                console.error('삭제 실패:', error);
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
                <div className='wdSub'>평점: {Number(rating).toFixed(1)} </div>
                <div className='wdSub'>{addr}</div>
                <div className='wdSub' style={{fontSize:'14px'}}>{tag}</div>
                <div className='wdSub' style={{fontSize:'15px'}}>{menu}</div>
                

                <div className='wdSub' style={{fontWeight:'bold',fontSize:'15px',marginBottom:'5px'}}>
                    {Numeral(price).format('0,0')}
                    <div className='addIconLocation'>
                    { isOnCart !== null
                        ? <BsCartPlusFill onClick={(event) => onDelete(event, isOnCart.id)} className='addIcon'/> 
                        : <BsCartPlus onClick={postData} className='addIcon' />
                    }
                        <BsBookmarkHeart onClick={postData} className='addIcon'/>
                        {/* <BsBookmarkHeartFill onClick={postData} className='addIcon'/> */}
                    </div>
                </div>
        </>
    );
};

export default WeddingHallItem;