// 수정 코드
import React, { useCallback, useEffect, useState } from 'react';
import './sdmBoard.css';
import studioImg from '../s_images/studioImage.jpg';
import axios from 'axios';
import Pagination from '../sdm/common/Pagination'; // Pagination 컴포넌트 임포트
import { IoHeart } from "react-icons/io5";
import numeral from 'numeral';
import { MdThumbUp } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const API_SERVER_HOST = 'http://localhost:8080'; // 서버 주소
const prefix = `${API_SERVER_HOST}/api/sdm`; // API 경로 설정

const SdmBoard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageResponse, setPageResponse] = useState(null);
    const [page, setPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortDirection, setSortDirection] = useState('DESC');
    const [sortType, setSortType] = useState('price');
    const [searchTerm, setSearchTerm] = useState(''); // 빈 문자열로 초기화
    const [userRole,setUserRole] = useState('')
    const [isOnCart, setIsOnCart] = useState(null);

    const fetchCartData = async () => {
        try {
            const response = await axios.get(`/api/readCart`, {
                //params: { name: name },
                withCredentials: true, // 인증이 필요하면 이 옵션을 추가합니다.
            });

            // 응답 데이터에 따라 isOnCart 상태 업데이트
            if (response.data) {
                setIsOnCart(response.data); // 장바구니에 아이템이 있을 경우
            } else {
                setIsOnCart(null); // 아이템이 없을 경우
            }

            // 로그를 통해 데이터 확인
            console.log("장바구니 데이터:", response.data);
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    const postData = async (item) => {
        
        const confirmation = window.confirm(`'${item.itemNm}'을 장바구니에 담으시겠습니까?`);
        if (confirmation) {
            const data = {
                name: item.itemNm, 
                price: item.price ,
                category: item.category
               };    
           try {
               const response = axios.post('/api/addCart', data, {
                   withCredentials: true
               });
               console.log('POST response data:', response.data);
               alert(`${item.itemNm}이(가) 장바구니에 담겼습니다.`);
               fetchCartData();
           } catch (error) {
               console.error('Error posting data:', error);
           }
        } else {
            // 취소 시 실행되는 로직
            alert('취소되었습니다.');
            console.log("삭제가 취소되었습니다.");
        }
        
    };

   
    useEffect(() => {
        
        fetchCartData();
    }, []); // name이 변경될 때마다 호출

    const onDeletecart = async (id) => {
        
        const confirmation = window.confirm(`아이템을 장바구니에서 삭제하시겠습니까?`);
        if (confirmation) {
            try {
                // 백엔드 API 엔드포인트
                const response = await axios.delete(`/api/deleteCart/${id}`);        
                // 성공적으로 삭제된 경우
                console.log('삭제 성공:', response.data);
                alert('삭제되었습니다.');
                setIsOnCart(null); // 장바구니 상태 업데이트
            } catch (error) {
                // 오류 처리
                console.error('삭제 실패:', error);
            }
        } else {
            // 취소 시 실행되는 로직
            alert('취소되었습니다.');
            console.log("삭제가 취소되었습니다.");
        }
    };


    
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



    // 데이터 불러오는 함수, 기본 카테고리 '스튜디오'로 설정
    const fetchData = useCallback(async (category = '', sortType = 'list', sortDirection = 'DESC', searchTerm = '') => {
        setLoading(true);
        try {
            const endpoint = `${prefix}/list`;
            const response = await axios.get(endpoint, {
                params: {
                    page: page,
                    size: 12,
                    category: category || null,
                    sort: sortType,
                    direction: sortDirection,
                    itemNm: searchTerm || null,
                }
            });
            const dtoList = response.data.dtoList || [];
            setData(dtoList);
            setPageResponse(response.data);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    // 검색 시 사용하는 함수
    const fetchData2 = useCallback(async (searchTerm) => {
        setLoading(true);
        try {
            const endpoint = `${prefix}/search/itemNm`;
            const response = await axios.get(endpoint, {
                params: {
                    page: page,
                    size: 12,
                    itemNm: searchTerm, // 검색어로만 검색
                }
            });
            const dtoList = response.data.dtoList || [];
            setData(dtoList);
            setPageResponse(response.data);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    // 페이지가 처음 로드되었을 때 fetchData 실행하여 기본 데이터를 불러옵니다.
    useEffect(() => {
        if (searchTerm) {
            fetchData2(searchTerm); // 검색어가 있을 때만 검색
        } else {
            fetchData(selectedCategory, sortType, sortDirection); // 검색어가 없을 때는 기본 리스트
        }
    }, [searchTerm, page, selectedCategory, sortType, sortDirection, fetchData, fetchData2]);


    const handleSortByLatest = () => {
        setPage(1);
        setSortType('date'); // 최신순으로 정렬할 때 'date' 사용
        setSortDirection('DESC'); // 내림차순
        fetchData(selectedCategory, 'date', 'DESC', searchTerm); // 카테고리 정렬 후 최신순
    };
  
    // 전체 상품 버튼 핸들러
    const handleShowAll = () => {
        setSelectedCategory('스튜디오'); // 카테고리 초기화
        setSearchTerm(''); // 검색어 초기화
        setPage(1); // 첫 페이지로 이동
        fetchData(); // 전체 상품 조회
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // 검색어 입력 핸들러
    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
    };

    // 검색 버튼 핸들러
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1); // 검색어 입력 후 페이지를 초기화
        fetchData2(searchTerm);
    };

    // 카테고리 검색 핸들러
    const handleStudioSearch = (selectedCategory) => {
        setPage(1);
        setSelectedCategory(selectedCategory);
        fetchData(selectedCategory, sortType, sortDirection);
    };

    // 가격순 정렬 핸들러 (가격순 버튼)
    const handleSortByPrice = (direction) => {
        setPage(1); // 페이지를 첫 페이지로 초기화
        setSortType('price');
        setSortDirection(direction); // 정렬 방향을 설정
        fetchData(selectedCategory, 'price', direction, searchTerm); 
    };

    // 평점순 정렬 핸들러
    const handleSortByRating = (direction) => {
        setPage(1); // 페이지를 첫 페이지로 초기화
        setSortType('rating'); // 정렬 기준을 평점으로 설정
        setSortDirection('DESC');  // 정렬 방향 설정 (ASC 또는 DESC)
    };

    const toggleLike = (item) => {
        const updatedData = data.map((d) => {
            if (d.itemNm === item.itemNm) {
                return { ...d, totalLikes: d.totalLikes + 1 }; // 좋아요 수 증가
            }
            return d;
        });
        setData(updatedData);
    };

    // 삭제 핸들러
    const onDelete = async (id) => {
        try {
            await axios.delete(`${prefix}/delete/${id}`); // 서버에 삭제 요청
            setData(data.filter(item => item.id !== id)); // Remove deleted item from state
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <div style={{
                    width: '1400px', height: '350px', display: 'flex',
                    justifyContent: 'center', alignContent: 'center',
                    backgroundImage: `url(${studioImg})`, backgroundSize: 'cover',
                    backgroundPosition: 'center calc(100% - -130px)'
                }}>
                </div>
            </div>
           
            <div className='stk'>
                <form onSubmit={handleSearchSubmit} style={{marginBottom:'20px'}}>
                    <div className='bigCategoryInput'>
                    메리어스

                        <input type='text' value={searchTerm}  onChange={handleSearchInput}
                    placeholder="검색어를 입력하세요" style={{ marginTop: '30px', height: '30px' }} />
                    </div>
                </form>
                <div className='bigCategory'>
                    
                    <div className='categorys'>
                        <button className='btnStyle'  onClick={handleShowAll}>전체상품</button>
                        <p style={{ paddingLeft: '170px', paddingTop: '11px' }}>&gt;&gt;</p>
                    </div>
                    
                    <div className='categorys'>
                        <button className='btnStyle' onClick={() => handleStudioSearch('스튜디오')}>스튜디오</button>
                        <p style={{ paddingLeft: '170px', paddingTop: '11px' }}>&gt;&gt;</p>
                    </div>

                    <div className='categorys'>
                        <button className='btnStyle' onClick={() => handleStudioSearch('드레스')}>드레스</button>
                        <p style={{ paddingLeft: '188px', paddingTop: '11px' }}>&gt;&gt;</p>
                    </div>

                    <div className='categorys'>
                        <button className='btnStyle' onClick={() => handleStudioSearch('메이크업')}>메이크업</button>
                        <p style={{ paddingLeft: '170px', paddingTop: '11px' }}>&gt;&gt;</p>
                    </div>

                </div>
            </div>
            
                <div style={{marginLeft:'100px', marginTop:'-326px'}}>
                    <div className='smallCategory' style={{marginTop:'10px'}}>
                        <button className='btnStyle1' onClick={handleSortByLatest}>최신순</button>
                        <button className='btnStyle1' onClick={() => handleSortByPrice('ASC')}>낮은가격순</button>
                        <button className='btnStyle1' style={{marginRight:'600px'}} onClick={() => handleSortByPrice('DESC')}>높은가격순</button>
                    </div>
                </div>
               
                <div style={{ marginLeft: '21.5%' }}>
                       
                    {
                        loading ? (
                            <p>로딩 중...</p> // 로딩 상태 표시
                        ) : data.length > 0 ? (
                            // data를 4개씩 나누기 위한 배열 생성
                            Array.from({ length: Math.ceil(data.length / 4) }).map((_, rowIndex) => (
                                <div key={rowIndex} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px', margin: `23px 118px` }}>
                                    {
                                        data.slice(rowIndex * 4, rowIndex * 4 + 4).map((item, index) => (
                                            <div key={index} className='imgBoard' 
                                                style={{ 
                                                    width: '220px', 
                                                    margin: '0 26px', 
                                                
                                                    
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between' 
                                                }}>

                                                <div className='imgDiv'>
                                                    <div>
                                                    <Link to={`/sdmArticle/${item.itemNm}?page=${page}`} style={{ color: 'black' }}>
                                                        <img src={`${API_SERVER_HOST}/api/sdm/view/${item.uploadFileNames[0]}`} alt={item.itemNm} width={220} height={200} style={{ marginTop: '24px', padding: '9px' }} />
                                                    </Link>
                                                   
                                                    </div>
                                                    
                                                    <Link to={`/sdmArticle/${item.itemNm}?page=${page}`} style={{ color: 'black',  whiteSpace: 'pre-wrap'  }}>
                                                        <strong>{item.itemNm}</strong>
                                                    </Link>
                                                    <Link to={`/sdmArticle/${item.itemNm}?page=${page}`} style={{ color: 'black', whiteSpace: 'pre-wrap'  }}>
                                                        <p>{item.addr}</p>
                                                    </Link>
                                                    
                                                    <p style={{ padding: `7px 15px 0px`, marginTop: '-15px' }}>
                                                        <IoHeart
                                                            style={{ cursor: 'pointer', color: 'red' }}
                                                            onClick={() => toggleLike(item)}
                                                        />
                                                        {item.totalLikes} {/* 좋아요 수 */}
                                                    </p>
                                                    <Link to={`/sdmArticle/${item.itemNm}?page=${page}`} style={{ color: 'black' }}>
                                                        <p>
                                                        <MdThumbUp  style={{color:'yellow',width:'15px',height:'20px'}}/>
                                                            평점:{item.rating}</p> 
                                                    </Link>
                                                    
                                                    <Link to={`/sdmArticle/${item.itemNm}?page=${page}`} style={{ color: 'black', wordWrap: 'break-word' }}>
                                                        <p style={{ marginBottom: '40px' }}>{numeral(item.price).format('0,0')}원</p>
                                                    </Link>
                                                            {
                                                                userRole === 'ADMIN' &&
                                                                <p
                                                                    style={{ width:'42px', backgroundColor: 'red', marginLeft:'191px',marginBottom:'-265px', color: 'white', border: 'none', cursor: 'pointer' }}>

                                                                    <RiDeleteBinLine onClick={() => onDelete(item.id)} style={{cursor: 'pointer',fontSize:'24px'}}/>
                                                                </p>
                                                            }
                                                    <p>
                                                        <TiShoppingCart onClick={() => postData(item)} style={{ padding: `7px 15px 0px`, marginTop: '-15px',cursor: 'pointer',fontSize:'30px'}}/>
                                                    </p>

                                                  
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            ))
                                        ) : (
                                            <p>데이터가 없습니다.</p> // 데이터가 없는 경우
                                        )
                                    }
                                </div>
                                {/* 페이징 컴포넌트 추가 */}
                                {
                                    pageResponse && (
                                        <Pagination
                                            pageResponse={pageResponse} // 서버에서 받은 페이징 정보
                                            onPageChange={handlePageChange} // 페이지 변경 핸들러
                                        />
                                    )
                                }
                    <div style={{ marginLeft: '21.5%' }}>
                    
                    {
                    userRole === 'ADMIN' &&

                            <div style={{ marginBottom: '20px' }}>
                                {/* 버튼을 추가하여 AddSdm으로 이동하도록 설정 */}
                                <Link to="/sdmRegister">
                                    <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                                        상품 추가하기
                                    </button>
                                </Link>
                            </div>
                    }
                    </div>
                </div>
        
    
    );
};

export default SdmBoard;
