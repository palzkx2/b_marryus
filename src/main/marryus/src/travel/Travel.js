import React, { useState } from 'react';
import './travel.css';
import 'swiper/swiper-bundle.css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import HoneymoonDestinations from './HoneymoonDestinations'; // 신혼 여행지 컴포넌트 임포트
import Sidebar from './Sidebar';

const Travel = () => {

    return (
        <div style={{ justifyContent: 'center', alignContent: 'center' }}>  
            <div className='mainContainer' style={{ margin: 'auto', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Sidebar />
                <HoneymoonDestinations /> {/* 신혼 여행지 컴포넌트 추가 */}
            </div>
        </div>
    );
};

export default Travel;
