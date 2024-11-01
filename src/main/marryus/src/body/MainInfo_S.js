import React from 'react';
import './mainInfo.css';
import { IoIosCloseCircleOutline } from "react-icons/io";

const MainInfo_S = ({onClose}) => {
    return (
        <div className="main-info-container">
            <div style={{position:'absolute',margin:'-29px 3px 1px 881px'}}><IoIosCloseCircleOutline style={{width:'40px',height:'40px',color:'gainsboro',cursor:'pointer'}} onClick={onClose}/></div>
            <h1 className="main-info-title">완벽한 스타일링과 메이크업, MarryUs에서 경험하세요!</h1>
            <div className="main-info-section">
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">1. 개인 맞춤형 스타일링</h2>
                    <p className="main-info-description">
                    각 커플의 개성을 고려한 맞춤형 스타일링 서비스를 제공합니다. 당신의 아름다움을 극대화할 수 있도록 전문 디자이너와 함께 개인적인 상담을 진행합니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">2. 전문 메이크업 아티스트</h2>
                    <p className="main-info-description">
                    경험이 풍부한 메이크업 아티스트들이 당신의 자연스러운 아름다움을 더욱 돋보이게 만들어드립니다. 웨딩 데이 동안의 긴 시간에도 변치 않는 완벽한 메이크업을 보장합니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">3. 다양한 패키지 옵션</h2>
                    <p className="main-info-description">
                    예산과 취향에 맞춘 다양한 스드메 패키지를 제공합니다. 필요에 따라 헤어, 메이크업, 의상 스타일링을 조합하여 최상의 서비스를 누리세요.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">4. 최신 트렌드 반영</h2>
                    <p className="main-info-description">
                    업계의 최신 트렌드를 반영한 스타일링으로, 시대를 초월한 아름다움을 선사합니다. 특별한 날, 누구보다 빛나는 주인공이 되어 보세요.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">5. 세심한 관리와 지원</h2>
                    <p className="main-info-description">
                    결혼식 준비부터 행사 당일까지, 전문 팀이 세심하게 지원하여 모든 과정에서 편안함을 느낄 수 있도록 도와드립니다. 스트레스 없이 아름다움을 완성하세요.
                    </p>
                </div>
            </div>
            <footer className="main-info-footer">당신의 특별한 날, Marry Us와 함께 더욱 빛나세요!</footer>
        </div>
    );
};

export default MainInfo_S;
