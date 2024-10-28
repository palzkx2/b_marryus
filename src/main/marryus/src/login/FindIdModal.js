import React, { useEffect, useState } from 'react';
import './findUser.css'
import axios from 'axios';

const FindIdModal = ({isOpen,closeModal}) => {

    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [maskedEmail, setMaskedEmail] = useState('');
    const [error, setError] = useState('');

    const handleFindEmail = async () => {

        try {
            const response = await axios.get(`/api/findEmail`, {
                params: { name, phone }
            });
            if (response.data) {
                setMaskedEmail(response.data); // 마스킹된 이메일 설정
                setError(''); // 에러 초기화
            } else {
                setMaskedEmail(''); // 이메일 초기화
                setError('이름과 전화번호가 일치하는 회원이 없습니다.');
            }
        } catch (error) {
            setMaskedEmail(''); // 이메일 초기화
            setError('서버 오류가 발생했습니다.'); // 서버 오류 메시지
        }

    };

    useEffect(() => {

        if (isOpen) {
          document.body.style.overflow = 'hidden'; // 배경 스크롤 잠금
        } else {
          document.body.style.overflow = 'unset'; // 배경 스크롤 허용
        }
    
        return () => {
          document.body.style.overflow = 'unset'; // 언마운트 시 배경 스크롤 허용
        };

    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className='modal' onClick={closeModal}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={closeModal}>&times;</span>
                <h1 className='findIdTitle'>아이디 찾기</h1>
                <div style={{marginLeft:'-210px', marginTop:'100px', fontSize:'14pt'}}>
                    <p>이름</p>
                    <input type='text' className='inputTag' value={name} onChange={(e) => setName(e.target.value)}/>
                    <p style={{marginTop:'30px'}}>전화번호</p>
                    <input type='text' className='inputTag' value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <div style={{marginTop:'15px'}}>
                        <button className='buttonTab' onClick={handleFindEmail}>확&nbsp;&nbsp;&nbsp;인</button>
                    </div>
                    {
                        maskedEmail && 
                        <div style={{marginTop:'70px'}}>
                            <p style={{fontSize:'12pt'}}>
                                가입한 이메일 : {maskedEmail}
                            </p>
                        </div>
                    }
                    {
                        error && 
                        <div style={{marginTop:'70px'}}>
                            <p style={{color: 'red', fontSize:'12pt'}}>
                                {error}
                            </p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default FindIdModal;