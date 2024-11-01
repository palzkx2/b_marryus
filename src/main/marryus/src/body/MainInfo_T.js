import React from 'react';
import './mainInfo.css';
import { IoIosCloseCircleOutline } from "react-icons/io";

const MainInfo_T = ({onClose}) => {
    return (
        <div className="main-info-container">
            <div style={{position:'absolute',margin:'-29px 3px 1px 881px'}}><IoIosCloseCircleOutline style={{width:'40px',height:'40px',color:'gainsboro',cursor:'pointer'}} onClick={onClose}/></div>
            <h1 className="main-info-title">잊지 못할 신혼여행, MarryUs와 함께 떠나세요!</h1>
            <div className="main-info-section">
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">1. 특별한 맞춤형 여행 계획</h2>
                    <p className="main-info-description">
                    각 커플의 취향과 스타일에 맞춘 맞춤형 신혼여행 패키지를 제공합니다. 로맨틱한 휴양지에서의 완벽한 순간을 계획해 드립니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">2. 다양한 여행지 선택</h2>
                    <p className="main-info-description">
                    세계 각지의 인기 있는 신혼여행지를 제공합니다. 아름다운 바닷가, 이국적인 자연, 문화가 풍부한 도시 등 다양한 선택지를 통해 원하는 여행지를 찾으세요.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">3. 합리적인 가격</h2>
                    <p className="main-info-description">
                    고품질의 여행 서비스와 함께 합리적인 가격을 제공합니다. 다양한 예산에 맞춰 최상의 경험을 누릴 수 있도록 도와드립니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">4. 전문가의 상담과 지원</h2>
                    <p className="main-info-description">
                    경험이 풍부한 여행 전문가들이 여러분의 여행을 세심하게 준비합니다. 최상의 일정과 여행 경험을 위해 언제든지 상담을 받을 수 있습니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">5. 안전하고 편리한 여행</h2>
                    <p className="main-info-description">
                    안전한 여행을 위해 엄선된 숙소와 교통수단을 제공합니다. 편리한 예약 시스템으로 스트레스 없는 신혼여행을 계획하세요.
                    </p>
                </div>
            </div>
            <footer className="main-info-footer">당신의 사랑이 시작되는 곳, Marry Us와 함께하는 특별한 신혼여행!</footer>
        </div>
    );
};

export default MainInfo_T;
