import React from 'react';
import './ArticlePage.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import numeral from 'numeral';
import MapTest from './map/MapTest';

const ArticlePage = () => {
  const { id, name, rating, price, addr, imgName,lat,lng } = useParams();

  const postData = async (event) => {
    event.preventDefault();
    const confirmation = window.confirm(`'${name}'을 장바구니에 담으시겠습니까?`);
    if (confirmation) {
      const data = {
        name: name,
        price: price,
        category: '여행지',
      };
      try {
        const response = await axios.post('/api/addCart', data, {
          withCredentials: true,
        });
        console.log('POST response data:', response.data);
        alert(`${name}이(가) 장바구니에 담겼습니다.`);
      } catch (error) {
        console.error('Error posting data:', error);
      }
    } else {
      alert('취소되었습니다.');
      console.log("장바구니 담기가 취소되었습니다.");
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
          <button className="add-to-cart-button" onClick={postData}>
            장바구니 담기
          </button>
        </div>
        <div className="map-container" style={{height:'600px'}}>
          <h2>숙소 위치</h2>
          <div className="map">
            {/* 실제 좌표를 MapTest에 전달 */}
            <MapTest coordinates={{ lat: parseFloat(lat), lng: parseFloat(lng) }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
