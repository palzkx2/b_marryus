import React, { useState } from 'react';
import './travel.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'; // 필요한 모듈 import
import 'swiper/swiper-bundle.css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import data from './travelData';


const Travel = () => {
    const [travel, setTravel] = useState(data);

    return (
        <div style={{display:'flex' ,justifyContent:'center', alignContent:'center'}}>
        <div>
            <div>
                <h2>신부야 여행가자</h2>
                <div
                    style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/p_travel/travelweb2.jpg)`,
                        backgroundSize: 'cover',
                        width: '1200px',
                        height: '500px',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}>
                </div>
                <div style={{ width: '1200px', overflow: 'hidden', marginTop: '30px' }}>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar]} // 모듈 추가
                        className='travel-swiper'
                        style={{ width: '1200px', height: '300px' }}
                        spaceBetween={10}
                        slidesPerView={4}
                        navigation // 네비게이션 활성화
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    >
                        {data.map((item, no) => (
                            <SwiperSlide
                                key={no}
                                className='travel-swiper-slide'
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.place}
                                    style={{
                                        maxWidth: '150%',
                                        maxHeight: '200%',
                                        objectFit: 'contain'
                                    }}
                                />
                                <div style={{ marginTop:'10px', textAlign:'center', width:'100%' }}>
                                    <strong>{item.place}</strong>
                                    <p style={{marginBottom:'3em'}}>어디가?</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <div style={{ marginLeft: '1em', marginTop: '1em' }}>
    <h3>인기 추천 숙소</h3>
    <div>
        <div style={{ display:'flex', flexDirection:'row', marginBottom: '10px' }}>
            <div className='css-1ax683h'>전체</div>
            <div className='css-1ax683h'>호텔</div>
            <div className='css-1ax683h'>리조트</div>
            <div className='css-1ax683h'>풀빌라</div>
        </div>
    </div>
    <div style={{ width: '1200px', height:'400px', overflow:'hidden', marginTop:'10px' }}>   
        <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            className='travel-swiper'
            style={{ width:'1200px', height:'400px' }}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable:true }}
            scrollbar={{ draggable:true }}
        >
            {data.map((item, no) => (
                <SwiperSlide
                    key={no}
                    className='travel-swiper-slide'
                    style={{
                        display:'flex', 
                        flexDirection:'column',
                        justifyContent:'flex-start', 
                        alignItems:'center', 
                        width:'100%', 
                        height:'100%',
                        padding:'10px'
                    }}
                >
                    <img
                        className='ttimg'
                        src={item.img}
                        alt={item.place}
                        style={{
                            width:'100%',
                            height:'200px',
                            objectFit:'cover'
                        }}
                    />
                    <div style={{ marginTop:'10px', textAlign:'center', width:'100%' }}>
                        <strong style={{ display:'block', fontSize:'18pt', marginBottom:'5px' }}>{item.place}</strong>
                        <p style={{ fontSize:'16pt', color:'black', marginBottom:'5px' }}>{item.hotelname}</p>
                        <p style={{ fontSize:'10pt', marginBottom:'5px' }}>{item.dec}</p>
                        <p style={{ fontSize:'15pt', color:'black', marginBottom:'8px' }}>{item.price}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
</div>

<div style={{ marginTop: '20px' }}> {/* 간격 조정 */}
    <h3>오늘 체크인 할인특가</h3>
    <div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
            <div className='css-1ax683h'>전체</div>
            <div className='css-1ax683h'>호텔</div>
            <div className='css-1ax683h'>리조트</div>
            <div className='css-1ax683h'>풀빌라</div>
        </div>
    </div>
    <div style={{ width: '1200px', height: '400px', overflow: 'hidden', marginTop: '10px' }}>   
        <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            className='travel-swiper'
            style={{ width: '1200px', height: '400px' }}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable:true }}
            scrollbar={{ draggable:true }}
        >
            {data.map((item, no) => (
                <SwiperSlide
                    key={no}
                    className='travel-swiper-slide'
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        padding: '10px'
                    }}
                >
                    <img
                        src={item.img}
                        alt={item.place}
                        style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover'
                        }}
                    />
                    <div style={{ marginTop: '10px', textAlign: 'center', width: '100%' }}>
                        <strong style={{ display: 'block', fontSize: '18pt', marginBottom: '5px' }}>{item.place}</strong>
                        <p style={{ fontSize: '16pt', color: 'black', marginBottom: '5px' }}>{item.hotelname}</p>
                        <p style={{ fontSize: '10pt', marginBottom: '5px' }}>{item.dec}</p>
                        <p style={{ fontSize: '15pt', color: 'black', marginBottom: '8px' }}>{item.price}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
</div>  
        </div>
        </div>
    );
};

export default Travel;