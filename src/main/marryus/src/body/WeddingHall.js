import React, { useState } from 'react';
import './WeddingHall.css'
import { TbHeartQuestion, TbMapPinHeart } from "react-icons/tb";
import { GiBookmarklet } from "react-icons/gi";
import { GrCompare, GrSort } from "react-icons/gr";
import { BsSearchHeart } from "react-icons/bs";
import proData from './proData';
import WeddingHallItem from './WeddingHallItem';
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti';
import { RxDoubleArrowDown, RxDoubleArrowUp } from 'react-icons/rx';
import { Link, Route } from 'react-router-dom/cjs/react-router-dom.min';
import WeddingHallArticle from './WeddingHallArticle';
import Bar from './mypage/Bar';
import loginImg from '../s_images/weddingHall/wdHallBar1.jpg'




const WeddingHall = () => {

    const regions = {
        "강원도": [
            "춘천",
            "강릉",
            "속초",
            "원주",
            "동해",
            "삼척",
            "태백",
            "횡성",
            "영월",
            "평창",
            "정선",
            "철원",
            "화천",
            "양구",
            "인제",
            "고성",
            "양양"
        ],
        "경기도": [
            "수원",
            "고양",
            "성남",
            "용인",
            "부천",
            "안양",
            "화성",
            "광명",
            "시흥",
            "평택",
            "의정부",
            "안산",
            "파주",
            "여주",
            "김포",
            "이천",
            "포천",
            "하남",
            "오산",
            "구리"
        ],
        "경상남도": [
            "부산",
            "창원",
            "김해",
            "양산",
            "진주",
            "사천",
            "거제",
            "밀양",
            "통영",
            "남해",
            "하동",
            "의령",
            "함안",
            "창녕",
            "산청",
            "지리산"
        ],
        "경상북도": [
            "포항",
            "구미",
            "경주",
            "안동",
            "영주",
            "영천",
            "상주",
            "문경",
            "칠곡",
            "예천",
            "봉화",
            "울진",
            "울릉",
            "청송",
            "성주",
            "고령"
        ],
        "전라남도": [
            "광주",
            "여수",
            "순천",
            "목포",
            "나주",
            "담양",
            "장성",
            "화순",
            "강진",
            "영암",
            "무안",
            "신안",
            "함평",
            "영광",
            "해남",
            "완도"
        ],
        "전라북도": [
            "전주",
            "익산",
            "군산",
            "정읍",
            "남원",
            "김제",
            "완주",
            "고창",
            "부안",
            "진안",
            "무주",
            "장수",
            "임실",
            "순창",
            "진안"
        ],
        "충청남도": [
            "천안",
            "아산",
            "서산",
            "논산",
            "계룡",
            "당진",
            "공주",
            "예산",
            "홍성",
            "보령",
            "서천",
            "태안",
            "청양",
            "부여",
            "금산"
        ],
        "충청북도": [
            "청주",
            "충주",
            "제천",
            "괴산",
            "음성",
            "진천",
            "단양",
            "보은",
            "영동",
            "증평",
            "상당"
        ],
        "서울특별시": [
            "종로구",
            "중구",
            "용산구",
            "성동구",
            "광진구",
            "동대문구",
            "중랑구",
            "성북구",
            "강북구",
            "도봉구",
            "노원구",
            "은평구",
            "서대문구",
            "마포구",
            "양천구",
            "강서구",
            "구로구",
            "금천구",
            "영등포구",
            "동작구",
            "관악구",
            "서초구",
            "강남구",
            "송파구",
            "강동구"
        ],
        "부산광역시": [
            "중구",
            "서구",
            "동구",
            "영도구",
            "부산진구",
            "동래구",
            "남구",
            "해운대구",
            "사하구",
            "금정구",
            "강서구",
            "연제구",
            "수영구",
            "사상구",
            "기장군"
        ],
        "대구광역시": [
            "중구",
            "동구",
            "서구",
            "남구",
            "북구",
            "수성구",
            "달서구",
            "달성군"
        ],
        "대전광역시": [
            "중구",
            "동구",
            "서구",
            "유성구",
            "대덕구"
        ],
        "광주광역시": [
            "동구",
            "서구",
            "남구",
            "북구",
            "광산구"
        ],
        "세종특별자치시": [
            "세종시"
        ],
        "울산광역시": [
            "남구",
            "북구",
            "중구",
            "울주군"
        ],
        "인천광역시": [
            "중구",
            "동구",
            "미추홀구",
            "연수구",
            "남동구",
            "부평구",
            "계양구",
            "서구"
        ],
        "제주특별자치도": [
            "제주시",
            "서귀포시"
        ]
    }

    const [selectedRegion, setSelectedRegion] = useState('시/도를 선택해주세요');
    const [subRegions, setSubRegions] = useState([]);

    const handleRegionChange = (event) => {
        const region = event.target.value;
        setSelectedRegion(region);
        setSubRegions(regions[region] || []); // 선택된 지역에 따른 세부 행정구역 설정
      };

    const [data,setData] = useState(proData)

    //토글 디테입
    const [isOpen, setIsOpen] = useState(false); // 열림 상태 관리

    // 열림/닫힘 상태를 토글하는 함수
    const toggleDetails = () => {
        setIsOpen(!isOpen);
    };

        // 기존 코드 생략...

        const [isOpenRegion, setIsOpenRegion] = useState(false);
        const [isOpenPrice, setIsOpenPrice] = useState(false);
        const [isOpenMeal, setIsOpenMeal] = useState(false);
        const [isOpenCost, setIsOpenCost] = useState(false);
        const [isOpenCeremony, setIsOpenCeremony] = useState(false);
        const [isOpenGuarantee, setIsOpenGuarantee] = useState(false);
    
        // 각각의 토글 함수
        const toggleRegion = () => setIsOpenRegion(!isOpenRegion);
        const togglePrice = () => setIsOpenPrice(!isOpenPrice);
        const toggleMeal = () => setIsOpenMeal(!isOpenMeal);
        const toggleCost = () => setIsOpenCost(!isOpenCost);
        const toggleCeremony = () => setIsOpenCeremony(!isOpenCeremony);
        const toggleGuarantee = () => setIsOpenGuarantee(!isOpenGuarantee);

  


    return (
        <div style={{justifyContent:'center', alignContent:'center'}}>
             <div style={{margin:'auto',width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
             </div>   
        <div className='mainContainer' style={{margin:'auto',display:'flex', justifyContent:'center', alignContent:'center'}}>
            
            {/* 왼쪽 카테고리,검색 */}
            <div className='header' >
                {/* 웨딩홀 */}
                <div className='LocationSearchSticky'>
                <div>
                    <div className='headerSubject'>웨딩홀</div>
                    <div className='searchBox-container'>
                        <input className='searchBox' type='text' placeholder='웨딩홀 및 태그를 검색해 보세요'/>
                        <div className='searchBoxIcon'>
                            <a href='#'>
                                <BsSearchHeart style={{color:'gray'}}/>
                            </a>
                        </div>
                    </div>
                    </div>
                    <div className='letCategory' style={{borderTop:'3px solid  rgb(76, 126, 20)'}}>
                        전체보기
                        <div className='gt' style={{paddingLeft:'137px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory'>
                        웨딩홀
                        <div className='gt' style={{paddingLeft:'149px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory'>
                        호텔
                        <div className='gt' style={{paddingLeft:'161px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory'>
                        하우스
                        <div className='gt' style={{paddingLeft:'149px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory'>
                        스몰(100명 이하)
                        <div className='gt' style={{paddingLeft:'93px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory'>
                        야외 웨딩홀
                        <div className='gt' style={{paddingLeft:'121px'}}>&gt;</div>
                    </div>
                    
                    {/* 웨딩홀 end*/}

                  {/* 지역검색 */}
                    <div className='headerSubject' style={{marginBottom:'10px',marginTop:'30px'}}>지역 검색</div>

                        <details open={isOpenRegion} style={{borderTop:'3px solid  rgb(76, 126, 20)'}}>
                            <summary className='letCategory' onClick={toggleRegion}>
                                지역검색
                                <p style={{marginRight:'125px'}}></p>
                                {isOpenRegion ? <RxDoubleArrowDown className='arrowIcon' /> : <RxDoubleArrowUp className='arrowIcon' />}
                            </summary>

                            <select className='letCategory scoption' onChange={handleRegionChange} style={{borderTop:'none'}}>
                                <option>-- 시/도를 선택해주세요 --</option>
                                {Object.keys(regions).map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            
                            {/* 선택된 지역에 따른 세부 행정구역 선택 */}
                            {selectedRegion !== '-- 시/도를 선택해주세요 --' && (
                                <select className='letCategory scoption' style={{borderTop:'none'}}>
                                    <option>-- 세부 행정구역을 선택해주세요 --</option>
                                    {subRegions.map(subRegion => (
                                        <option key={subRegion} value={subRegion}>{subRegion}</option>
                                    ))}
                                </select>
                            )}
                        </details>

                        {/* 가격대별 검색 */}
                        <details open={isOpenPrice}>
                            <summary className='letCategory' onClick={togglePrice}>
                                가격대별 검색
                                <p style={{ marginRight: '100px' }}></p>
                                {isOpenPrice ? <RxDoubleArrowDown className='arrowIcon' /> : <RxDoubleArrowUp className='arrowIcon' />}
                            </summary>
                            <select className='letCategory scoption' style={{ borderTop: 'none' }}>
                                <option>-- 가격대 선택 --</option>
                                <option value="1">1,000,000원 이하</option>
                                <option value="2">1,000,000원 ~ 2,000,000원</option>
                                <option value="3">2,000,000원 ~ 3,000,000원</option>
                                <option value="4">3,000,000원 ~ 4,000,000원</option>
                                <option value="5">4,000,000원 이상</option>
                            </select>
                        </details>

                        {/* 식사종류별 검색 */}
                        <details open={isOpenMeal}>
                            <summary className='letCategory' onClick={toggleMeal}>
                                식사종류별 검색
                                <p style={{marginRight:'87px'}}></p>
                                {isOpenMeal ? <RxDoubleArrowDown className='arrowIcon' /> : <RxDoubleArrowUp className='arrowIcon' />}
                            </summary>
                            <select className='letCategory scoption' style={{ borderTop: 'none' }}>
                                <option>-- 식사 종류 선택 --</option>
                                <option value="1">한식</option>
                                <option value="2">중식</option>
                                <option value="3">양식</option>
                                <option value="4">뷔페</option>
                            </select>              
                        </details>

                        {/* 식대별 검색 */}
                        <details open={isOpenCost}>
                            <summary className='letCategory' onClick={toggleCost}>
                                식대별 검색
                                <p style={{marginRight:'112px'}}></p>
                                {isOpenCost ? <RxDoubleArrowDown className='arrowIcon' /> : <RxDoubleArrowUp className='arrowIcon' />}
                            </summary>
                            <select className='letCategory scoption' style={{ borderTop: 'none' }}>
                                <option>-- 식대 선택 --</option>
                                <option value="1">50,000원 미만</option>
                                <option value="2">50,000원 ~ 70,000원</option>
                                <option value="3">70,000원 ~ 80,000원</option>
                                <option value="4">80,000원 ~ 90,000원</option>
                                <option value="5">100,000원 이상</option>
                            </select>           
                        </details>

                        {/* 예식 종류별 검색 */}
                        <details open={isOpenCeremony}>
                            <summary className='letCategory' onClick={toggleCeremony}>
                                예식 종류별 검색
                                <p style={{marginRight:'83px'}}></p>
                                {isOpenCeremony ? <RxDoubleArrowDown className='arrowIcon' /> : <RxDoubleArrowUp className='arrowIcon' />}
                            </summary>
                            <select className='letCategory scoption' style={{ borderTop: 'none' }}>
                                <option>-- 예식 종류 선택 --</option>
                                <option value="1">전통혼례</option>
                                <option value="2">웨딩홀 예식</option>
                                <option value="3">야외 예식</option>
                                <option value="4">스몰 웨딩</option>
                            </select>               
                        </details>

                        {/* 보증인원별 검색 */}
                        <details open={isOpenGuarantee}>
                            <summary className='letCategory' onClick={toggleGuarantee}>
                                보증인원별 검색
                                <p style={{marginRight:'86px'}}></p>
                                {isOpenGuarantee ? <RxDoubleArrowDown className='arrowIcon' /> : <RxDoubleArrowUp className='arrowIcon' />}
                            </summary>
                            <select className='letCategory scoption' style={{ borderTop: 'none' }}>
                                <option>-- 보증 인원 선택 --</option>
                                <option value="1">50명 미만</option>
                                <option value="2">50명 ~ 100명</option>
                                <option value="3">100명 ~ 150명</option>
                                <option value="4">150명 ~ 200명</option>
                                <option value="4">200명 ~ 300명</option>
                                <option value="5">400명 이상</option>
                            </select>              
                        </details>
                        
                        
                    </div>
                    {/* 지역검색 end */}
                    
                    
                </div>
                {/* 왼쪽 카테고리,검색 end */}

                

                {/* 헤드라인 */}
                <div className='header' style={{width:'1000px'}}>
                            
                {/* 기능별 (지도,섭외,비교) 카테고리 */}
                <div className='functionByContainer' >
                    {/* 홀 지도 */}
                    <a href='#'>
                        <div className='functionBySection'>
                            <TbMapPinHeart  className='functionByIcon' />
                            홀 지도
                            <div className='sub'>
                                웨딩홀, 지도로 한눈에!
                            </div>
                        </div>
                    </a>

                    {/* 홀 섭외 */}
                    <a href='#'>
                        <div className='functionBySection'>
                            <GiBookmarklet className='functionByIcon' />
                            홀 섭외
                            <div className='sub'>
                                웨딩홀 섭외리스트 신청
                            </div>
                        </div>
                    </a>

                    {/* 홀 vs 홀 */}
                    <a href='#'>
                    <div className='functionBySection'>
                        <GrCompare className='functionByIcon' />
                        홀 vs 홀
                        <div className='sub'>
                            홀 vs 홀
                        </div>
                    </div>
                    </a>

                    {/*  AI 기반 테마 및 스타일 추천 */}
                    <a href='#'>
                        <div className='functionBySection'>
                            <TbHeartQuestion className='functionByIcon' />
                            나만의 웨딩홀
                            <div className='sub'>
                                AI 기반 테마 및 스타일 추천
                            </div>
                        </div>
                    </a>

                </div>
            {/*  기능별 카테고리 END */}

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
                                <Link to={`/wdArticle/${item.name}`} className='toArticle'>
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

export default WeddingHall;