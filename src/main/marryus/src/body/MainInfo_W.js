import React from 'react';
import './mainInfo.css';
import { IoIosCloseCircleOutline } from "react-icons/io";

const MainInfo_W = ({onClose}) => {
    return (
        <div className="main-info-container">
            <div style={{position:'absolute',margin:'-29px 3px 1px 881px'}}><IoIosCloseCircleOutline style={{width:'40px',height:'40px',color:'gainsboro',cursor:'pointer'}} onClick={onClose}/></div>
            <h1 className="main-info-title">꿈의 웨딩홀, MarryUs에서 찾으세요!</h1>
            <div className="main-info-section">
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">1. 맞춤형 서비스</h2>
                    <p className="main-info-description">
                        각 커플의 개성을 존중하는 맞춤형 웨딩 서비스를 제공합니다. 
                        여러분의 특별한 날을 위해 세심하게 준비된 웨딩홀에서 잊지 못할 추억을 만드세요.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">2. 다양한 선택지</h2>
                    <p className="main-info-description">
                        전통적인 분위기부터 현대적인 스타일까지, 
                        다양한 테마의 웨딩홀을 보유하고 있습니다. 
                        원하는 스타일에 맞춰 완벽한 공간을 선택하세요.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">3. 완벽한 위치</h2>
                    <p className="main-info-description">
                        편리한 교통과 아름다운 경치를 자랑하는 웨딩홀을 선택하여 
                        손님들에게 잊지 못할 경험을 선사하세요. 
                        여러분의 특별한 날에 어울리는 최적의 장소입니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">4. 전문가 팀</h2>
                    <p className="main-info-description">
                        경험이 풍부한 웨딩 전문가들이 함께하여, 
                        처음부터 끝까지 완벽한 결혼식을 위해 최선을 다합니다. 
                        여러분의 꿈이 현실이 되는 순간을 만들어 드립니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">5. 합리적인 가격</h2>
                    <p className="main-info-description">
                        우리는 고품질 서비스를 합리적인 가격에 제공합니다. 
                        모든 예산에 맞는 패키지를 선택할 수 있어, 
                        경제적인 결혼식을 가능하게 합니다.
                    </p>
                </div>
            </div>
            <footer className="main-info-footer">당신의 특별한 날, Marry Us와 함께하세요!</footer>
        </div>
    );
};

export default MainInfo_W;
