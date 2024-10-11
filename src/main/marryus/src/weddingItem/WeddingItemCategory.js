import React, { useEffect, useState } from 'react';
import './weddingItemCategory.css'
import suit2 from '../s_images/suit2.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
 
const WeddingItemCategory = () => {

    const data = [
        {
            name:'이미지1'
        },
        {
            name:'이미지2'
        },
        {
            name:'이미지3'
        },
        {
            name:'이미지4'
        },
        {
            name:'이미지5'
        },
        {
            name:'이미지6'
        },
    ]

    const [dress,setDress] = useState(data)

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
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${suit2})`, backgroundSize:'cover', backgroundPosition:`center calc(100% + 300px)`}}>

                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'50px', marginBottom:'20px'}}>
                <div style={{width:'1280px', height:'500px', justifyContent:'center', display:'flex'}}>
                    <Swiper
                        dir="ltr"
                        pagination={{
                        clickable: true,
                        }}
                        slidesPerView={
                            windowDimensions.width >= 1650 ? 3 : 
                            windowDimensions.width >= 1350 ? 2 : 1
                        }
                        slidesPerGroup={1}
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
                        
                        {dress.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <div style={{width:'370px', height:'450px', background:'green'}}>
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div
                        className='swiper-button-prev sw1'
                        style={ windowDimensions.width >= 1630 ? {left: '260px', top:'775px'} : {left: 'calc(50% - 260px)', top:'775px'}}
                    ></div>
                    <div
                        className='swiper-button-next sw2'
                        style={ windowDimensions.width >= 1630 ? {right: '260px', top:'775px'} : {right: 'calc(50% - 260px)', top:'775px'}}
                    ></div>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center', margin:'50px 0'}}>
                <div style={{width:'1400px', height:'1000px'}}>
                    <div>
                        {
                            // data를 4개씩 나누기 위한 배열 생성
                            Array.from({ length: Math.ceil(dress.length / 3) }).map((_, rowIndex) => (
                                <div key={rowIndex} style={{ display: 'flex', marginBottom: '20px', justifyContent:'space-between'}}>
                                    {
                                        dress.slice(rowIndex * 3, rowIndex * 3 + 3).map((item, index) => (
                                            <div key={index}>
                                                <div style={{background:'gray', width:'350px', height:'450px', margin:'30px 30px'}}>
                                                    <img src='' alt='' width={350} height={450}/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export default WeddingItemCategory;