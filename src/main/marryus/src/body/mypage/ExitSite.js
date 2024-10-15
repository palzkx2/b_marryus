import React, { useEffect, useState } from 'react';
import './myPage.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Bar from './Bar';
import axios from 'axios';

const ExitSite = () => {

    const [userRole,setUserRole] = useState('')

    useEffect(() => {

        const fetchSessionData = async () => {

            try {
                const response = await axios.get('/api/session', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
                console.log('세션 정보 : ', response.data)
                setUserRole(response.data.userRole); // 세션 정보를 상태에 저장
            } catch (error) {
                console.error('세션 정보 가져오기 실패:', error);
            }

        };

        fetchSessionData();

    }, []);

    const deleteUser = async () => {

        try {
            const response = await axios.delete('/api/deleteUser');
            if(response.status === 200) {
                alert('회원 탈퇴가 완료되었습니다.')
                console.log('탈퇴완료:', response.data)
                window.location.href = '/'
            }
        }catch(error) {
            console.error('회원 탈퇴 실패:', error.response ? error.response.data : error);
            alert('회원 탈퇴에 실패했습니다.');
        }

    }

    return (
        <div>
            <div className='alignGood'>
                <Bar/>
            </div>
            <div className='alignGood'>
                <div className='mainContainer'>
                    <div className='goodBye'>가신다니 아쉽군요!</div>
                    <div className='goodBye' style={{paddingLeft:'0px',marginLeft:'320px'}}>행복한 웨딩이 되셨길 바라겠습니다!</div>
                    
                    <div className='conBox'>
                        <Link to='/myPage'><p className='byeBtn'>돌아가기</p></Link>
                        <Link to='#'><p className='byeBtn' onClick={deleteUser}>회원 탈퇴</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExitSite;