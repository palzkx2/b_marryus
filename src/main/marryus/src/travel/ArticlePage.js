import React, { useEffect, useState } from 'react';
import './ArticlePage.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import numeral from 'numeral';
import MapTest from './map/MapTest';

const ArticlePage = () => {
  const { id, name, rating, price, addr, imgName,lat,lng } = useParams();

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
            category: '여행지'
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
    <div>
      <div className="article-page">
        <img src={`/p_images/travel/sukso/${imgName}`} alt={imgName} className="hotel-image" />
        <div className="hotel-info">
          <h1 className="hotel-name">{name}</h1>
          <p className="hotel-rating">평점: {rating}⭐</p>
          <p className="hotel-address">주소: {addr}</p>
          <p className="hotel-price">가격: {numeral(price).format('0,0')}원</p>
          <p>위도 : {lat}</p>
          <p>경도 : {lng}</p>
          <button className="back-button" onClick={() => window.history.back()}>
            돌아가기
          </button>
          { isOnCart === null 
            ? <button className="add-to-cart-button" onClick={postData}>장바구니 담기</button>
            : <button className="add-to-cart-button" style={{backgroundColor:'black'}} onClick={(event) => onDelete(event, isOnCart.id)}>장바구니 삭제</button>
          }
        </div>
        <div className="map-container" style={{height:'600px'}}>
          <h2>숙소 위치</h2>
          <div className="map">
            {/* 실제 좌표를 MapTest에 전달 */}
            <MapTest name={name} coordinates={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
