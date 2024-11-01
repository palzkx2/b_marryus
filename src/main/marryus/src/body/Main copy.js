// Main.js
import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/swiper-bundle.min.css';
import hall from './proData';
import './main copy.css';

const Main = () => {
    // const [hall] = useState(product);  // 예시 데이터 설정 필요
    const weddingHallRef = useRef('');
    const sDmRef = useRef('');
    const hSRef = useRef('');
    const wTRef = useRef('');
    const siteIntroRef = useRef('');

    // 스크롤 기능
    const scrollToSection = (ref) => {
        if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // 반응형 이벤트 리스너
    useEffect(() => {
        const handleResize = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [backgroundPosition, setBackgroundPosition] = useState(0);

    const handleScroll = () => {
        const scrollY = window.scrollY; // 스크롤 위치
        setBackgroundPosition(scrollY * 0.5); // 배경 위치 조정 (0.5는 속도 조절)
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>

             {/* 배경 이미지
             <div className="backgroundImgGod" style={{ transform: `translateY(-${backgroundPosition}px)` }} /> */}


            {/* 헤더 비디오 */}
            <div style={{ pointerEvents: 'none' }}>
                <video width="100%" height="100%" autoPlay loop muted>
                    <source src={`${process.env.PUBLIC_URL}/p_videos/mainBarVideo2.mp4`} type="video/mp4" />
                    죄송합니다. 브라우저가 비디오 태그를 지원하지 않습니다.
                </video>
            </div>

            {/* 사이트 소개 섹션 */}
            <div id="site-intro" ref={siteIntroRef}>
                <h2>Marry Us - 당신의 특별한 순간을 완성하는 원스톱 웨딩 서비스</h2>
                <p>
                    웨딩홀 예약, 스드메, 신혼여행까지 한곳에서 간편하게 비교하고 예약하세요. Marry Us는 커플의 요구에 맞춘 맞춤형 서비스를 제공하여 완벽한 결혼 준비를 돕습니다.
                </p>
            </div>

            {/* 메인 콘텐츠 버튼 그룹 */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '50px 0', height: '450px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '70%' }}>
                    <button className="category-button" onClick={() => scrollToSection(weddingHallRef)}>웨딩홀</button>
                    <button className="category-button" onClick={() => scrollToSection(sDmRef)}>스드메</button>
                    <button className="category-button" onClick={() => scrollToSection(hSRef)}>혼수</button>
                    <button className="category-button" onClick={() => scrollToSection(wTRef)}>신혼여행</button>
                </div>
            </div>

            {/* 웨딩홀 섹션 */}
            <Section ref={weddingHallRef} title="웨딩홀" windowDimensions={windowDimensions}>
                {/* Swiper 구성 - 웨딩홀 상품들 */}
                <CustomSwiper hall={hall} windowDimensions={windowDimensions} />
            </Section>

            {/* 추가 섹션 예시: 스드메, 혼수 등 */}
            <Section ref={sDmRef} title="스드메" windowDimensions={windowDimensions}>
                <CustomSwiper hall={hall} windowDimensions={windowDimensions} />
            </Section>

            <Section ref={hSRef} title="혼수" windowDimensions={windowDimensions}>
                <CustomSwiper hall={hall} windowDimensions={windowDimensions} />
            </Section>

            <Section ref={wTRef} title="신혼여행" windowDimensions={windowDimensions}>
                <CustomSwiper hall={hall} windowDimensions={windowDimensions} />
            </Section>

            {/* 고객센터 챗봇 */}
            <div id="chat-bot">
                <button>💬 챗봇 상담</button>
            </div>
        </div>
    );
};

// Section 컴포넌트
const Section = React.forwardRef(({ title, children, windowDimensions }, ref) => (
    <div className="section" ref={ref}>
        <h1>{title}</h1>
        <div style={{ display: 'flex', position: 'relative', marginBottom: '50px' }}>
            {children}
        </div>
    </div>
));

// Swiper 커스터마이징 컴포넌트
const CustomSwiper = ({ hall, windowDimensions }) => (
    <Swiper
        pagination={{ clickable: true }}
        slidesPerView={
            windowDimensions.width >= 1824 ? 5 : windowDimensions.width >= 1600 ? 4 :
            windowDimensions.width >= 1340 ? 3 : windowDimensions.width >= 1090 ? 2 : 1
        }
        slidesPerGroup={5}
        navigation modules={[Navigation, Pagination]}
    >
        {hall.slice(0, 25).map((item, index) => (
            <SwiperSlide key={index}>
                <div className='swiper-slide'>
                    <div style={{ textAlign: 'left' }}>
                        <img src={item.img} alt='' style={{ position: 'relative' }} />
                        <div className='imgdiv'>
                            <strong>{item.name}</strong>
                            <p>{item.addr}</p>
                            <p>{item.price}</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
);

export default Main;
