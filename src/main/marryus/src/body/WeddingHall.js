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

    const [name, setName] = useState('');
    const [images, setImages] = useState([]);
    const [results, setResults] = useState([]);
    const [category, setCategory] = useState('');
    const [sortType, setSortType] = useState('');
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setName(queryParams.get('name') || '');
        queryParams.delete('page');
    }, [location]);

    const fetchImages = async () => {

        try {
            const response = await axios.get('/api/images');
            if (response.data) {
                setImages(response.data);
            } else {
                console.error('예상한 데이터 구조가 아닙니다:', response.data);
            }

        } catch (error) {
            console.error('이미지 가져오기 실패:', error);
        }
        
    };

    const searchBtn = async () => {
        setCategory(''); 
        setSortType(''); 

        await fetchImages(name, '', '');
        history.push(`/weddingHall?name=${encodeURIComponent(name)}`);
    };

    // 초기 데이터 가져오기
    useEffect(() => {

        const fetchData = async () => {
            if (name.trim() !== '') {
                await fetchImages(name);
            } else {
                await fetchImages();
            }
        };
        fetchData();
    }, [category, sortType]); // 의존성 배열 설정

    // 삭제 버튼
    const deleteImage = async (imgPath) => {
        const confirmed = window.confirm('웨딩홀을 삭제하시겠습니까?');

        if (confirmed) {
            try {
                console.error('imgPath불러옴-------------------', imgPath);
                await axios.delete(`/api/deleteWeddingHall?imgPath=${encodeURIComponent(imgPath)}`, { method: 'DELETE' });
                setImages(prevImages => prevImages.filter(image => image.imgPath !== imgPath));
                setResults(prevResults => prevResults.filter(image => image.imgPath !== imgPath));

                await fetchImages();

                alert('웨딩홀이 삭제되었습니다.');
                console.log('이미지 삭제 성공');

                window.location.reload();
            } catch (error) {
                console.error('이미지 삭제 실패: ', error);
            }
        } else {
            alert('삭제가 취소되었습니다.');
        }
    };

    // 키 입력 감지 함수
    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchBtn();
        }
    };

    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get('/api/session', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
                console.log('세션 정보 : ', response.data);
                setUserRole(response.data.userRole); // 세션 정보를 상태에 저장
            } catch (error) {
                console.error('세션 정보 가져오기 실패:', error);
            }
        };

        fetchSessionData();
    }, []);

    useEffect(() => {
        if (location.search.includes('name=')) {
            setName(''); // URL에 name이 있을 때 입력 필드 비우기
        }
    }, [location.search]);

    // 필터 및 정렬을 동시에 적용하는 함수
    const applyFilterAndSort = (selectedCategory, selectedSort) => {
        let filteredImages = [...images];
    
        if (selectedCategory) {
            filteredImages = filteredImages.filter(image => image.imgType === selectedCategory);
        }
    
        let sortedImages = [...filteredImages];
    
        if (selectedSort === 'lowPrice') {
            sortedImages.sort((a, b) => a.price - b.price);
        } else if (selectedSort === 'highPrice') {
            sortedImages.sort((a, b) => b.price - a.price);
        } else if (selectedSort === 'rating') {
            sortedImages.sort((a, b) => b.rating - a.rating);
        } else if (selectedSort === 'newest') {
            sortedImages.sort((a, b) => new Date(b.created) - new Date(a.created));
        }
    
        if (JSON.stringify(sortedImages) !== JSON.stringify(images)) {
            setImages(sortedImages);  // 상태 변경이 있을 때만 업데이트
        }
    };

    // 카테고리 변경 시 호출
    const onCategory = (selectedCategory) => {
        setCategory(selectedCategory);
        setSortType(''); // 정렬 기준 초기화
        applyFilterAndSort(selectedCategory, ''); // 초기화된 정렬 기준으로 필터 적용
    };
    
    // 정렬 기준 선택
    const onSort = (selectedSort) => {
        setSortType(selectedSort);
        applyFilterAndSort(category, selectedSort); // 현재 카테고리와 함께 정렬 적용
    };

    useEffect(() => {
        if (category || sortType) {
            applyFilterAndSort(category, sortType);  // 카테고리나 정렬 기준이 변경되면 다시 필터링하고 정렬
        }
    }, [category, sortType, images]);

    return (
        <div style={{justifyContent:'center', alignContent:'center'}}>
             <div style={{margin:'auto',width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
             </div>   
        <div className='mainContainer' style={{margin:'auto',display:'flex', justifyContent:'center', alignContent:'center'}}>
            
            {/* 왼쪽 카테고리,검색 */}
            <div className='header'>
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
                    <div className='letCategory' style={{borderTop:'3px solid  rgb(76, 126, 20)'}} onClick={() => onCategory('')}>
                        전체보기
                        <div className='gt' style={{paddingLeft:'137px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory' onClick={() => onCategory('웨딩홀')}>
                        웨딩홀
                        <div className='gt' style={{paddingLeft:'149px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory' onClick={() => onCategory('호텔')}>
                        호텔
                        <div className='gt' style={{paddingLeft:'161px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory' onClick={() => onCategory('하우스')}>
                        하우스
                        <div className='gt' style={{paddingLeft:'149px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory' onClick={() => onCategory('스몰')}>
                        스몰(100명 이하)
                        <div className='gt' style={{paddingLeft:'93px'}}>&gt;</div>
                    </div>
                    <div  className='letCategory' onClick={() => onCategory('야외웨딩홀')}>
                        야외 웨딩홀
                        <div className='gt' style={{paddingLeft:'121px'}}>&gt;</div>
                    </div>
                    
                    {/* 웨딩홀 end*/}
                    
                </div>
                {/* 지역검색 end */}
                    
            </div>
            {/* 왼쪽 카테고리,검색 end */}

            {/* 헤드라인 */}
            <div className='header' style={{width:'1000px'}}>
            {/*  기능별 카테고리 END */}

                {/* 게시판 */}
                {/* 게시판 헤더 */}
                {
                    userRole === 'ADMIN' &&
                    <div style={{display:'flex', justifyContent:'end', alignContent:'end', marginBottom:'25px', marginTop:'-15px', marginRight:'20px'}}>
                        <Link to='/insertWeddingHall'><button style={{padding:'15px'}}>추가</button></Link>
                    </div>
                }
                <div className='header allProductHr' style={{marginTop:'-20px'}}/>
                <div style={{display:'flex'}}>
                    <div className='allProduct' style={{cursor:'pointer'}} onClick={() => onSort('newest')}>
                    최신순
                    </div>
                    <div className='allProduct' style={{cursor:'pointer'}} onClick={() => onSort('rating')}>
                    평점순
                    </div>
                    <div className='allProduct' style={{cursor:'pointer'}} onClick={() => onSort('highPrice')}>
                    높은 가격순
                    </div>
                    <div className='allProduct' style={{cursor:'pointer'}} onClick={() => onSort('lowPrice')}>
                    낮은 가격순
                    </div>
                    <div className='allProduct' style={{marginLeft:'490px',fontWeight:'normal',fontSize:'13px'}}>
                    총 {images.length}개의 상품이 검색되었습니다.&nbsp;&nbsp;&nbsp;
                    <GrSort />
                    </div>
                </div>
                <div className='header allProductHr'/>
                {/* 게시판 헤더 */}
                <div style={{all:'initial',display:'flex',flexWrap:'wrap',overflow:'auto',backgroundColor:'whitesmoke',alignContent:'center',marginTop:'10px',margin:'10px',padding:'10px', width:'1000px'}}>
                    {
                        images.map((item,index)=>
                            
                            <div className='itemContainer' key={index}>
                                <Link to={`/wdArticle/${item.name}`} className='toArticle'>
                                    <WeddingHallItem key={index} item={item}/>
                                </Link>
                                {
                                    userRole === 'ADMIN' &&
                                    <div style={{marginLeft:'165px', marginTop:'-30px'}}>
                                        <button style={{padding:'5px'}} onClick={() => deleteImage(item.imgPath)}>삭제</button>
                                    </div>
                                }
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