import React from 'react';
import data from './travelData';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import WeddingHallReview from '../body/reveiw/WeddingHallReview';
import Numeral from 'numeral';
import loginImg from '../s_images/weddingHall/wdArticleBar.jpg'
import MapOfMarryus from '../body/map/MapOfMarryus';



const TravelArticle = () => {

    const {place} = useParams()


    const thisPro = data.find(item=>item.place===place)




    return (
        <div>
        <div className='alignGood'>
            
            <div className='mainContainere'>
                <div style={{width:'1400px', height:'200px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                </div>

                <div className='alignGood'>
                    <div className='header' style={{width:'1400px',margin:'0px 0px 0px 0px'}}/>
                </div>
                <div className='artiImgConBox'>

                    <div style={{display:'flex'}}>
                        {/* 큰 이미지 */}
                        <img src={thisPro.img} style={{width:'600px',padding:'20px 10px 0px 23px',borderRadius:'1%'}} />

                        <div className='artiSubCon'>
                            <div className='artiSub' style={{fontSize:'40pt'}}>{thisPro.hotelname}</div>
                            <div className='artiSub'>
                                평점
                                <div className='artiSc'>9점</div>
                            </div>
                            <div className='artiSub'>위치
                                <div className='artiSc'>{thisPro.place}</div>
                            </div>
                            <div className='artiSub'>태그
                                <div className='artiSc' style={{fontSize:'20px'}}>
                                    {thisPro.dec}
                                </div>
                            </div>
                            <div className='artiSub'>
                                    가격
                                <div className='artiSc'>
                                    {Numeral(thisPro.price).format('0,0')} 원
                                </div>
                            </div>
                        </div>
                        
                </div>
                    
                    {/* 작은 이미지 */}
                    <div style={{display:'flex',paddingLeft:'23px',justifyContent:'space-between',width:'600px',marginTop:'15px'}}>
                        <img src={thisPro.img} className='artiImage' />
                        <img src={thisPro.img} className='artiImage' />
                        <img src={thisPro.img} className='artiImage' />
                        <img src={thisPro.img} className='artiImage' />
                        <img src={thisPro.img} className='artiImage' />
                        {/* 버튼 */}
                    </div>
                        <div className='byeBtnaLoc'>
                            <Link to='/myPage'><p className='byeBtna' style={{backgroundColor:'gray',border:'none', paddingLeft:'28px'}}>견적내기</p></Link>
                            <Link to='/myCart'><p className='byeBtna' style={{backgroundColor:'gray',border:'none', paddingLeft:'28px'}}>장바구니</p></Link>
                        </div>
                </div>
            </div>
        </div>
        <div className='alignGood'>
            <Link to='/travel'><p className='byeBtna'  style={{backgroundColor:'gray',border:'none',paddingRight:'25px'}}>되돌아가기</p></Link>
        </div>
        
        <div className='alignGood' style={{marginTop:'30px'}}>
            {/* 지도 API */}
                <MapOfMarryus/>
            {/* 지도 API END*/}
        </div>

        <div className='alignGood' style={{marginTop:'30px'}}>
            <div className='mainContainere'>
                <div style={{fontSize:'50pt',margin:'10px 10px 10px 100px',padding:'20px'}}>
                    {/* 웨딩홀 정보 */}
                    여기는 좀 싸고 멋있어요
                    한번 직접 봐바요
                </div>
                <div style={{margin:'10px 10px 10px 180px',padding:'20px'}}>
                    <img className='artiImage'  style={{width:'1000px',height:'1000px'}}/>
                </div>
                <div style={{fontSize:'50pt',margin:'10px 10px 10px 500px',padding:'20px'}}>
                    {/* 웨딩홀 정보 */}
                    그럴듯 하쥬?
                </div>
            </div>
        </div>

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
            <WeddingHallReview/>
        </div>
        {/* 리뷰 END*/}
    </div>
    );
};

export default TravelArticle;
