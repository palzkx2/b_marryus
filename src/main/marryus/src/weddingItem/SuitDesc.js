import axios from 'axios';
import React, { useState } from 'react';
import './weddingItemArticle.css';

const SuitDesc = ({item}) => {
    
    const [suitColor,setSuitColor] = useState();
    const [suitSize,setSuitSize] = useState();
    const [suitPantsSize,setPantsSize] = useState();
    const [suitVest,setSuitVest] = useState();
    const [suitJacket,setSuitJacket] = useState();

    const calculatePrice = () => {
        let basePrice = item.price; // 기본 가격

        // 조끼 가격 추가
        if (suitVest) {
            // 선택된 조끼 옵션에 따라 추가 가격을 결정합니다.
            if (suitVest === '카라조끼M(+40,000)') {
                basePrice += 40000; // 카라조끼M 선택 시 40,000원 추가
            } else if (suitVest === '카라조끼L(+40,000)') {
                basePrice += 40000; // 카라조끼L 선택 시 40,000원 추가
            } else if (suitVest === '카라조끼XL(+42,000)') {
                basePrice += 42000; // 카라조끼XL 선택 시 42,000원 추가
            } else if (suitVest === 'V넥조끼L(+40,000)') {
                basePrice += 40000; // V넥조끼L 선택 시 40,000원 추가
            } else if (suitVest === 'V넥조끼XL(+42,000)') {
                basePrice += 42000; // V넥조끼XL 선택 시 42,000원 추가
            }
        }

        // 더블 자켓 가격 추가
        if (suitJacket === '더블자켓으로 변경(+3,000)') {
            basePrice += 3000;
        }

        return basePrice;
    };

    const postData = async () => {
        const confirmation = window.confirm("장바구니에 담으시겠습니까?");

        // 필수 항목 체크
        if (!suitColor) {
            alert("색상을 선택해 주세요.");
            return;
        }
        if (!suitSize) {
            alert("자켓 사이즈를 선택해 주세요.");
            return;
        }
        if (!suitPantsSize) {
            alert("바지 사이즈를 선택해 주세요.");
            return;
        }

        if (confirmation) {
            const weddingItemData = {            
                name: item.imgName,
                price: calculatePrice(),
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
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}} value={suitColor} onChange={(e) => setSuitColor(e.target.value)}>
                <option value="" disabled selected>색상</option>
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
                <option disabled selected>자켓사이즈</option>
                <option>S(90-95)</option>
                <option>M(95-100)</option>
                <option>L(100-105)</option>
                <option>XL(105-110)</option>
                <option>2XL(115)</option>
                <option>3XL(120)</option>
            </select>
            <br/>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}} value={suitPantsSize} onChange={(e) => setPantsSize(e.target.value)}>
                <option disabled selected>바지사이즈</option>
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
                <option>조끼(선택 안함)</option>
                <option>카라조끼M(+40,000)</option>
                <option>카라조끼L(+40,000)</option>
                <option>카라조끼XL(+42,000)</option>
                <option>V넥조끼L(+40,000)</option>
                <option>V넥조끼L(+40,000)</option>
                <option>V넥조끼XL(+42,000)</option>
            </select>
            <br/>        
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}} value={suitJacket} onChange={(e) => setSuitJacket(e.target.value)}>
                <option>더블자켓(선택 안함)</option>
                <option>더블자켓으로 변경(+3,000)</option>
            </select>
            <br/>
            <button className="weddingItemArticle-purchase-button" onClick={postData}>구매하기</button>
        </div>
    );
};

export default SuitDesc;