import React, { useEffect, useState } from 'react';
import './WeddingHall.css'
import { TbHeartQuestion, TbMapPinHeart } from "react-icons/tb";
import { GiBookmarklet } from "react-icons/gi";
import { GrCompare, GrSort } from "react-icons/gr";
import { BsSearchHeart } from "react-icons/bs";
import proData from './proData';
import WeddingHallItem from './WeddingHallItem';
import { TiArrowDownOutline, TiArrowUpOutline } from 'react-icons/ti';
import { RxDoubleArrowDown, RxDoubleArrowUp } from 'react-icons/rx';
import { Link, Route, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import WeddingHallArticle from './WeddingHallArticle';
import Bar from './mypage/Bar';
import loginImg from '../s_images/weddingHall/wdHallBar1.jpg'
import axios from 'axios';
import regions from './regionsData'

const WeddingHall = () => {

    const [page,setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [name,setName] = useState('')
    const [images,setImages] = useState([]);
    const [results,setResults] = useState([])
    const history = useHistory()
    const location = useLocation()

    const pageNumbers = [];

    for(let i=1;i<=totalPages;i++){
        pageNumbers.push(i);
    }

    // 페이지 로드시 쿼리 파라미터로 전달된 페이지 번호 확인
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const pageQueryParam = queryParams.get('page');
        const nameQueryParam = queryParams.get('name');

        setPage(Number(pageQueryParam) || 0); // 쿼리 파라미터가 없으면 0 페이지로 설정
        setName(nameQueryParam || '');

        // 페이지네이션과 검색어에 따라 데이터 불러오기
        fetchImages(nameQueryParam, Number(pageQueryParam) || 0);
    }, [location]);

    const fetchImages = async (searchTerm, currentPage) => {

        try {
            let response;
    
            if (searchTerm && searchTerm.trim() !== '') {
                response = await axios.get(`/api/searchWeddingHall?name=${searchTerm}&page=${currentPage}&size=9`);
            } else {
                response = await axios.get(`/api/images?page=${currentPage}&size=9`);
            }
    
            if (response.data && response.data.content) {
                setImages(response.data.content);
                setTotalPages(response.data.totalPages);
            } else {
                console.error('예상한 데이터 구조가 아닙니다:', response.data);
            }
        } catch (error) {
            console.error('이미지 가져오기 실패:', error);
        }

    }

    useEffect(() => {
        fetchImages();
    }, [page])

    // 페이지 변경 함수
    const handlePageChange = (pageNumber) => {
        history.push(`/weddingHall?name=${encodeURIComponent(name)}&page=${pageNumber}`);
    };

    const searchBtn = async () => {
        setPage(0);
        history.push(`/weddingHall?name=${encodeURIComponent(name)}&page=0`);
    }

    useEffect(() => {
        if(name.trim() !== ''){
            searchBtn();
        }
    }, [])

    //삭제 버튼
    const deleteImage = async (imgPath) => {

        const confirmed = window.confirm('웨딩홀을 삭제하시겠습니까?')

        if(confirmed){

            try{
                console.error('imgPath불러옴-------------------',imgPath)
                await axios.delete(`/api/deleteWeddingHall?imgPath=${encodeURIComponent(imgPath)}`,{method: 'DELETE'})
                setImages(prevImages => prevImages.filter(image => image.imgPath !== imgPath));
                setResults(prevResults => prevResults.filter(image => image.imgPath !== imgPath));

                await fetchImages();

                alert('웨딩홀이 삭제되었습니다.')
                console.log('이미지 삭제 성공')

                window.location.reload()

            }catch(error){
                console.error('이미지 삭제 실패: ',error)
            }

        }else{
            alert('삭제가 취소되었습니다.')
        }

    }

    // 키 입력 감지 함수
    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchBtn();
        }
    };

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
                            <input className='searchBox' type='text' placeholder='웨딩홀 및 태그를 검색해 보세요' value={name} onChange={(e) => setName(e.target.value)} onKeyDown={enterKeyPress}/>
                            <div className='searchBoxIcon'>
                                <button onClick={searchBtn} style={{background:'none', border:'none'}}>
                                    <BsSearchHeart style={{color:'gray'}}/>
                                </button>
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
                {
                    userRole === 'ADMIN' &&
                    <div style={{display:'flex', justifyContent:'end', alignContent:'end', marginTop:'15px'}}>
                        <Link to='/insertWeddingHall'><button style={{padding:'15px'}}>추가</button></Link>
                    </div>
                }
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
                    총 {images.length}개의 상품이 검색되었습니다.&nbsp;&nbsp;&nbsp;
                    <a href='#'><GrSort /></a>
                    </div>                  
                </div>
                <div className='header allProductHr'/>
                {/* 게시판 헤더 */}
                <div style={{all:'initial',display:'flex',flexWrap:'wrap',overflow:'auto',backgroundColor:'whitesmoke',alignContent:'center',marginTop:'10px',margin:'10px',padding:'10px'}}>
                    {
                        images.map((item,index)=>
                            
                            <div className='itemContainer' key={index}>
                                <Link to={`/wdArticle/${item.name}?page=${page}`} className='toArticle'>
                                    <WeddingHallItem key={index} item={item}/>
                                </Link>
                                {
                                    userRole === 'ADMIN' &&
                                    <div style={{marginLeft:'15px', marginTop:'10px'}}>
                                        <button style={{marginRight:'5px', padding:'5px'}}>수정</button>
                                        <button style={{padding:'5px'}} onClick={() => deleteImage(item.imgPath)}>삭제</button>
                                    </div>
                                }
                            </div>
                        )
                    }
                </div>
                <div>
                    <button onClick={() => handlePageChange(0)} disabled={page === 0}>&lt;&lt;</button>
                    <button onClick={() => handlePageChange(Math.max(page - 1, 0))} disabled={page === 0}>&lt;</button>
                    
                    {
                        pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number - 1)} // 0부터 시작하는 인덱스에 맞춰 조정
                                style={{ fontWeight: page === number - 1 ? 'bold' : 'normal' }}
                            >
                                {number}
                            </button>
                        ))
                    }
                    <button onClick={() => handlePageChange(Math.min(page + 1, totalPages - 1))} disabled={page === totalPages - 1}>&gt;</button>
                    <button onClick={() => handlePageChange(totalPages - 1)} disabled={page === totalPages - 1}>&gt;&gt;</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default WeddingHall;