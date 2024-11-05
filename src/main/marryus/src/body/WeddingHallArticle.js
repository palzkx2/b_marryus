import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import WeddingHallReview from './reveiw/WeddingHallReview';
import Numeral from 'numeral';
import loginImg from '../s_images/weddingHall/wdArticleBar.jpg'
import axios from 'axios';
import MapTest from '../travel/map/MapTest';


const WeddingHallArticle = () => {

    const {itemName,lat,lng} = useParams()
    const location = useLocation()
    const [weddingHall,setWeddingHall] = useState(null);
    const [isOnCart, setIsOnCart] = useState(null);
    const fetchCartData = async () => {
        try {
            const response = await axios.get(`/api/readOneCart`, {
                params: { name: weddingHall.name },
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

    const postData = async (event) => {
        event.preventDefault();
        const confirmation = window.confirm(`'${weddingHall.name}'을 장바구니에 담으시겠습니까?`);
        if (confirmation) {
            const data = {
                name: weddingHall.name, 
                price: weddingHall.price ,
                category: '웨딩홀'
               };    
           try {
               const response = axios.post('/api/addCart', data, {
                   withCredentials: true
               });
               console.log('POST response data:', response.data);
               alert(`${weddingHall.name}이(가) 장바구니에 담겼습니다.`);
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

    const onDelete = async (event, id) => {
        event.preventDefault(); // 이벤트 기본 동작 방지
        const confirmation = window.confirm(`${weddingHall.name}을 장바구니에서 삭제하시겠습니까?`);
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

    // URL 쿼리에서 페이지 정보를 가져옴
    const queryParams = new URLSearchParams(location.search);
    const previousPage = queryParams.get('page') || 0;

    useEffect(() => {

        const fetchWeddingHall = async () => {

            try{
                const response = await axios.get(`/api/weddingHall/${itemName}`)
                setWeddingHall(response.data);
            }catch(error){
                console.error('웨딩홀 정보를 불러오는 데 실패했습니다.',error);
            }

        }

        fetchWeddingHall();

    },[itemName])

    if(!weddingHall){
        return <div>Loading...</div>
    }

    const filename = weddingHall.imgPath.split('\\').pop();

    return (
        <div>
            <div className='alignGood'>
                
                <div className='mainContainere' style={{height:'1127px'}}>
                    <div style={{width:'1400px', height:'200px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                    </div>

                    <div className='alignGood'>
                        <div className='header' style={{width:'1400px',margin:'0px 0px 0px 0px'}}/>
                    </div>
                    <div className='artiImgConBox'>

                        <div style={{display:'flex'}}>
                            {/* 큰 이미지 */}
                            <img style={{width:'600px',padding:'20px 10px 0px 23px',borderRadius:'1%', height:'800px'}} src={`/api/images/${filename}`}/>

                            <div className='artiSubCon'>
                                <div className='artiSub' style={{fontSize:'40pt'}}>{weddingHall.name}</div>
                                <div className='artiSub'>
                                    평점
                                    <div className='artiSc'>{Number(weddingHall.rating).toFixed(1)}점</div>
                                </div>
                                <div className='artiSub'>위치
                                    <div className='artiSc'>{weddingHall.addr}</div>
                                </div>
                                <div className='artiSub'>태그
                                    <div className='artiSc' style={{fontSize:'20px'}}>
                                        {weddingHall.tag}
                                    </div>
                                </div>
                                <div className='artiSub'>
                                        가격
                                    <div className='artiSc'>
                                        {Numeral(weddingHall.price).format('0,0')} 원
                                    </div>
                                </div>
                                <div className='artiSub'>
                                    메뉴
                                    <div className='artiSc'>
                                        {weddingHall.menu}
                                    </div>
                                </div>
                            </div>
                            
                    </div>
                        
                        {/* 작은 이미지 */}
                        {/* <div style={{display:'flex',paddingLeft:'23px',justifyContent:'space-between',width:'600px',marginTop:'15px'}}>
                            <img className='artiImage' src={img1}/>
                            <img className='artiImage' src={img1}/>
                            <img className='artiImage' src={img1}/>
                            <img className='artiImage' src={img1}/>
                            <img className='artiImage' src={img1}/>
                            버튼
                        </div> */}
                            <div className='byeBtnaLoc'>
                                {
                                    isOnCart !== null
                                    ? <p onClick={(event) => onDelete(event, isOnCart.id)} className='byeBtna' style={{backgroundColor:'black',border:'none', paddingLeft:'28px',cursor:'pointer'}}>장바구니</p>
                                    : <p onClick={postData} className='byeBtna' style={{backgroundColor:'gray',border:'none', paddingLeft:'28px',cursor:'pointer'}}>장바구니</p>
                                }
                                
                            </div>
                    </div>
                </div>
            </div>
            <div className='alignGood'>
                <Link to={`/weddingHall?page=${previousPage}`}><p className='byeBtna'  style={{backgroundColor:'gray',border:'none',paddingRight:'25px'}}>되돌아가기</p></Link>
            </div>
            
            <div className='alignGood' style={{marginTop:'30px'}}>
                {/* 지도 API */}
                <div style={{width:'1400px'}}>
                    <MapTest name={weddingHall.name} coordinates={{ lat: parseFloat(weddingHall.wido), lng: parseFloat(weddingHall.gyungdo) }}/>
                </div>
                {/* 지도 API END*/}
            </div>

            {/* <div className='alignGood' style={{marginTop:'30px'}}>
                <div className='mainContainere'>
                    <div style={{fontSize:'50pt',margin:'10px 10px 10px 100px',padding:'20px'}}>
                        웨딩홀 정보
                        여기는 좀 싸고 멋있어요
                        한번 직접 봐바요
                    </div>
                    <div style={{margin:'10px 10px 10px 180px',padding:'20px'}}>
                        <img className='artiImage' src={img1} style={{width:'1000px',height:'1000px'}}/>
                    </div>
                    <div style={{fontSize:'50pt',margin:'10px 10px 10px 500px',padding:'20px'}}>
                        웨딩홀 정보
                        그럴듯 하쥬?
                    </div>
                </div>
            </div> */}

            <div className='alignGood'>
                <div className='header' style={{width:'1400px',marginBottom:'-10px'}}/>
            </div>

            <div className='alignGood'>
                <p className='byeBtna'  style={{backgroundColor:'gray',border:'none',paddingRight:'0px'}}>리뷰목록</p>
            </div>

            <div className='alignGood'>
                <div className='header' style={{width:'1400px',marginBottom:'-10px'}}/>
            </div>
            {/* 리뷰 */}

            <div className='alignGood' style={{margin:'30px 30px'}}>
                <WeddingHallReview weddingHall={weddingHall.name}/>
            </div>
            {/* 리뷰 END*/}
        </div>
    );
};

export default WeddingHallArticle;