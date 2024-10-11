import React,{useEffect, useRef, useState} from 'react';
import './main.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import jkart from '../s_images/JKArt.jpg'
import product from './proData'

const Main = () => {

    const [hall] = useState(product)

    const weddingHallRef = useRef('')
    const sDmRef = useRef('')
    const hSRef = useRef('')
    const wTRef = useRef('')

    const scrollToweddingHall = () => {
        if (weddingHallRef.current) {
            weddingHallRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const scrollTosDm = () => {
        if (sDmRef.current) {
            sDmRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const scrollTohSRef = () => {
        if (hSRef.current) {
            hSRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollTowTRef = () => {
        if (wTRef.current) {
            wTRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [windowDimensions, setWindowDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => { //VW : ViewPort Width, VH : ViewPort Heigth
        function handleResize() {
          setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight
          });
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>

            {/* Header 영상 */}
            <div style={{ pointerEvents: 'none'}}>
                <video
                    width="100%" // 비디오의 너비
                    height="100%"
                    autoPlay // 자동 재생
                    loop // 반복 재생 (원하는 경우)
                    muted // 자동 재생 시 소리 끄기
                >
                    <source src={`${process.env.PUBLIC_URL}/p_videos/mainBarVideo2.mp4`} type="video/mp4" />
                    죄송합니다. 브라우저가 비디오 태그를 지원하지 않습니다.
                </video>
            </div>

            <div style={{display: 'flex', justifyContent:'center', alignContent:'center', margin:'50px 0px', height:'450px'}}>
                <div style={{justifyContent:'center', alignContent:'center', display:'flex', width:'67.7%', background:'gray', borderRadius:'70px 70px 20px 20px', alignItems:'center'}}>
                    <div style={{width:200, height:300, backgroundColor: '#e2e2e2', cursor:'pointer'}} onClick={scrollToweddingHall}>
                        <img src={jkart} alt='' width={200} height={300}/>
                    </div>
                    <div style={{width:200, height:300, backgroundColor: '#e2e2e2', marginLeft:'70px', cursor:'pointer'}} onClick={scrollTosDm}>
                        <p style={{color:'#fff'}}>스드메</p>
                    </div>
                    <div style={{width:200, height:300, backgroundColor: '#e2e2e2', marginLeft:'70px', cursor:'pointer'}} onClick={scrollTohSRef}>
                        <p style={{color:'#fff'}}>혼수</p>
                    </div>
                    <div style={{width:200, height:300, backgroundColor: '#e2e2e2', marginLeft:'70px', cursor:'pointer'}} onClick={scrollTowTRef}>
                        <p style={{color:'#fff'}}>신혼여행</p>
                    </div>
                </div>
            </div>
            {/* 메인 Contents */}
            <div 
                style={
                    windowDimensions.width >= 940 ? {margin: '0 250px'} : 
                    windowDimensions.width >= 855 ? {margin: '0 240px'} : {margin: '0'}
                }
            >

                <div style={{justifyContent:'center', alignContent:'center', display:'flex'}} ref={weddingHallRef}>
                    <div
                        style={
                            // windowDimensions.width >= 1600 ? {width:'100%'} : {width:'100%'}
                            {width:'100%'}
                        }
                    >
                        <h1
                            style={
                                windowDimensions.width >= 1600 ? {textAlign:'left'} : {textAlign:'center'}
                                // {textAlign:'left'}
                            }
                        >웨딩홀</h1>
                    </div>
                </div>

                <div style={{display:'flex', position: 'relative', marginBottom:'50px'}}>
                    <Swiper
                        dir="ltr"
                        pagination={{
                        clickable: true,
                        }}
                        slidesPerView={
                            windowDimensions.width >= 1824 ? 5 : 
                            windowDimensions.width >= 1600 ? 4 :
                            windowDimensions.width >= 1340 ? 3 :
                            windowDimensions.width >= 1090 ? 2 : 1
                        }
                        slidesPerGroup={3}
                        // navigation={true}
                        navigation={{
                            prevEl: '.sw1',
                            nextEl: '.sw2'
                        }}
                        spaceBetween={0}
                        modules={[Navigation, Pagination]}
                        className="mySwiper"
                        style={{margin:'0px'}}
                        initialSlide={0}
                    >
                        
                        {hall.slice(0,25).map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <div style={{textAlign: 'left'}}>
                                        <img src={jkart} alt='' style={{position:'relative'}}/>
                                        <div className='imgdiv'>
                                            <strong style={{display: 'block', fontSize: '18pt'}}>{item.name}</strong>
                                            <p>{item.addr}</p>
                                            <p style={{paddingBottom:'25px'}}>{item.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                    <div
                        className='swiper-button-prev sw1'
                        style={ windowDimensions.width >= 1090 ? {left: '-30px'} : {left: 'calc(50% - 160px)'}}
                    ></div>
                    <div
                        className='swiper-button-next sw2'
                        style={ windowDimensions.width >= 1090 ? {right: '-30px'} : {right: 'calc(50% - 160px)'} }
                    ></div>
                </div>

                {/* ================================================================================================================= */}

                <div style={{justifyContent:'center', alignContent:'center', display:'flex'}} ref={sDmRef}>
                    <div
                        style={
                            // windowDimensions.width >= 1600 ? {width:'100%'} : {width:'100%'}
                            {width:'100%'}
                        }
                    >
                        <h1
                            style={
                                windowDimensions.width >= 1600 ? {textAlign:'left'} : {textAlign:'center'}
                                // {textAlign:'left'}
                            }
                        >스튜디오</h1>
                    </div>
                </div>

                <div style={{display:'flex', position: 'relative', marginBottom:'50px'}}>
                    <Swiper
                        dir="ltr"
                        pagination={{
                        clickable: true,
                        }}
                        slidesPerView={
                            windowDimensions.width >= 1824 ? 5 : 
                            windowDimensions.width >= 1600 ? 4 :
                            windowDimensions.width >= 1340 ? 3 :
                            windowDimensions.width >= 1090 ? 2 : 1
                        }
                        slidesPerGroup={5}
                        // navigation={true}
                        navigation={{
                            prevEl: '.sw3',
                            nextEl: '.sw4'
                        }}
                        spaceBetween={0}
                        modules={[Navigation, Pagination]}
                        className="mySwiper"
                        style={{margin:'0px'}}
                        initialSlide={0}
                    >
                        
                        {[...Array(25)].map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <div style={{textAlign: 'left'}}>
                                        <img src={jkart} alt='' style={{position:'relative'}}/>
                                        <div className='imgdiv'>
                                            <strong style={{display: 'block', fontSize: '18pt'}}>XX예식장</strong>
                                            <p>서울 강남</p>
                                            <p style={{paddingBottom:'25px'}}>000,000,000원</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                    <div
                        className='swiper-button-prev sw3'
                        style={ windowDimensions.width >= 1090 ? {left: '-30px'} : {left: 'calc(50% - 160px)'}}
                    ></div>
                    <div
                        className='swiper-button-next sw4'
                        style={ windowDimensions.width >= 1090 ? {right: '-30px'} : {right: 'calc(50% - 160px)'} }
                    ></div>
                </div>

                {/* ================================================================================================================= */}

                <div style={{justifyContent:'center', alignContent:'center', display:'flex'}}>
                    <div
                        style={
                            // windowDimensions.width >= 1600 ? {width:'100%'} : {width:'100%'}
                            {width:'100%'}
                        }
                    >
                        <h1
                            style={
                                windowDimensions.width >= 1600 ? {textAlign:'left'} : {textAlign:'center'}
                                // {textAlign:'left'}
                            }
                        >드레스</h1>
                    </div>
                </div>

                <div style={{display:'flex', position: 'relative', marginBottom:'50px'}}>
                    <Swiper
                        dir="ltr"
                        pagination={{
                        clickable: true,
                        }}
                        slidesPerView={
                            windowDimensions.width >= 1824 ? 5 : 
                            windowDimensions.width >= 1600 ? 4 :
                            windowDimensions.width >= 1340 ? 3 :
                            windowDimensions.width >= 1090 ? 2 : 1
                        }
                        slidesPerGroup={5}
                        // navigation={true}
                        navigation={{
                            prevEl: '.sw5',
                            nextEl: '.sw6'
                        }}
                        spaceBetween={0}
                        modules={[Navigation, Pagination]}
                        className="mySwiper"
                        style={{margin:'0px'}}
                        initialSlide={0}
                    >
                        
                        {[...Array(25)].map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <div style={{textAlign: 'left'}}>
                                        <img src={jkart} alt='' style={{position:'relative'}}/>
                                        <div className='imgdiv'>
                                            <strong style={{display: 'block', fontSize: '18pt'}}>XX예식장</strong>
                                            <p>서울 강남</p>
                                            <p style={{paddingBottom:'25px'}}>000,000,000원</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                    <div
                        className='swiper-button-prev sw5'
                        style={ windowDimensions.width >= 1090 ? {left: '-30px'} : {left: 'calc(50% - 160px)'}}
                    ></div>
                    <div
                        className='swiper-button-next sw6'
                        style={ windowDimensions.width >= 1090 ? {right: '-30px'} : {right: 'calc(50% - 160px)'} }
                    ></div>
                </div>

                {/* ================================================================================================================= */}

                <div style={{justifyContent:'center', alignContent:'center', display:'flex'}}>
                    <div
                        style={
                            // windowDimensions.width >= 1600 ? {width:'100%'} : {width:'100%'}
                            {width:'100%'}
                        }
                    >
                        <h1
                            style={
                                windowDimensions.width >= 1600 ? {textAlign:'left'} : {textAlign:'center'}
                                // {textAlign:'left'}
                            }
                        >메이크업</h1>
                    </div>
                </div>

                <div style={{display:'flex', position: 'relative', marginBottom:'50px'}}>
                    <Swiper
                        dir="ltr"
                        pagination={{
                        clickable: true,
                        }}
                        slidesPerView={
                            windowDimensions.width >= 1824 ? 5 : 
                            windowDimensions.width >= 1600 ? 4 :
                            windowDimensions.width >= 1340 ? 3 :
                            windowDimensions.width >= 1090 ? 2 : 1
                        }
                        slidesPerGroup={5}
                        // navigation={true}
                        navigation={{
                            prevEl: '.sw7',
                            nextEl: '.sw8'
                        }}
                        spaceBetween={0}
                        modules={[Navigation, Pagination]}
                        className="mySwiper"
                        style={{margin:'0px'}}
                        initialSlide={0}
                    >
                        
                        {[...Array(25)].map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <div style={{textAlign: 'left'}}>
                                        <img src={jkart} alt='' style={{position:'relative'}}/>
                                        <div className='imgdiv'>
                                            <strong style={{display: 'block', fontSize: '18pt'}}>XX예식장</strong>
                                            <p>서울 강남</p>
                                            <p style={{paddingBottom:'25px'}}>000,000,000원</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                    <div
                        className='swiper-button-prev sw7'
                        style={ windowDimensions.width >= 1090 ? {left: '-30px'} : {left: 'calc(50% - 160px)'}}
                    ></div>
                    <div
                        className='swiper-button-next sw8'
                        style={ windowDimensions.width >= 1090 ? {right: '-30px'} : {right: 'calc(50% - 160px)'} }
                    ></div>
                </div>

                {/* ================================================================================================================= */}

                <div style={{justifyContent:'center', alignContent:'center', display:'flex'}} ref={hSRef}>
                    <div
                        style={
                            // windowDimensions.width >= 1600 ? {width:'100%'} : {width:'100%'}
                            {width:'100%'}
                        }
                    >
                        <h1
                            style={
                                windowDimensions.width >= 1600 ? {textAlign:'left'} : {textAlign:'center'}
                                // {textAlign:'left'}
                            }
                        >혼수컬렉션</h1>
                    </div>
                </div>

                <div style={{display:'flex', position: 'relative', marginBottom:'50px'}}>
                    <Swiper
                        dir="ltr"
                        pagination={{
                        clickable: true,
                        }}
                        slidesPerView={
                            windowDimensions.width >= 1824 ? 5 : 
                            windowDimensions.width >= 1600 ? 4 :
                            windowDimensions.width >= 1340 ? 3 :
                            windowDimensions.width >= 1090 ? 2 : 1
                        }
                        slidesPerGroup={5}
                        // navigation={true}
                        navigation={{
                            prevEl: '.sw9',
                            nextEl: '.sw10'
                        }}
                        spaceBetween={0}
                        modules={[Navigation, Pagination]}
                        className="mySwiper"
                        style={{margin:'0px'}}
                        initialSlide={0}
                    >
                        
                        {[...Array(25)].map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <div style={{textAlign: 'left'}}>
                                        <img src={jkart} alt='' style={{position:'relative'}}/>
                                        <div className='imgdiv'>
                                            <strong style={{display: 'block', fontSize: '18pt'}}>XX예식장</strong>
                                            <p>서울 강남</p>
                                            <p style={{paddingBottom:'25px'}}>000,000,000원</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                    <div
                        className='swiper-button-prev sw9'
                        style={ windowDimensions.width >= 1090 ? {left: '-30px'} : {left: 'calc(50% - 160px)'}}
                    ></div>
                    <div
                        className='swiper-button-next sw10'
                        style={ windowDimensions.width >= 1090 ? {right: '-30px'} : {right: 'calc(50% - 160px)'} }
                    ></div>
                </div>

                {/* ================================================================================================================= */}

                <div style={{justifyContent:'center', alignContent:'center', display:'flex'}} ref={wTRef}>
                    <div
                        style={
                            // windowDimensions.width >= 1600 ? {width:'100%'} : {width:'100%'}
                            {width:'100%'}
                        }
                    >
                        <h1
                            style={
                                windowDimensions.width >= 1600 ? {textAlign:'left'} : {textAlign:'center'}
                                // {textAlign:'left'}
                            }
                        >신혼여행지</h1>
                    </div>
                </div>

                <div style={{display:'flex', position: 'relative', marginBottom:'50px'}}>
                    <Swiper
                        dir="ltr"
                        pagination={{
                        clickable: true,
                        }}
                        slidesPerView={
                            windowDimensions.width >= 1824 ? 5 : 
                            windowDimensions.width >= 1600 ? 4 :
                            windowDimensions.width >= 1340 ? 3 :
                            windowDimensions.width >= 1090 ? 2 : 1
                        }
                        slidesPerGroup={5}
                        // navigation={true}
                        navigation={{
                            prevEl: '.sw11',
                            nextEl: '.sw12'
                        }}
                        spaceBetween={0}
                        modules={[Navigation, Pagination]}
                        className="mySwiper"
                        style={{margin:'0px'}}
                        initialSlide={0}
                    >
                        
                        {[...Array(25)].map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <div style={{textAlign: 'left'}}>
                                        <img src={jkart} alt='' style={{position:'relative'}}/>
                                        <div className='imgdiv'>
                                            <strong style={{display: 'block', fontSize: '18pt'}}>XX예식장</strong>
                                            <p>서울 강남</p>
                                            <p style={{paddingBottom:'25px'}}>000,000,000원</p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        
                    </Swiper>
                    <div
                        className='swiper-button-prev sw11'
                        style={ windowDimensions.width >= 1090 ? {left: '-30px'} : {left: 'calc(50% - 160px)'}}
                    ></div>
                    <div
                        className='swiper-button-next sw12'
                        style={ windowDimensions.width >= 1090 ? {right: '-30px'} : {right: 'calc(50% - 160px)'} }
                    ></div>
                </div>

            </div>
        </div>
    );
};

export default Main;