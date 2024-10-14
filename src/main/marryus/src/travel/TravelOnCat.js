import React, { useState } from 'react';
import './travel.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'; // 필요한 모듈 import
import 'swiper/swiper-bundle.css'; 
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import data from './travelData';
import { GrSort } from 'react-icons/gr';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import WeddingHallItem from '../body/WeddingHallItem';



const TravelOnCat = () => {

    const [travel, setTravel] = useState(data);

    const {place} = useParams()


    const thisPro = data.find(item=>item.place===place)

    return (
        <div>
            <div>
                <div className='alignGood'>
                    <h2>신부야 여행가자</h2>
                </div>
                <div className='alignGood'>

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
                </div>

                
                <div className='alignGood'>

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
                                    <Link to={`/travelOnCat/${item.place}`}>
                                    <img
                                        src={item.img}
                                        alt={item.place}
                                        style={{
                                            maxWidth: '150%',
                                            maxHeight: '200%',
                                            objectFit: 'contain'
                                        }}
                                        />
                                    </Link>
                                    <div style={{ marginTop:'10px', textAlign:'center', width:'100%' }}>
                                        <strong>{item.place}</strong>
                                        <p style={{marginBottom:'3em'}}>어디가?</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
             {/* 헤드라인 */}
             <div style={{width:'1000px'}}>
            
                        <h2>
                            {
                               thisPro.place==='jeju' ? '제주' : 
                                (thisPro.place==='danang' && '다낭') ||
                                (thisPro.place==='Guam' && '괌') ||
                                (thisPro.place==='Kota_Kinabalu' && '코타키나발루') 
                            }
                        </h2>
                           
            
                        {/* 게시판 */}
                            {/* 게시판 헤더 */}
                            <div className='header allProductHr' style={{marginTop:'40px'}}/>
                            <div style={{display:'flex'}}>
                                <a href='#'>
                                    <div className='allProduct'>
                                        전체상품
                                    </div>
                                </a>
                                <a href='#'>
                                    <div className='allProduct'>
                                    가격순
                                    </div>
                                </a>
                                <a href='#'>
                                    <div className='allProduct'>
                                    평점순
                                    </div>
                                </a>
                                <a href='#'>
                                    <div className='allProduct'>
                                    거리순
                                    </div>
                                </a> 
                                    <div className='allProduct' style={{marginLeft:'500px',fontWeight:'normal',fontSize:'13px'}}>
                                    총 {data.length}개의 상품이 검색되었습니다.&nbsp;&nbsp;&nbsp;
                                    <a href='#'><GrSort /></a>
                                    </div>                  
                            </div>
                            <div className='header allProductHr'/>
                            {/* 게시판 헤더 */}
                            <div style={{all:'initial',display:'flex',flexWrap:'wrap',overflow:'auto',backgroundColor:'whitesmoke',alignContent:'center',marginTop:'10px',margin:'10px',padding:'10px'}}>
                                {
                                    data.map((item,index)=>
                                        
                                        <div className='itemContainer'>
                                            <Link to={`/travelArticle/${item.place}`} className='toArticle'>
                                                <WeddingHallItem key={index} item={item}/>                             
                                            </Link>
                                        </div>
                                )
                            }
                            </div>
                        </div>





                    </div>





        </div>
    );
};

export default TravelOnCat;