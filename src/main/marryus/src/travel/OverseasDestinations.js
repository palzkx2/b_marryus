import React, { useState } from 'react';
import './DomesticDestinations.css';  // CSS는 그대로 유지
import imgParis from '../s_images/travel/paris-5933208_1920.jpg';
import imgMaldives from '../s_images/travel/maldives-4532531_1920.jpg';
import imgBali from '../s_images/travel/beach-6026018_1920.jpg';
import imgHawaii from '../s_images/travel/grass-3313518_1920.jpg';
import imgJapan from '../s_images/travel/zurich-3903185_1920.jpg';
import imgThailand from '../s_images/travel/buddhism-5195165_1920.jpg';
import imgNewZealand from '../s_images/travel/england-1106486_1920.jpg';
import imgAustralia from '../s_images/travel/taj-mahal-2309923_1920.jpg';
import GOAT from '../s_images/travel/goat.jpg';
import cp1 from '../s_images/travel/company/13e0a48b-a413-4648-abd9-edd7adacf4bd.png'; 
import cp2 from '../s_images/travel/company/319473e7-6273-4942-ac33-d22ab5e6f0fa.png'; 
import cp3 from '../s_images/travel/company/9bea4115-2258-4089-ab2c-5c880c34b236.png'; 
import cp4 from '../s_images/travel/company/13e0a48b-a413-4648-abd9-edd7adacf4bd.png'; 
import cp5 from '../s_images/travel/company/b4de7f8b-0dc4-4ee2-b83f-b79d7bb7b45d.png'; 
import Sidebar from './Sidebar';
import Modal from './Modal';
import video from '../assets/video/travel.mp4';  // 해외 여행지 비디오

const OverseasDestinations = () => {
    // 전체 여행지 데이터를 준비 (두 번째 코드의 상세 정보 포함)
    const destinations = [
        { 
            name: '파리', 
            description: '로맨틱한 분위기와 예술이 가득한 프랑스 파리입니다.',
            image: imgParis, 
            agencies: [
                { name: '파리 여행사 A', rating: '4.8', price: '150,000원', location: '파리' },
                { name: '파리 여행사 B', rating: '4.7', price: '170,000원', location: '파리' }
            ],
            accommodations: [
                { name: '파리 호텔 A', rating: '4.9', price: '200,000원', location: '파리' },
                { name: '파리 호텔 B', rating: '4.8', price: '220,000원', location: '파리' }
            ] 
        },
        { 
            name: '몰디브', 
            description: '천국 같은 섬, 몰디브에서의 휴식과 로맨스를 경험하세요.',
            image: imgMaldives, 
            agencies: [
                { name: '몰디브 여행사 C', rating: '4.7', price: '300,000원', location: '몰디브' }
            ],
            accommodations: [
                { name: '몰디브 리조트 A', rating: '4.8', price: '350,000원', location: '몰디브' }
            ]
        },
        { 
            name: '발리', 
            description: '자연과 조화를 이루는 발리에서의 특별한 순간을 만들어 보세요.',
            image: imgBali, 
            agencies: [
                { name: '발리 여행사 D', rating: '4.6', price: '250,000원', location: '발리' }
            ],
            accommodations: [
                { name: '발리 리조트 B', rating: '4.7', price: '270,000원', location: '발리' }
            ]
        },
        { 
            name: '하와이', 
            description: '아름다운 해변과 즐길거리가 가득한 하와이에서 힐링하세요.',
            image: imgHawaii, 
            agencies: [
                { name: '하와이 여행사 E', rating: '4.8', price: '350,000원', location: '하와이' }
            ],
            accommodations: [
                { name: '하와이 호텔 C', rating: '4.9', price: '400,000원', location: '하와이' }
            ]
        },
        { 
            name: '일본', 
            description: '일본의 문화와 전통을 경험할 수 있는 특별한 여행을 즐겨보세요.',
            image: imgJapan,
            agencies: [
                { name: '일본 여행사 F', rating: '4.7', price: '180,000원', location: '일본' }
            ],
            accommodations: [
                { name: '도쿄 호텔 D', rating: '4.8', price: '210,000원', location: '도쿄' }
            ]
        },
        { 
            name: '태국', 
            description: '이국적인 풍경과 활기 넘치는 도시, 태국으로의 여행을 즐기세요.',
            image: imgThailand,
            agencies: [
                { name: '태국 여행사 G', rating: '4.6', price: '160,000원', location: '태국' }
            ],
            accommodations: [
                { name: '방콕 호텔 E', rating: '4.7', price: '190,000원', location: '방콕' }
            ]
        },
        { 
            name: '뉴질랜드', 
            description: '아름다운 자연을 배경으로 뉴질랜드에서의 여정을 시작하세요.',
            image: imgNewZealand,
            agencies: [
                { name: '뉴질랜드 여행사 H', rating: '4.8', price: '320,000원', location: '뉴질랜드' }
            ],
            accommodations: [
                { name: '퀸스타운 호텔 F', rating: '4.9', price: '330,000원', location: '퀸스타운' }
            ]
        },
        { 
            name: '호주', 
            description: '호주의 대자연과 도시 탐험을 동시에 즐길 수 있습니다.',
            image: imgAustralia,
            agencies: [
                { name: '호주 여행사 I', rating: '4.7', price: '290,000원', location: '호주' }
            ],
            accommodations: [
                { name: '시드니 호텔 G', rating: '4.8', price: '310,000원', location: '시드니' }
            ]
        },
        { 
            name: '여기도 좋아요', 
            description: '아놀드와 함께 춤을.',
            image: GOAT,
            agencies: [
                { name: '아놀드의 여행사', rating: '4.7', price: '290,000원', location: '호주' }
            ],
            accommodations: [
                { name: '아놀드의 호텔', rating: '4.8', price: '310,000원', location: '시드니' }
            ]
        },
        {
            name: '여기도 좋아요', 
            description: '아놀드와 함께 춤을.',
            image: GOAT,
            agencies: [
                { name: '아놀드의 여행사', rating: '4.7', price: '290,000원', location: '호주' }
            ],
            accommodations: [
                { name: '아놀드의 호텔', rating: '4.8', price: '310,000원', location: '시드니' }
            ]
        },
        { 
            name: '여기도 좋아요', 
            description: '아놀드와 함께 춤을.',
            image: GOAT,
            agencies: [
                { name: '아놀드의 여행사', rating: '4.7', price: '290,000원', location: '호주' }
            ],
            accommodations: [
                { name: '아놀드의 호텔', rating: '4.8', price: '310,000원', location: '시드니' }
            ]
        },
        { 
            name: '여기도 좋아요', 
            description: '아놀드와 함께 춤을.',
            image: GOAT,
            agencies: [
                { name: '아놀드의 여행사', rating: '4.7', price: '290,000원', location: '호주' }
            ],
            accommodations: [
                { name: '아놀드의 호텔', rating: '4.8', price: '310,000원', location: '시드니' }
            ]
        },
        { 
            name: '여기도 좋아요2', 
            description: '아놀드와 함께 춤을.',
            image: GOAT,
            agencies: [
                { name: '아놀드의 여행사', rating: '4.7', price: '290,000원', location: '호주' }
            ],
            accommodations: [
                { name: '아놀드의 호텔', rating: '4.8', price: '310,000원', location: '시드니' }
            ]
        },
        { 
            name: '여기도 좋아요2', 
            description: '아놀드와 함께 춤을.',
            image: GOAT,
            agencies: [
                { name: '아놀드의 여행사', rating: '4.7', price: '290,000원', location: '호주' }
            ],
            accommodations: [
                { name: '아놀드의 호텔', rating: '4.8', price: '310,000원', location: '시드니' }
            ]
        },
        { 
            name: '여기도 좋아요2', 
            description: '아놀드와 함께 춤을.',
            image: GOAT,
            agencies: [
                { name: '아놀드의 여행사', rating: '4.7', price: '290,000원', location: '호주' }
            ],
            accommodations: [
                { name: '아놀드의 호텔', rating: '4.8', price: '310,000원', location: '시드니' }
            ]
        },
        { 
            name: '그 외', 
            description: '아놀드와 함께 춤을.',
            image: imgAustralia,
            agencies: [
                { name: '아놀드의 여행사', rating: '4.7', price: '290,000원', location: '호주' }
            ],
            accommodations: [
                { name: '아놀드의 호텔', rating: '4.8', price: '310,000원', location: '시드니' }
            ]
        }
    ];

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
    const [selectedTab, setSelectedTab] = useState('agencies');
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
                                            <h2>{destination.name}</h2>
                                            <p className="destination-description">{destination.description}</p>
                                            <div style={{ display: 'flex', padding: '10px', margin: '10px' }}>
                                                <div className='catcat'>
                                                    <button onClick={() => handleTabChange('agencies')}>여행사 목록</button>
                                                </div>
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
                        {/* 검색창 추가 */}
                        {/* 선택된 여행지의 여행사 및 숙소 목록 */}
                        {selectedDestination && (
                            <div className="agency-list">
                                <div className='listHeader'>{selectedDestination.name}의 {selectedTab === 'agencies' ? '여행사' : '숙소'} 목록</div>
                                <div className='listOrderCOn'>
                                    <div className='listOrderCOn-Name' style={{ marginRight: '874px' }}>이름</div>
                                    <div className='listOrderCOn-Name'>가격</div>
                                    <div className='listOrderCOn-Name'>평점</div>
                                </div>
                                <ul>
                                    {(selectedTab === 'agencies' ? selectedDestination.agencies : selectedDestination.accommodations).map((item, index) => (
                                        <li 
                                            key={index} 
                                            onClick={() => selectedTab === 'agencies' ? handleAgencyClick(item) : handleAccommodationClick(item)} // 클릭 시 모달 열기
                                        >
                                            {item.name}
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
