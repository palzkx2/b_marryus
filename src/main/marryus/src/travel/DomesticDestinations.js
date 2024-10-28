import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import numeral from 'numeral';

const OverseasDestinations = () => {
    // 전체 여행지 데이터를 준비 (두 번째 코드의 상세 정보 포함)
    const [destinations, setDestinations] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/readSukso');
                const accommodationsData = response.data; // API에서 숙소 데이터를 가져옴

                const destinationsData = [
                    { 
                        name: '제주도', 
                        description: '아름다운 자연과 해변이 있는 제주도에서 특별한 추억을 만들어 보세요.',
                        image: imgParis, 
                        agencies: [
                            { name: '제주 여행사 A', rating: '4.8', price: '200,000원', location: '제주도' },
                            { name: '제주 여행사 B', rating: '4.7', price: '220,000원', location: '제주도' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '제주도') // 제주도 숙소만 필터링
                    },
                    { 
                        name: '강릉', 
                        description: '자연경관과 맛있는 음식이 있는 강릉에서 힐링하세요.',
                        image: imgParis, 
                        agencies: [
                            { name: '강릉 여행사 C', rating: '4.7', price: '180,000원', location: '강릉' }
                        ],
                        accommodations: accommodationsData.filter(accommodation => accommodation.place === '강릉') // 강릉 숙소만 필터링
                    },
                    { 
                        name: '부산', 
                        description: '해양 도시 부산에서 즐거운 시간을 보내세요.',
                        image: imgParis, 
                        agencies: [
                            { name: '부산 여행사 D', rating: '4.6', price: '170,000원', location: '부산' }
                        ],
                        accommodations: [
                            { name: '부산 리조트 B', rating: '4.7', price: '210,000원', location: '부산' }
                        ]
                    },
                    { 
                        name: '여수', 
                        description: '바다와 섬이 어우러진 여수에서 로맨틱한 시간을 만끽하세요.',
                        image: imgParis, 
                        agencies: [
                            { name: '여수 여행사 E', rating: '4.8', price: '250,000원', location: '여수' }
                        ],
                        accommodations: [
                            { name: '여수 리조트 C', rating: '4.9', price: '280,000원', location: '여수' }
                        ]
                    },
                    { 
                        name: '경주', 
                        description: '역사와 문화가 숨쉬는 경주에서 특별한 순간을 경험하세요.',
                        image: imgParis,
                        agencies: [
                            { name: '경주 여행사 F', rating: '4.7', price: '160,000원', location: '경주' }
                        ],
                        accommodations: [
                            { name: '경주 호텔 D', rating: '4.8', price: '210,000원', location: '경주' }
                        ]
                    },
                    { 
                        name: '속초', 
                        description: '청정 자연이 가득한 속초에서 휴식을 취해 보세요.',
                        image: imgParis,
                        agencies: [
                            { name: '속초 여행사 G', rating: '4.6', price: '150,000원', location: '속초' }
                        ],
                        accommodations: [
                            { name: '속초 호텔 E', rating: '4.7', price: '190,000원', location: '속초' }
                        ]
                    },
                    { 
                        name: '남해', 
                        description: '아름다운 바다와 경치를 자랑하는 남해에서 즐거운 시간을 보내세요.',
                        image: imgParis,
                        agencies: [
                            { name: '남해 여행사 H', rating: '4.8', price: '300,000원', location: '남해' }
                        ],
                        accommodations: [
                            { name: '남해 리조트 F', rating: '4.9', price: '350,000원', location: '남해' }
                        ]
                    },
                    { 
                        name: '거제', 
                        description: '섬의 매력을 느낄 수 있는 거제에서 특별한 경험을 해보세요.',
                        image: imgParis,
                        agencies: [
                            { name: '거제 여행사 I', rating: '4.7', price: '280,000원', location: '거제' }
                        ],
                        accommodations: [
                            { name: '거제 호텔 G', rating: '4.8', price: '310,000원', location: '거제' }
                        ]
                    },
                    { 
                        name: '포항', 
                        description: '자연과 도시가 어우러진 포항에서 즐거운 여행을 만끽하세요.',
                        image: imgParis,
                        agencies: [
                            { name: '포항 여행사 J', rating: '4.6', price: '160,000원', location: '포항' }
                        ],
                        accommodations: [
                            { name: '포항 호텔 H', rating: '4.7', price: '200,000원', location: '포항' }
                        ]
                    },
                    { 
                        name: '춘천', 
                        description: '호수와 자연이 아름다운 춘천에서 평화로운 시간을 가져보세요.',
                        image: imgParis,
                        agencies: [
                            { name: '춘천 여행사 K', rating: '4.8', price: '220,000원', location: '춘천' }
                        ],
                        accommodations: [
                            { name: '춘천 호텔 I', rating: '4.9', price: '250,000원', location: '춘천' }
                        ]
                    },
                    { 
                        name: '전주', 
                        description: '전통과 현대가 조화로운 전주에서 특별한 경험을 해보세요.',
                        image: imgParis,
                        agencies: [
                            { name: '전주 여행사 L', rating: '4.7', price: '190,000원', location: '전주' }
                        ],
                        accommodations: [
                            { name: '전주 호텔 J', rating: '4.8', price: '210,000원', location: '전주' }
                        ]
                    },
                    { 
                        name: '상주', 
                        description: '아름다운 자연 경관과 함께 상주에서 특별한 여정을 즐기세요.',
                        image: imgParis,
                        agencies: [
                            { name: '상주 여행사 M', rating: '4.6', price: '150,000원', location: '상주' }
                        ],
                        accommodations: [
                            { name: '상주 호텔 K', rating: '4.7', price: '180,000원', location: '상주' }
                        ]
                    },
                    { 
                        name: '김해', 
                        description: '역사와 문화가 어우러진 김해에서 특별한 시간을 가져보세요.',
                        image: imgParis,
                        agencies: [
                            { name: '김해 여행사 N', rating: '4.8', price: '200,000원', location: '김해' }
                        ],
                        accommodations: [
                            { name: '김해 호텔 L', rating: '4.9', price: '230,000원', location: '김해' }
                        ]
                    },
                    { 
                        name: '동해', 
                        description: '푸른 바다와 깨끗한 공기가 가득한 동해에서 여유로운 시간을 만끽하세요.',
                        image: imgParis,
                        agencies: [
                            { name: '동해 여행사 O', rating: '4.6', price: '170,000원', location: '동해' }
                        ],
                        accommodations: [
                            { name: '동해 리조트 M', rating: '4.8', price: '220,000원', location: '동해' }
                        ]
                    },
                    { 
                        name: '이천', 
                        description: '자연과 문화가 어우러진 이천에서 특별한 여정을 떠나세요.',
                        image: imgParis,
                        agencies: [
                            { name: '이천 여행사 P', rating: '4.7', price: '160,000원', location: '이천' }
                        ],
                        accommodations: [
                            { name: '이천 호텔 N', rating: '4.8', price: '180,000원', location: '이천' }
                        ]
                    },
                    { 
                        name: '포천', 
                        description: '아름다운 자연과 함께하는 포천에서 힐링의 시간을 가지세요.',
                        image: imgParis,
                        agencies: [
                            { name: '포천 여행사 Q', rating: '4.6', price: '140,000원', location: '포천' }
                        ],
                        accommodations: [
                            { name: '포천 리조트 O', rating: '4.7', price: '160,000원', location: '포천' }
                        ]
                    },
                    { 
                        name: '거창', 
                        description: '자연과 함께하는 거창에서 편안한 여정을 즐기세요.',
                        image: imgParis,
                        agencies: [
                            { name: '거창 여행사 R', rating: '4.8', price: '170,000원', location: '거창' }
                        ],
                        accommodations: [
                            { name: '거창 호텔 P', rating: '4.9', price: '200,000원', location: '거창' }
                        ]
                    },
                    { 
                        name: '해남', 
                        description: '해남의 아름다운 자연에서 여유로운 시간을 보내세요.',
                        image: imgParis,
                        agencies: [
                            { name: '해남 여행사 S', rating: '4.6', price: '180,000원', location: '해남' }
                        ],
                        accommodations: [
                            { name: '해남 리조트 Q', rating: '4.7', price: '210,000원', location: '해남' }
                        ]
                    },
                    { 
                        name: '화천', 
                        description: '자연이 숨쉬는 화천에서 특별한 여정을 떠나세요.',
                        image: imgParis,
                        agencies: [
                            { name: '화천 여행사 T', rating: '4.8', price: '220,000원', location: '화천' }
                        ],
                        accommodations: [
                            { name: '화천 호텔 R', rating: '4.9', price: '250,000원', location: '화천' }
                        ]
                    },
                    { 
                        name: '양양', 
                        description: '아름다운 바다와 산이 있는 양양에서 잊지 못할 순간을 즐기세요.',
                        image: imgParis,
                        agencies: [
                            { name: '양양 여행사 U', rating: '4.7', price: '190,000원', location: '양양' }
                        ],
                        accommodations: [
                            { name: '양양 리조트 S', rating: '4.8', price: '230,000원', location: '양양' }
                        ]
                    },
                    { 
                        name: '고양', 
                        description: '문화와 예술이 살아있는 고양에서 특별한 여행을 경험하세요.',
                        image: imgParis,
                        agencies: [
                            { name: '고양 여행사 V', rating: '4.6', price: '160,000원', location: '고양' }
                        ],
                        accommodations: [
                            { name: '고양 호텔 T', rating: '4.7', price: '190,000원', location: '고양' }
                        ]
                    },
                    { 
                        name: '수원', 
                        description: '역사가 숨쉬는 수원에서 특별한 시간을 가져보세요.',
                        image: imgParis,
                        agencies: [
                            { name: '수원 여행사 W', rating: '4.8', price: '200,000원', location: '수원' }
                        ],
                        accommodations: [
                            { name: '수원 리조트 U', rating: '4.9', price: '220,000원', location: '수원' }
                        ]
                    },
                    { 
                        name: '그 외', 
                        description: '역사가 숨쉬는 수원에서 특별한 시간을 가져보세요.',
                        image: imgParis,
                        agencies: [
                            { name: '수원 여행사 W', rating: '4.8', price: '200,000원', location: '수원' }
                        ],
                        accommodations: [
                            { name: '수원 리조트 U', rating: '4.9', price: '220,000원', location: '수원' }
                        ]
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
                            <h1 className='sh1' style={{ padding: '20px', color: 'white' }}>국내 신혼 여행지</h1>
                            <p style={{ padding: '20px' }}>특별한 순간을 위한 국내 여행지를 찾으세요!</p>
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
                                            <div style={{display:'flex'}}>
                                                <div className='nameLoc'>{item.sname}</div>
                                                <div className='priceLoc'>{numeral(item.price).format('0,0')}원</div>
                                                <div className='pyongLoc'>{item.pyong}</div>
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
