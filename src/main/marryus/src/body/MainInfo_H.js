import React from 'react';
import './mainInfo.css';
import { IoIosCloseCircleOutline } from "react-icons/io";

const MainInfo_H = ({onClose}) => {
    return (
        <div className="main-info-container">
            <div style={{position:'absolute',margin:'-29px 3px 1px 881px'}}><IoIosCloseCircleOutline style={{width:'40px',height:'40px',color:'gainsboro',cursor:'pointer'}} onClick={onClose}/></div>
            <h1 className="main-info-title">완벽한 혼수 컬렉션, MarryUs에서 준비하세요!</h1>
            <div className="main-info-section">
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">1. 품격 있는 선택</h2>
                    <p className="main-info-description">
                    우아함과 실용성을 동시에 갖춘 다양한 혼수 아이템을 제공합니다. 각 아이템은 세심하게 선정되어 여러분의 새로운 출발을 더욱 특별하게 만들어 줍니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">2. 다양한 스타일</h2>
                    <p className="main-info-description">
                    전통적인 혼수부터 현대적인 감각의 아이템까지, 여러분의 취향에 맞는 다양한 스타일을 갖춘 컬렉션을 만나보세요. 원하는 분위기에 맞게 완벽하게 조화로운 선택이 가능합니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">3. 합리적인 가격</h2>
                    <p className="main-info-description">
                    고품질의 혼수 아이템을 합리적인 가격으로 제공합니다. 예산에 맞춰 다양한 선택지를 통해 더욱 의미 있는 혼수를 준비하세요.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">4. 편리한 쇼핑 경험</h2>
                    <p className="main-info-description">
                    온라인에서 손쉽게 쇼핑할 수 있는 편리한 시스템을 갖추고 있습니다. 간편한 주문과 빠른 배송으로 여러분의 혼수가 빠짐없이 준비됩니다.
                    </p>
                </div>
                <div className="main-info-item">
                    <h2 className="main-info-subtitle">5. 맞춤형 상담 서비스</h2>
                    <p className="main-info-description">
                    전문 상담 팀이 혼수 선택부터 배치까지 꼼꼼하게 도와드립니다. 고객의 니즈를 반영한 맞춤형 서비스를 통해 여러분의 특별한 날을 더욱 빛내세요.
                    </p>
                </div>
            </div>
            <footer className="main-info-footer">당신의 새로운 시작, Marry Us의 혼수 컬렉션과 함께하세요!</footer>
        </div>
    );
};

export default MainInfo_H;
