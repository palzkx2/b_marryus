import React, { useEffect } from 'react';
import './findUser.css'

const FindPwdModal = ({isOpen,closeModal}) => {

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
                <h1 className='findIdTitle'>비밀번호 찾기</h1>
                <div style={{marginLeft:'-210px', marginTop:'100px', fontSize:'14pt'}}>
                    <p>이메일</p>
                    <input type='text' className='inputTag'/>
                    <p style={{marginTop:'30px'}}>전화번호</p>
                    <input type='text' className='inputTag'/>
                    <div style={{marginTop:'15px'}}>
                        <button className='buttonTab'>전&nbsp;&nbsp;&nbsp;송</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindPwdModal;