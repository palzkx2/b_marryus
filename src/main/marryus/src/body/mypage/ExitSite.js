import React from 'react';
import './myPage.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Bar from './Bar';

const ExitSite = () => {
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
                        <Link to='#'><p className='byeBtn'>회원 탈퇴</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExitSite;