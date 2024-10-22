import axios from 'axios';
import React, { useState } from 'react';
import './weddingItemArticle.css';

const SuitDesc = ({item}) => {
    
    const [suitColor,setSuitColor] = useState();
    const [suitSize,setSuitSize] = useState();
    const [suitPantsSize,setPantsSize] = useState();
    const [suitVest,setSuitVest] = useState();
    const [suitJacket,setSuitJacket] = useState();

    const postData = async () => {
        const confirmation = window.confirm("장바구니에 담으시겠습니까?");

        if (confirmation) {
            const weddingItemData = {              
                name: item.imgName,
                price: item.price,
                suitColor:suitColor,
                suitSize:suitSize,
                suitPantsSize:suitPantsSize,
                suitVest:suitVest,
                suitJacket:suitJacket,
                category: '혼수'
            };

            try {
                const response = axios.post('/api/addCart', weddingItemData, {
                    withCredentials: true
                });
                console.log('POST response data:', response.data);
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
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}} value={suitColor} onChange={(e) => setSuitColor(e.target.value)}>
                <option>색상</option>
                <option>네이비챠콜</option>
                <option>다크베이지</option>
                <option>챠콜</option>
                <option>브라운</option>
                <option>블랙</option>
                <option>카키</option>
                <option>아이보리</option>
            </select>
            <br/>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}} value={suitSize} onChange={(e) => setSuitSize(e.target.value)}>
                <option>자켓사이즈</option>
                <option>S(90-95)</option>
                <option>M(95-100)</option>
                <option>L(100-105)</option>
                <option>XL(105-110)</option>
                <option>2XL(115)</option>
                <option>3XL(120)</option>
            </select>
            <br/>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}} value={suitPantsSize} onChange={(e) => setPantsSize(e.target.value)}>
                <option>바지사이즈</option>
                <option>S(28-29)</option>
                <option>M(30-31)</option>
                <option>L(32-33)</option>
                <option>XL(34-35)</option>
                <option>2Xl(36-37)</option>
                <option>3XL(39)</option>
            </select>
            <br/>
            <span>선택</span>
            <br/>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}} value={suitVest} onChange={(e) => setSuitVest(e.target.value)}>
                <option>조끼</option>
                <option>카라조끼M(+40,000)</option>
                <option>카라조끼L(+40,000)</option>
                <option>카라조끼XL(+42,000)</option>
                <option>V넥조끼L(+40,000)</option>
                <option>V넥조끼L(+40,000)</option>
                <option>V넥조끼XL(+42,000)</option>
            </select>
            <br/>        
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}} value={suitJacket} onChange={(e) => setSuitJacket(e.target.value)}>
                <option>더블자켓</option>
                <option>더블자켓으로 변경(+3,000)</option>
            </select>
            <br/>
            <button className="weddingItemArticle-purchase-button" onClick={postData}>구매하기</button>
        </div>
    );
};

export default SuitDesc;