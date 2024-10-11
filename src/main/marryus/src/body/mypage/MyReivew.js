import React from 'react';
import './myPage.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Bar from './Bar';
import WeddingHallReview from '../reveiw/WeddingHallReview';

const MyReivew = () => {
    return (
        <div>
            <div className='alignGood'>
                <Bar/>
            </div>
            <div className='alignGood'>
                <div className='mainContainer'>
            <div className='alignGood'>
                <p className='byeBtna'  style={{backgroundColor:'gray',border:'none',padding:'10px',width:'230px'}}>내가 쓴 리뷰 목록</p>
            </div>
            {/* 리뷰 */}
            <div className='alignGood' style={{margin:'30px 30px'}}>
                <WeddingHallReview/>
            </div>
            {/* 리뷰 END*/}
                    <div className='conBox'>
                            <Link to='/myPage'><p className='byeBtn'>돌아가기</p></Link>
                            <Link to='#'><p className='byeBtn'>수정 완료</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyReivew;