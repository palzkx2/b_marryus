import React, { useEffect, useState } from 'react';
import './findUser.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const FindPwdModal = ({isOpen,closeModal}) => {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [checkMessage,setCheckMessage] = useState('');
    const [color,setColor] = useState('');
    const history = useHistory()
    const [check,setCheck] = useState(false)

    const handleSubmit = async (e) => {

        e.preventDefault();
    
        try {
            const response = await axios.post('/api/resetPassword', { email, phone, newPassword });
            alert('비밀번호가 재설정 되었습니다.')
            window.location.reload()
        } catch (error) {
          setMessage(error.response?.data || '비밀번호 재설정 중 오류가 발생했습니다.');
        }

    };

    const checkUser = async () => {

        try{
            const response = await axios.get('/api/findPassword', {
                params:{email,phone}
            })
            if (response.status === 200) {
                setCheckMessage('')
                setCheck(true)
            }
        }catch(error){
            setCheckMessage('일치하는 사용자가 없습니다.')
            setColor('red')
            setCheck(false)
        }

    }

    useEffect(() => {

        if (newPassword !== confirmPassword) {
            setMessage('비밀번호가 일치하지 않습니다.');
            setColor('red')
        }
        if (newPassword === confirmPassword) {
            setMessage('비밀번호가 일치합니다.')
            setColor('blue')
        }
        if (newPassword === '' && confirmPassword === ''){
            setMessage('')
        }

    }, [newPassword,confirmPassword])

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
                    <input type='text' className='inputTag' value={email} onChange={(e) => setEmail(e.target.value)} required/>

                    <p style={{marginTop:'30px'}}>전화번호</p>
                    <input type='text' className='inputTag' value={phone} onChange={(e) => setPhone(e.target.value)} required/>

                    <div style={{marginTop:'15px'}}>
                        <button className='buttonTab' onClick={checkUser}>확&nbsp;&nbsp;&nbsp;인</button>
                    </div>
                    <p style={{fontSize:'10pt', color:color}}>{checkMessage}</p>

                    {
                        check &&
                        <div>
                            <div style={{marginTop:'20px'}}>
                                <p>새 비밀번호</p>
                                <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required style={{fontFamily: 'Arial, sans-serif'}}  className='inputTag'/>
                            </div>

                            <div style={{marginTop:'20px'}}>
                                <p>새 비밀번호 확인</p>
                                <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{fontFamily: 'Arial, sans-serif'}}  className='inputTag'/>
                                <p style={{fontSize:'10pt', color:color}}>{message}</p>
                            </div>

                            <div style={{marginTop:'15px'}}>
                                <button className='buttonTab' onClick={handleSubmit}>전&nbsp;&nbsp;&nbsp;송</button>
                            </div>
                        </div>
                    }

                </div>

            </div>

        </div>
    );
};

export default FindPwdModal;