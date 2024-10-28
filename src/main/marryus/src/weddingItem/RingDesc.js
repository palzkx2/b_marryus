import axios from 'axios';
import React, { useState } from 'react';
import './weddingItemArticle.css';

const RingDesc = ({item}) => {
    const [maleSize,setMaleSize] = useState();
    const [femaleSize,setFemaleSize] = useState();


    const postData = async () => {
        const confirmation = window.confirm("장바구니에 담으시겠습니까?");

        // 사이즈가 선택되었는지 확인
        if (!maleSize) {
            alert("남자 반지 사이즈를 선택해 주세요.");
            return;
        }
        if (!femaleSize) {
            alert("여자 반지 사이즈를 선택해 주세요.");
            return;
        }

        if (confirmation) {
            const weddingItemData = {              
                name: item.imgName,
                price: item.price,
                ringMaleSize: maleSize,
                ringFemaleSize: femaleSize,
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
            <select
                style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
                value={maleSize}
                onChange={(e) => setMaleSize(e.target.value)}
            >
                <option value="" disabled selected>반지 사이즈(남)</option>
                <option>10호</option>
                <option>11호</option>
                <option>12호</option>
                <option>13호</option>
                <option>14호</option>
                <option>15호</option>
                <option>16호</option>
                <option>17호</option>
                <option>18호</option>
                <option>19호</option>
                <option>20호</option>
                <option>21호</option>
                <option>22호</option>
                <option>23호</option>
                <option>24호</option>
            </select>
            <br />
            <select
                style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
                value={femaleSize}
                onChange={(e) => setFemaleSize(e.target.value)}
            >
                <option value="" disabled selected>반지 사이즈(여)</option>
                <option>1호</option>
                <option>2호</option>
                <option>3호</option>
                <option>4호</option>
                <option>5호</option>
                <option>6호</option>
                <option>7호</option>
                <option>8호</option>
                <option>9호</option>
                <option>10호</option>
                <option>11호</option>
                <option>12호</option>
                <option>13호</option>
                <option>14호</option>
                <option>15호</option>
                <option>16호</option>
                <option>17호</option>
                <option>18호</option>
            </select>
            <br/>
            <button className="weddingItemArticle-purchase-button" onClick={postData}>구매하기</button>
        </div>
    );
};

export default RingDesc;
