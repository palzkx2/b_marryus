import React from 'react';
import './HoneymoonDestinations.css'; // CSS 파일 임포트
import img from '../s_images/travel/czech-republic-4070219_1920.jpg'
import img1 from '../s_images/travel/to-5213927_1920.jpg'
import video from '../assets/video/travel.mp4'

const HoneymoonDestinations = () => {
    return (
        <div>
            <div className="hero-section">
                <video autoPlay loop muted className="background-video">
                    <source src={video} type="video/mp4" />
                    비디오를 지원하지 않는 브라우저입니다.
                </video>
                <div className="overlay">
                    <h1 style={{padding:'20px'}}>신혼 여행지</h1>
                    <p style={{padding:'20px'}}>특별한 순간을 위한 여행지를 찾으세요!</p>
                </div>
            </div>
        <div className="honeymoon-destinations">

            <div className="category-container">
                {/* 해외 신혼 여행지 카드 */}
                <div className="category-card">
                    <img src={img} alt="해외 신혼 여행지" />
                    <div className="card-content">
                        <h2>해외 신혼 여행지</h2>
                        <p>로맨틱한 해외 여행을 떠나보세요!</p>
                        <button>더 알아보기</button>
                    </div>
                </div>

                {/* 국내 신혼 여행지 카드 */}
                <div className="category-card">
                    <img src={img1} alt="국내 신혼 여행지" />
                    <div className="card-content">
                        <h2>국내 신혼 여행지</h2>
                        <p>아름다운 한국의 로맨틱한 장소를 만나보세요!</p>
                        <button>더 알아보기</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default HoneymoonDestinations;
