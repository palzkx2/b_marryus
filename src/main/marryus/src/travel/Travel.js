import React, { useState } from 'react';
import './travel.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'; // 필요한 모듈 import
import 'swiper/swiper-bundle.css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import data from './travelData';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import loginImg from '../s_images/weddingHall/wdHallBar1.jpg'


const Travel = () => {
    const [travel, setTravel] = useState(data);

    return (
        <div style={{justifyContent:'center', alignContent:'center'}}>
             <div style={{margin:'auto',width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${process.env.PUBLIC_URL}/p_travel/travelweb2.jpg)`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
            </div>   
            <div className='mainContainer' style={{margin:'auto',display:'flex', justifyContent:'center', alignContent:'center'}}>
            <div >
                <div>
                    <h2>신부야 여행가자</h2>
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
                            {data.map((item,no) => (
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
                                    <Link to={`/travelOnCat/${item.place}`}>
                                        <img src={item.img} alt={item.place}
                                            style={{
                                                maxWidth: '150%',
                                                maxHeight: '200%',
                                                objectFit: 'contain',
                                                marginBottom:'-50px'}}
                                            />
                                    </Link>

                                    <div style={{ marginTop:'10px', textAlign:'center', width:'100%' }}>
                                        <Link to={`/travelOnCat/${item.place}`}>
                                            <strong style={{color:'black'}}>{item.place}</strong>
                                            <p style={{marginBottom:'3em',color:'black'}}>어디가?</p>
                                        </Link>
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
                        <Link to={`/travelArticle/${item.place}`}>
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
                            </Link>
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

                    
                    
                </div>
        </div>
    </div>
    );
};

export default Travel;