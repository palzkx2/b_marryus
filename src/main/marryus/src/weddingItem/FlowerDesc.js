import axios from 'axios';
import React, { useState } from 'react';
import './weddingItemArticle.css';

const FlowerDesc = ({item}) => {
    
    const [flowerColor,setFlowerColor] = useState();

    const postData = async () => {
        const confirmation = window.confirm("장바구니에 담으시겠습니까?");

        // 사이즈가 선택되었는지 확인
        if (!flowerColor) {
            alert("꽃 색상을 선택해 주세요.");
            return;
        }

        if (confirmation) {
            const weddingItemData = {              
                name: item.imgName,
                price: item.price,
                flowerColor:flowerColor,
                category: '혼수'
            };

            try {
                const response = axios.post('/api/addCart', weddingItemData, {
                    withCredentials: true
                });
                console.log('POST response data:', response.data);
                alert("장바구니에 추가되었습니다!"); // 장바구니에 추가되었다는 메시지
            } catch (error) {
                console.error('Error posting data:', error);
            }
         } else {
             // 취소 시 실행되는 로직
             console.log("삭제가 취소되었습니다.");
         }
     };

    return (
        <div>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}} value={flowerColor} onChange={(e) => setFlowerColor(e.target.value)}>
                <option disabled selected>꽃 색상</option>
                <option>레드</option>
                <option>바이올렛</option>
                <option>블루</option>
                <option>핑크</option>
            </select>
            <br/>
            <button className="weddingItemArticle-purchase-button" onClick={postData}>구매하기</button>
        </div>
    );
};

export default FlowerDesc;