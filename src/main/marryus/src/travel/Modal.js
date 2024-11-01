import React, { useEffect, useState } from 'react';
import './Modal.css'; // 모달 스타일을 위한 CSS 파일 임포트
import { BsCartPlus, BsCartPlusFill } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import  Numeral  from 'numeral';

const Modal = ({ agency, accommodation, onClose }) => {
    
    const fetchCartData = async () => {
        try {
            const response = await axios.get(`/api/readOneCart`, {
                params: { name: accommodation.sname },
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
        const confirmation = window.confirm(`'${accommodation.sname}'을 장바구니에 담으시겠습니까?`);
        if (confirmation) {
            const data = {
                name: accommodation.sname, 
                price: accommodation.price ,
                category: '여행지'
               };    
           try {
               const response = axios.post('/api/addCart', data, {
                   withCredentials: true
               });
               console.log('POST response data:', response.data);
               alert(`${accommodation.sname}이(가) 장바구니에 담겼습니다.`);
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
        const confirmation = window.confirm(`${accommodation.sname}을 장바구니에서 삭제하시겠습니까?`);
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
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content1" onClick={e => e.stopPropagation()}>
                {agency ? ( // 여행사 정보가 있을 경우
                    <>
                        <h2>{agency.name}</h2>
                        <p>평점: {agency.rating}</p>
                        <p>가격: {agency.price}</p>
                        <p>소재지: {agency.location}</p>
                    </>
                ) : accommodation ? ( // 숙소 정보가 있을 경우
                    <>
                        <h2>{accommodation.sname}</h2>
                        <p>평점: {accommodation.pyong}</p>
                        <p>가격: {Numeral(accommodation.price).format('0,0')}</p>
                        <p>소재지: {accommodation.addr}</p>
                    </>
                ) : null}
                
                <Link to={`/travelArticle/${accommodation.id}/${accommodation.sname}/${accommodation.pyong}/${accommodation.price}/${accommodation.addr}/${accommodation.imgName}/${accommodation.wido}/${accommodation.gyungdo}`}>
                    <div className='addToCarrt'>상세페이지 이동</div>
                </Link>
                {
                    isOnCart === null 
                    ?   <div className='addToCarrt' onClick={postData}>
                            <BsCartPlus className='addcarticnSize'/>
                            장바구니 담기
                        </div>
                    :   <div className='addToCarrt' onClick={(event) => onDelete(event, isOnCart.id)}>
                        <BsCartPlusFill className='addcarticnSize'/>
                        장바구니 삭제
                </div>
                }
                <div>
                    <button className='button1' onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
