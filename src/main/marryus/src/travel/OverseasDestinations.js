import React, { useEffect, useMemo, useState } from 'react';
import './DomesticDestinations.css';  // CSS는 그대로 유지
import imgMaldiv from '../s_images/travel/overseasDestinations/maldiv.jpg';
import imgHawaii from '../s_images/travel/overseasDestinations/hawai.jpg';
import imgParis from '../s_images/travel/overseasDestinations/paris.jpg';
import imgSantorini from '../s_images/travel/overseasDestinations/santo.jpg';
import imgRoma from '../s_images/travel/overseasDestinations/rome.jpg';
import imgBali from '../s_images/travel/overseasDestinations/bali.jpg';
import imgDubai from '../s_images/travel/overseasDestinations/dubai.jpg';
import imgPhuket from '../s_images/travel/overseasDestinations/phuket.jpg';
import imgMiko from '../s_images/travel/overseasDestinations/miko.jpg';
import imgBarca from '../s_images/travel/overseasDestinations/barca.jpg';
import imgNewyork from '../s_images/travel/overseasDestinations/newyork.jpg';
import imgRio from '../s_images/travel/overseasDestinations/rio.jpg';
import imgCzech from '../s_images/travel/overseasDestinations/czech.jpg';
import imgBueno from '../s_images/travel/overseasDestinations/bueno.jpg';
import imgBancouver from '../s_images/travel/overseasDestinations/vancouver.jpg';
import imgSevilla from '../s_images/travel/overseasDestinations/sevilla.jpg';
import imgBenezia from '../s_images/travel/overseasDestinations/venice.jpg';
import imgKota from '../s_images/travel/overseasDestinations/kota.jpg';
import imgSanJuan from '../s_images/travel/overseasDestinations/sanJuan.jpg';
import imgTaibei from '../s_images/travel/overseasDestinations/taipai.jpg';
import imgMalta from '../s_images/travel/overseasDestinations/malta.jpg';
import imgOsaka from '../s_images/travel/overseasDestinations/osaka.jpg';
import imgCreta from '../s_images/travel/overseasDestinations/creta.jpg';
import imgOthers from '../s_images/travel/overseasDestinations/others.jpg';
import cp1 from '../s_images/travel/company/13e0a48b-a413-4648-abd9-edd7adacf4bd.png'; 
import cp2 from '../s_images/travel/company/319473e7-6273-4942-ac33-d22ab5e6f0fa.png'; 
import cp3 from '../s_images/travel/company/9bea4115-2258-4089-ab2c-5c880c34b236.png'; 
import cp4 from '../s_images/travel/company/13e0a48b-a413-4648-abd9-edd7adacf4bd.png'; 
import cp5 from '../s_images/travel/company/b4de7f8b-0dc4-4ee2-b83f-b79d7bb7b45d.png'; 
import Sidebar from './Sidebar';
import Modal from './Modal';
import video from '../assets/video/travel.mp4';  // 해외 여행지 비디오
import axios from 'axios';
import numeral from 'numeral';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const OverseasDestinations = () => {
    const [userRole,setUserRole] = useState('') 
    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get('/api/session', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
                console.log('세션 정보 : ', response.data)
                setUserRole(response.data.userRole); // 세션 정보를 상태에 저장
            } catch (error) {
                console.error('세션 정보 가져오기 실패:', error);
            }
        };
        fetchSessionData();
    }, []);
    // 전체 여행지 데이터를 준비 (두 번째 코드의 상세 정보 포함)
    const [destinations, setDestinations] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const sResponse = await axios.get('http://192.168.16.23:8080/api/readSukso');
                const accommodationsData = sResponse.data; // API에서 숙소 데이터를 가져옴
                const aResponse = await axios.get('http://192.168.16.23:8080/api/readSukso');
                const agenciesData = aResponse.data; // API에서 여행사 데이터를 가져옴
                const destinationsData = [
                    { 
                        name: '몰디브', 
                        description: '천국 같은 푸른 바다 몰디브에서의 신혼여행은 시작을 더욱 빛나게 해 줄 것입니다.',
                        image: imgMaldiv, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '몰디브 여행사 A', rating: '4.8', price: '500,000원', location: '몰디브' },
                            { name: '몰디브 여행사 B', rating: '4.7', price: '520,000원', location: '몰디브' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '몰디브')
                    },
                    { 
                        name: '하와이', 
                        description: '매혹적인 자연과 독특한 문화가 어우러진 하와이. 태양 아래에서 즐기는 해변과 로맨틱한 저녁 식사가 당신의 마음을 사로잡습니다.',
                        image: imgHawaii, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '하와이 여행사 C', rating: '4.7', price: '480,000원', location: '하와이' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '하와이')
                    },
                    { 
                        name: '프랑스 파리', 
                        description: '사랑의 도시, 파리에서 낭만적인 시간을 보내세요. 에펠탑 아래에서의 데이트와 세련된 카페에서의 여유는 당신의 신혼여행을 특별하게 만들어 줄 것입니다.',
                        image: imgParis, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '파리 여행사 D', rating: '4.6', price: '700,000원', location: '프랑스' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '파리')
                    },
                    { 
                        name: '산토리니', 
                        description: '매력적인 일몰과 독특한 건축물이 어우러진 산토리니. 당신의 사랑을 더욱 깊이 있게 만들어 줄 완벽한 배경입니다.',
                        image: imgSantorini, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '산토리니 여행사 E', rating: '4.8', price: '600,000원', location: '그리스' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '산토리니')
                    },
                    { 
                        name: '이탈리아 로마', 
                        description: '역사와 문화가 살아 숨 쉬는 로마에서 로맨스를 만끽하세요. 고대 유적지를 탐험하며 특별한 순간을 만들어보세요.',
                        image: imgRoma, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '로마 여행사 F', rating: '4.7', price: '650,000원', location: '이탈리아' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '로마')
                    },
                    { 
                        name: '발리', 
                        description: '천혜의 자연과 아름다운 해변이 조화를 이루는 발리. 영혼의 휴식을 취하며 진정한 로맨스를 경험하세요.',
                        image: imgBali, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '발리 여행사 G', rating: '4.9', price: '550,000원', location: '인도네시아' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '발리')
                    },
                    { 
                        name: '두바이', 
                        description: '현대와 전통이 공존하는 두바이. 고급스러운 쇼핑과 이국적인 경험이 당신을 기다립니다.',
                        image: imgDubai, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '두바이 여행사 H', rating: '4.7', price: '700,000원', location: 'UAE' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '두바이')
                    },
                    { 
                        name: '태국 푸켓', 
                        description: '청량한 바다와 활기찬 나이트라이프가 매력적인 푸켓. 편안한 휴식을 취하며 사랑을 키워보세요.',
                        image: imgPhuket, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '푸켓 여행사 I', rating: '4.6', price: '450,000원', location: '태국' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '푸켓')
                    },
                    { 
                        name: '그리스 미코노스', 
                        description: '하얀 건물과 파란 바다가 어우러진 미코노스. 특별한 순간을 더욱 아름답게 만들어 줄 것입니다.',
                        image: imgMiko, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '미코노스 여행사 J', rating: '4.8', price: '750,000원', location: '그리스' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '미코노스')
                    },
                    { 
                        name: '바르셀로나', 
                        description: '예술과 문화가 살아 숨 쉬는 바르셀로나. 고유한 건축물과 맛있는 음식을 즐기며 특별한 시간을 보내세요.',
                        image: imgBarca, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '바르셀로나 여행사 K', rating: '4.7', price: '650,000원', location: '스페인' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '바르셀로나')
                    },
                    { 
                        name: '뉴욕', 
                        description: '세계의 중심, 뉴욕에서 멋진 시간을 보내세요. 다양한 문화와 즐길 거리로 가득한 도시입니다.',
                        image: imgNewyork, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '뉴욕 여행사 L', rating: '4.9', price: '800,000원', location: '미국' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '뉴욕')
                    },
                    { 
                        name: '리우데자네이루', 
                        description: '브라질의 열정을 느끼며 리우데자네이루에서 특별한 순간을 만끽하세요. 아름다운 해변과 카니발이 매력적입니다.',
                        image: imgRio, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '리우 여행사 M', rating: '4.8', price: '500,000원', location: '브라질' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '리우데자네이루')
                    },
                    { 
                        name: '체코 프라하', 
                        description: '중세의 매력이 가득한 프라하. 역사적인 건축물과 아름다운 경관이 여러분을 기다립니다.',
                        image: imgCzech, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '프라하 여행사 N', rating: '4.7', price: '600,000원', location: '체코' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '프라하')
                    },
                    { 
                        name: '아르헨티나 부에노스아이레스', 
                        description: '탱고와 와인이 유명한 부에노스아이레스에서 색다른 경험을 해보세요. 매력적인 도시가 여러분을 기다립니다.',
                        image: imgBueno, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '부에노스아이레스 여행사 O', rating: '4.6', price: '550,000원', location: '아르헨티나' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '부에노스아이레스')
                    },
                    { 
                        name: '캐나다 밴쿠버', 
                        description: '자연과 도시가 조화를 이루는 밴쿠버. 평화로운 풍경 속에서 사랑의 순간을 만끽하세요.',
                        image: imgBancouver, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '밴쿠버 여행사 P', rating: '4.7', price: '650,000원', location: '캐나다' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '밴쿠버')
                    },
                    { 
                        name: '스페인 세비야', 
                        description: '플라멩코와 역사가 살아 숨 쉬는 세비야. 특별한 순간을 만들어 줄 매력적인 도시입니다.',
                        image: imgSevilla, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '세비야 여행사 Q', rating: '4.8', price: '600,000원', location: '스페인' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '세비야')
                    },
                    { 
                        name: '이탈리아 베네치아', 
                        description: '물의 도시 베네치아에서 로맨틱한 여행을 떠나세요. 곤돌라를 타며 사랑을 느껴보세요.',
                        image: imgBenezia, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '베네치아 여행사 R', rating: '4.9', price: '700,000원', location: '이탈리아' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '베네치아')
                    },
                    { 
                        name: '코타키나발루', 
                        description: '아름다운 해변과 자연이 어우러진 코타키나발루. 편안한 휴식과 다양한 액티비티를 즐겨보세요.',
                        image: imgKota, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '코타키나발루 여행사 S', rating: '4.6', price: '500,000원', location: '말레이시아' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '코타키나발루')
                    },
                    { 
                        name: '푸에르토리코 산후안', 
                        description: '역사와 문화가 어우러진 산후안. 따뜻한 햇살과 아름다운 해변에서 휴식을 취해보세요.',
                        image: imgSanJuan, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '산후안 여행사 T', rating: '4.7', price: '600,000원', location: '푸에르토리코' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '산후안')
                    },
                    { 
                        name: '타이완 타이베이', 
                        description: '문화와 역사가 가득한 타이완의 수도, 타이베이. 전통과 현대가 공존하는 도시에서 특별한 순간을 즐겨보세요.',
                        image: imgTaibei, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '타이베이 여행사 U', rating: '4.8', price: '450,000원', location: '타이완' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '타이베이')
                    },
                    { 
                        name: '몰타', 
                        description: '환상적인 바다와 역사적인 유적이 가득한 몰타. 로맨틱한 순간을 경험하세요.',
                        image: imgMalta, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '몰타 여행사 V', rating: '4.9', price: '550,000원', location: '몰타' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '몰타')
                    },
                    { 
                        name: '일본 오사카', 
                        description: '맛있는 음식과 유쾌한 문화가 매력적인 오사카. 여행의 즐거움을 만끽하세요.',
                        image: imgOsaka, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '오사카 여행사 W', rating: '4.7', price: '500,000원', location: '일본' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '오사카')
                    },
                    { 
                        name: '그리스 크레타', 
                        description: '아름다운 해변과 역사적인 유적지가 가득한 크레타. 사랑하는 사람과 특별한 순간을 만들어보세요.',
                        image: imgCreta, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '크레타 여행사 X', rating: '4.6', price: '600,000원', location: '그리스' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '크레타')
                    },
                    { 
                        name: '그 외', 
                        description: '그 외 Marry Us 의 추천 여행지를 찾아보세요.',
                        image: imgOthers, // 이미지 파일 변경 필요
                        agencies: [
                            { name: '크레타 여행사 X', rating: '4.6', price: '600,000원', location: '그리스' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '크레타')
                    }
                ];
                
                setDestinations(destinationsData); // 상태 업데이트
            } catch (error) {
                console.error('Error fetching accommodations:', error);
            }
        };
        fetchData();
    }, []); 
    const [currentSlide, setCurrentSlide] = useState(0); // 현재 슬라이드 인덱스 관리
    const slidesPerPage = 4; // 한 페이지에 보여줄 여행지 개수 설정
    // 슬라이드 이동 함수
    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(destinations.length / slidesPerPage));
    };
    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => 
            prevSlide === 0 ? Math.ceil(destinations.length / slidesPerPage) - 1 : prevSlide - 1
        );
    };
    // 현재 페이지에 보여줄 슬라이드 그룹
    const currentDestinations = destinations.slice(
        currentSlide * slidesPerPage, 
        (currentSlide + 1) * slidesPerPage
    );
    // 모달 관련 상태 및 함수
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [selectedTab, setSelectedTab] = useState('accommodations');
    const [selectedAgency, setSelectedAgency] = useState(null);
    const [selectedAccommodation, setSelectedAccommodation] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAccommodationModalOpen, setIsAccommodationModalOpen] = useState(false);
    const handleDestinationClick = (destination) => {
        setSelectedDestination(destination);
    };
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };
    const handleAgencyClick = (agency) => {
        setSelectedAgency(agency);
        setIsModalOpen(true);
    };
    const handleAccommodationClick = (accommodation) => {
        setSelectedAccommodation(accommodation);
        setIsAccommodationModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAgency(null);
    };

    const closeAccommodationModal = () => {
        setIsAccommodationModalOpen(false);
        setSelectedAccommodation(null);
    };
    const deleteDes = async (id) => {
        const confirmation = window.confirm('삭제하시겠습니까?');
        if (confirmation) {
                try {
                    // 백엔드 API 엔드포인트
                    const response = await axios.delete(`/api/deleteSukso/${id}`);        
                    // 성공적으로 삭제된 경우
                    console.log('삭제 성공:', response.data);
                    alert('삭제되었습니다.')
                    window.location.reload()                  
                    // 삭제 후 UI 업데이트 로직 추가 (예: 리스트에서 항목 제거)
                    // 예시: setItems(items.filter(item => item.id !== id));
                } catch (error) {
                    // 오류 처리
                    console.error('삭제 실패:', error);
                }
            }else {
                // 취소 시 실행되는 로직
                alert('취소되었습니다.');
                console.log("장바구니 담기가 취소되었습니다.");
            }
    };

    const onSort = (by) => {

        let sortedAccommodations

        if (selectedDestination && selectedDestination.accommodations) {

            if(by==='ascPyong'){
                // 정렬 수행
                sortedAccommodations = [...selectedDestination.accommodations].sort((a, b) => a.pyong - b.pyong);
            }else if(by==='descPyong'){
                sortedAccommodations = [...selectedDestination.accommodations].sort((a, b) => b.pyong - a.pyong);
            }else if(by==='ascPrice'){
                sortedAccommodations = [...selectedDestination.accommodations].sort((a, b) => a.price - b.price);
            }else if(by==='descPrice'){
                sortedAccommodations = [...selectedDestination.accommodations].sort((a, b) => b.price - a.price);
            }else if(by==='ascName'){
                sortedAccommodations = [...selectedDestination.accommodations].sort((a, b) => a.sname.localeCompare(b.sname));
            }else if(by==='descName'){
                sortedAccommodations = [...selectedDestination.accommodations].sort((a, b) => b.sname.localeCompare(a.sname));
            }
            
            // 정렬된 accommodations 배열을 새로운 객체로 업데이트하여 UI 반영
            setSelectedDestination({
                ...selectedDestination,
                accommodations: sortedAccommodations
            });
        }

        if(isDropdownOpen){
            setIsDropdownOpen(!isDropdownOpen);
        }
        if(isPriceDropdownOpen){
            setisPriceDropdownOpenIsDropdownOpen(!isPriceDropdownOpen);
        }
        if(isNameDropdownOpen){
            setisNameDropdownOpenIsDropdownOpen(!isNameDropdownOpen);
        }
        

    };
       
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isPriceDropdownOpen, setisPriceDropdownOpenIsDropdownOpen] = useState(false);
    const [isNameDropdownOpen, setisNameDropdownOpenIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const togglePriceDropdown = () => {
        setisPriceDropdownOpenIsDropdownOpen(!isPriceDropdownOpen);
    };
    const toggleNameDropdown = () => {
        setisNameDropdownOpenIsDropdownOpen(!isNameDropdownOpen);
    };
    
    return (
        <div>
            <Sidebar />
            <div className='alignGood'>
                <div className='mainContainer' style={{ height: 'auto' }}>
                    <div className="hero-section" style={{ height: '200px' }}>
                        <video autoPlay loop muted className="background-video">
                            <source src={video} type="video/mp4" />
                            비디오를 지원하지 않는 브라우저입니다.
                        </video>
                        <div className="overlay">
                            <h1 className='sh1' style={{ padding: '20px', color: 'white' }}>해외 신혼 여행지</h1>
                            <p style={{ padding: '20px' }}>특별한 순간을 위한 해외 여행지를 찾으세요!</p>
                        </div>
                    </div>              
                    {/* 슬라이더 섹션 */}
                    <div className="domestic-destinations">
                        <div className="slider-container">
                            {/* 이전 슬라이드 버튼 */}
                            <div className='prevBtnLoc'>
                                <button className="slider-button prev-button" onClick={handlePrevSlide}>{"<"}</button>
                            </div>
                            {/* 슬라이드 그룹 */}
                            <div className="destination-cards">
                                {currentDestinations.map((destination, index) => (
                                    <div 
                                        className="destination-card" 
                                        key={index} 
                                        onClick={() => handleDestinationClick(destination)}
                                    >
                                        <img src={destination.image} alt={destination.name} className="destination-image" />
                                        <div className="card-overlay">
                                            <h2 className='h2name'>{destination.name}</h2>
                                            <p className="destination-description">{destination.description}</p>
                                            <div style={{ display: 'flex', padding: '10px', margin: '10px 10px 10px 66px' }}>
                                                {/*  시간 남으면 구현 - 여행사 
                                                    <div className='catcat'>
                                                        <button onClick={() => handleTabChange('agencies')}>여행사 목록</button>
                                                    </div> 
                                                */}
                                                <div className='catcat'>
                                                    <button onClick={() => handleTabChange('accommodations')}>숙소 목록</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* 다음 슬라이드 버튼 */}
                            <div className='nextBtnLoc'>
                                <button className="slider-button next-button" onClick={handleNextSlide}>{">"}</button>
                            </div>
                        </div>
                        {/* 선택된 여행지의 여행사 및 숙소 목록 */}
                        {selectedDestination && (
                            <div className="agency-list">
                                <div className='listHeader'>{selectedDestination.name}의 {selectedTab === 'agencies' ? '여행사' : '숙소'} 목록</div>
                                <div className='listOrderCOn'>
                                    <div  className='listOrderCOn-Name' style={{ marginRight: '874px' }}onClick={toggleNameDropdown}>이름</div>
                                    {isNameDropdownOpen && (
                                        <div style={{border: '1px solid gainsboro', padding: '5px', position: 'absolute',margin:'35px 1141px  0px 60px',borderTop:'none',backgroundColor:'white',zIndex:'99999'}}>
                                            <div className='sortContaBtn' onClick={()=>onSort('ascName')}>가나다순</div>
                                            <div className='sortContaBtn' onClick={()=>onSort('descName')}>가나다 역순</div>
                                        </div>
                                    )}
                                    <div className='listOrderCOn-Name' onClick={togglePriceDropdown}>가격</div>
                                    {isPriceDropdownOpen && (
                                        <div style={{border: '1px solid gainsboro', padding: '5px', position: 'absolute',margin:'35px 128px 0px 60px',borderTop:'none',backgroundColor:'white',zIndex:'99999'}}>
                                            <div className='sortContaBtn' onClick={()=>onSort('ascPrice')}>가격 낮은 순</div>
                                            <div className='sortContaBtn' onClick={()=>onSort('descPrice')}>가격 높은 순</div>
                                        </div>
                                    )}
                                    <div  className='listOrderCOn-Name' onClick={toggleDropdown}>평점</div>
                                    {isDropdownOpen && (
                                        <div style={{border: '1px solid gainsboro', padding: '5px', position: 'absolute',margin:'35px 0px 0px 0px',borderTop:'none',backgroundColor:'white',zIndex:'99999'}}>
                                            <div className='sortContaBtn' onClick={()=>onSort('ascPyong')}>평점 낮은 순</div>
                                            <div className='sortContaBtn' onClick={()=>onSort('descPyong')}>평점 높은 순</div>
                                        </div>
                                    )}
                                </div>
                                <ul>
                                    {(selectedTab === 'agencies' ? selectedDestination.agencies : selectedDestination.accommodations).map((item, index) => (
                                        <li 
                                            key={index} 
                                            onClick={() => selectedTab === 'agencies' ? handleAgencyClick(item) : handleAccommodationClick(item)} // 클릭 시 모달 열기
                                        >   
                                            <div style={{display:'flex'}}>
                                                <div className='nameLoc'>{item.sname}</div>
                                                <div className='priceLoc'>{numeral(item.price).format('0,0')}원</div>
                                                <div className='pyongLoc'>{item.pyong}</div>
                                                {
                                                    userRole === 'ADMIN' && (
                                                        <div className='admLocc'>
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.stopPropagation(); // 상위 li의 클릭 이벤트를 막음
                                                                    deleteDes(item.id);
                                                                }} 
                                                                style={{padding:'2px'}}
                                                            >
                                                                삭제
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* 파트너 가맹점 섹션 */}
            <div className='alignGood'> 
                <div className="partner-agencies">
                    <div className='cpListHeader'>Marry Us와 함께하는 가맹점</div>
                    <div className="slider">
                        <div className="slides">
                            {[cp1, cp2, cp3, cp4, cp5].map((agencyImage, index) => (
                                <div className="slide" key={index}>
                                    <img src={agencyImage} alt={`Agency ${index + 1}`} />
                                    <p className="agency-name"></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* 여행사 모달 */}
            {isModalOpen && (
                <Modal 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    agency={selectedAgency}
                />
            )}
            {/* 숙소 모달 */}
            {isAccommodationModalOpen && (
                <Modal 
                    isOpen={isAccommodationModalOpen} 
                    onClose={closeAccommodationModal} 
                    accommodation={selectedAccommodation}
                />
            )}
        </div>
    );
};
export default OverseasDestinations;
