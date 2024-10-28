import React from 'react';
import './Modal.css'; // 모달 스타일을 위한 CSS 파일 임포트
import { BsCartPlus } from 'react-icons/bs';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import  Numeral  from 'numeral';

const Modal = ({ agency, accommodation, onClose }) => {
    
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
           } catch (error) {
               console.error('Error posting data:', error);
           }
        } else {
            // 취소 시 실행되는 로직
            alert('취소되었습니다.');
            console.log("장바구니 담기가 취소되었습니다.");
        }
    };


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
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

                <div className='addToCarrt' onClick={postData}>
                    <BsCartPlus className='addcarticnSize'/>
                    장바구니 담기
                </div>
                <div>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
