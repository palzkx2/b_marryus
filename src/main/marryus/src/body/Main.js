import React,{useCallback, useEffect, useRef, useState} from 'react';
import './main.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import jkart from '../s_images/JKArt.jpg'
import product from './proData'
import { LuCalendarHeart } from "react-icons/lu";
import { GiAmpleDress, GiLoveLetter, GiRing, GiRingBox } from 'react-icons/gi';
import MainInfo_W from './MainInfo_W';
import MainInfo_S from './MainInfo_S';
import MainInfo_H from './MainInfo_H';
import MainInfo_T from './MainInfo_T';
import axios from 'axios';
import numeral from 'numeral';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export const API_SERVER_HOST = 'http://localhost:8080';

const Main = () => {

    const [hall] = useState(product)
    

    const weddingHallRef = useRef('')
    const sDmRef = useRef('')
    const hSRef = useRef('')
    const wTRef = useRef('')
    const siteIntroRef = useRef('');

    // 스크롤 기능
    const scrollToSection = (ref) => {
        if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
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

    const [backgroundPosition, setBackgroundPosition] = useState(0);

    const handleScroll = () => {
        const scrollY = window.scrollY; // 스크롤 위치
        setBackgroundPosition(scrollY * 0.5); // 배경 위치 조정 (0.5는 속도 조절)
    };

    useEffect(() => {
        window.addEventListener('scroll', fadeinhandleScroll);
        return () => {
            window.removeEventListener('scroll', fadeinhandleScroll);
        };
    }, []);

    const [fadeInClass, setFadeInClass] = useState('');
    const fadeinhandleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 10 ) { // 예: 스크롤이 100px 이상 내려가면
            setFadeInClass('site-intro');
        } else {
            setFadeInClass(''); 
        }
        setBackgroundPosition(scrollY * 0.5);
    };

    const [showWRecom,setShowWRecom] = useState(false)
    const [showSRecom,setShowSRecom] = useState(false)
    const [showHRecom,setShowHRecom] = useState(false)
    const [showTRecom,setShowTRecom] = useState(false)

    const onClose = () => {
        setShowWRecom(false)
        setShowSRecom(false)
        setShowHRecom(false)
        setShowTRecom(false)
    }


    const [travel,setTravel] = useState([]);
    useEffect(()=>{
        axios.get('/api/readSukso')
        .then((response)=>{
            setTravel(response.data)
        })
        .catch(err => console.log("데이터 불러오기 실패:",err))
    },[])


    const [activeCategory, setActiveCategory] = useState('전체');
    const [weddingItem, setWeddingItem] = useState([]);
    useEffect(() => {
        const weddingItemList = async () => {
            try {
                const response = await axios.get('/api/weddingItem', {
                    params: { category: activeCategory === '전체' ? undefined : activeCategory }
                });
                setWeddingItem(response.data);
                console.log(weddingItem)
            } catch (error) {
                console.error(error);
            }
        };

        weddingItemList();
    }, [activeCategory]);

    const [images, setImages] = useState([]);
    const fetchImages = async (searchTerm, selectedCategory, selectedSortType) => {
        try {
            const params = {
                category: selectedCategory,
                sortType: selectedSortType,
                search: searchTerm,
            };

            const response = await axios.get('/api/images', { params });

            // 데이터 설정
            if (response.data) {
                setImages(response.data);
            } else {
                console.error('예상한 데이터 구조가 아닙니다:', response.data);
            }
        } catch (error) {
            console.error('이미지 가져오기 실패:', error);
        }
    };

    useEffect(() => {
        const name = ''
        const category = ''
        const sortType = ''
        fetchImages(name, category, sortType);
    }, []);


    const [sdmList,setSdmList] = useState([]);
    useEffect(()=>{
        axios.get('/api/sdm/readSdmList')
        .then((response)=>{
            setSdmList(response.data)
        })
        .catch(err => console.log("데이터 불러오기 실패:",err))
    },[])

    return (
        <div>
            <div className="backgroundImgGod" style={{ transform: `translateY(-${backgroundPosition}px)` }} />
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

             {/* 사이트 소개 섹션 */}

             <div id={fadeInClass} ref={siteIntroRef}>
                <h2>Marry Us - 당신의 특별한 순간을 완성하는 원스톱 웨딩 서비스</h2>
                <p>
                    웨딩홀 예약, 스드메, 신혼여행까지 한곳에서 간편하게 비교하고 예약하세요. Marry Us는 커플의 요구에 맞춘 맞춤형 서비스를 제공하여 완벽한 결혼 준비를 돕습니다.
                </p>
            </div>

            {/* 메인 콘텐츠 버튼 그룹 */}
            <div className='catHeader' style={{ display: 'flex', justifyContent: 'center', margin: '50px 0', height: '330px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '70%' }}>
                    <button onMouseEnter={()=>{setShowWRecom(true);setShowSRecom(false);setShowHRecom(false);setShowTRecom(false)}} className="catBtnMain" onClick={() => scrollToSection(weddingHallRef)}>
                        <div>
                            <GiLoveLetter className='catIcoon'/>
                            <div className='wdDescName'>웨딩홀</div>
                            <div className='wdDescCat'>꿈의 웨딩홀, Marry Us에서 찾으세요!</div>
                        </div>
                    </button>
                    <button onMouseEnter={()=>{setShowWRecom(false);setShowSRecom(true);setShowHRecom(false);setShowTRecom(false)}} className="catBtnMain" onClick={() => scrollToSection(sDmRef)}>
                        <div>
                            <GiAmpleDress className='catIcoon'/>
                            <div className='wdDescName'>스드메</div>
                            <div className='wdDescCat'>완벽한 스타일링과 메이크업, Marry Us에서 경험하세요!</div>
                        </div>
                    </button>
                    <button onMouseEnter={()=>{setShowWRecom(false);setShowSRecom(false);setShowHRecom(true);setShowTRecom(false)}} className="catBtnMain" onClick={() => scrollToSection(hSRef)}>
                        <div>
                            <GiRingBox  className='catIcoon'/>
                            <div className='wdDescName'>혼수</div>
                            <div className='wdDescCat'>완벽한 혼수 컬렉션, MarryUs에서 준비하세요!</div>
                        </div>
                    </button>
                    <button onMouseEnter={()=>{setShowWRecom(false);setShowSRecom(false);setShowHRecom(false);setShowTRecom(true)}} className="catBtnMain" onClick={() => scrollToSection(wTRef)}>
                        <div>
                            <LuCalendarHeart className='catIcoon'/>
                            <div className='wdDescName'>신혼여행</div>
                            <div className='wdDescCat'>잊지 못할 신혼여행, MarryUs와 함께 떠나세요!</div>
                        </div>
                    </button>
                </div>
            </div>
            <div className={`alignGood ${showWRecom ? 'fadeIn' : 'fadeOut'}`}>
                {showWRecom && <MainInfo_W onClose={onClose}/>}
            </div>
            <div className={`alignGood ${showSRecom ? 'fadeIn' : 'fadeOut'}`}>
                {showSRecom && <MainInfo_S onClose={onClose}/>}
            </div>
            <div className={`alignGood ${showHRecom ? 'fadeIn' : 'fadeOut'}`}>
                {showHRecom && <MainInfo_H onClose={onClose}/>}
            </div>
            <div className={`alignGood ${showTRecom ? 'fadeIn' : 'fadeOut'}`}>
                {showTRecom && <MainInfo_T onClose={onClose}/>}
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
                        
                        {images.slice(0,25).map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <div style={{textAlign: 'left', width: '230px'}}>
                                        <img src={`/api/images/${item.imgPath.split('\\').pop()}`} alt='' style={{position:'relative', maxWidth: '230px'}}/>
                                        <div className='imgdiv'>
                                            <strong style={{
                                                display: 'block', 
                                                fontSize: '18pt', 
                                                wordBreak: 'break-word', 
                                                overflowWrap: 'break-word', 
                                                whiteSpace: 'normal',
                                                maxWidth:'200px'
                                            }}>
                                                {item.name}
                                            </strong>
                                            <p style={{
                                                display: 'block', 
                                                fontSize: '12pt', 
                                                wordBreak: 'break-word', 
                                                overflowWrap: 'break-word', 
                                                whiteSpace: 'normal',
                                                maxWidth:'200px'
                                            }}>{item.addr}</p>
                                            <p style={{paddingBottom:'25px'}}>{numeral(item.price).format('0,0')}</p>
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
                        
                        {sdmList.filter(name => name.category==='스튜디오').map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
<<<<<<< HEAD
                                    <Link to={`/sdmArticle/${item.itemNm}`}>
                                        <div style={{textAlign: 'left'}}>
                                            <img src={`${API_SERVER_HOST}/api/sdm/view/${item.imageList[0].imgName}`} alt='' style={{position:'relative'}}/>
                                            <div className='imgdiv'>
                                                <strong style={{display: 'block', fontSize: '18pt'}}>{item.itemNm}</strong>
                                                <p>{item.addr}</p>
                                                <p style={{paddingBottom:'25px'}}>{item.price}</p>
                                            </div>
=======
                                    <div style={{textAlign: 'left'}}>
                                        <img src={`${API_SERVER_HOST}/api/sdm/view/${item.imageList[0].imgName}`} alt='' style={{position:'relative'}}/>
                                        <div className='imgdiv'>
                                            <strong style={{display: 'block', fontSize: '18pt'}}>{item.itemNm}</strong>
                                            <p>{item.addr}</p>
                                            <p style={{paddingBottom:'25px'}}>{numeral(item.price).format('0,0')}</p>
>>>>>>> branch '카트와리뷰를_합쳤어용' of https://github.com/palzkx2/b_marryus.git
                                        </div>
                                    </Link>
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
                        
                        {sdmList.filter(name => name.category==='드레스').map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <Link to={`/sdmArticle/${item.itemNm}`}>
                                        <div style={{textAlign: 'left'}}>
                                            <img src={`${API_SERVER_HOST}/api/sdm/view/${item.imageList[0].imgName}`} alt='' style={{position:'relative'}}/>
                                            <div className='imgdiv'>
                                                <strong style={{display: 'block', fontSize: '18pt'}}>{item.itemNm}</strong>
                                                <p>{item.addr}</p>
                                                <p style={{paddingBottom:'25px'}}>{item.price}</p>
                                            </div>
                                        </div>
                                    </Link>
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
                        
                        {sdmList.filter(name => name.category==='메이크업').map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <Link to={`/sdmArticle/${item.itemNm}`}>
                                        <div style={{textAlign: 'left'}}>
                                            <img src={`${API_SERVER_HOST}/api/sdm/view/${item.imageList[0].imgName}`} alt='' style={{position:'relative'}}/>
                                            <div className='imgdiv'>
                                                <strong style={{display: 'block', fontSize: '18pt'}}>{item.itemNm}</strong>
                                                <p>{item.addr}</p>
                                                <p style={{paddingBottom:'25px'}}>{item.price}</p>
                                            </div>
                                        </div>
                                    </Link>
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
                        
                        {weddingItem.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <Link to={`/weddingItemArticle/${item.id}`}>
                                        <div style={{textAlign: 'left'}}>
                                            <img src={`${process.env.PUBLIC_URL}${item.imgAddr}`} alt={item.imgName} style={{position:'relative'}}/>
                                            <div className='imgdiv'>
                                                <strong style={{display: 'block', fontSize: '18pt'}}>{item.IMG_ADDR}</strong>
                                                <p>{item.imgName}</p>
                                                <p style={{paddingBottom:'25px'}}>{numeral(item.price).format('0,0')}</p>
                                            </div>
                                        </div>
                                    </Link>
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
                        
                        {travel.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='swiper-slide' style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                    <Link to={`/travelArticle/${item.id}/${item.sname}/${item.pyong}/${item.price}/${item.addr}/${item.imgName}/${item.wido}/${item.gyungdo}`}>
                                        <div style={{textAlign: 'left'}}>
                                            <img src={`/p_images/travel/sukso/${item.imgName}`} alt={item.imgName} style={{position:'relative'}}/>
                                            <div className='imgdiv'>
                                                <strong style={{display: 'block', fontSize: '18pt'}}>{item.sname}</strong>
                                                <p>{item.place}</p>
                                                <p style={{paddingBottom:'25px'}}>{numeral(item.price).format('0,0')}원</p>
                                            </div>
                                        </div>
                                    </Link>
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