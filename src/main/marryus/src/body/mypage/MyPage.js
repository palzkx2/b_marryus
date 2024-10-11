import React from 'react';
import { FaClipboardList, FaRegCalendarAlt } from 'react-icons/fa';
import { FaListCheck } from 'react-icons/fa6';
import { GiBookmarklet } from 'react-icons/gi';
import { ImExit } from 'react-icons/im';
import { MdManageAccounts, MdOutlineRateReview, MdOutlineRecommend } from 'react-icons/md';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { TbBellHeart, TbShoppingCartHeart } from 'react-icons/tb';
import './myPage.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Bar from './Bar';


const MyPage = () => {
    return (
        <div>
            <div className='alignGood'>
                <Bar/>
            </div>
            <div className='alignGood'>

                <div className='mainContainer'>
                    <div className='myHeader'>ooo님 안녕하세요</div>
                    
                    <div className='bContainer' >

                        <Link to='/cart'>
                        <div className='item'>
                            <TbShoppingCartHeart className='bigIcon' />
                            <p className='sub' style={{paddingLeft:'80px'}}>장바구니</p>
                        </div>
                        </Link>

                        <Link to='/myBookmark'>
                        <div className='item'>
                            <GiBookmarklet className='bigIcon'/>
                            <p className='sub' style={{paddingLeft:'88px'}}>북마크</p>
                        </div>
                        </Link>
                        
                        <Link to='/myOrder'>
                        <div className='item'>
                            <FaClipboardList className='bigIcon'/>
                            <p className='sub'>주문 및 결제 내역</p>
                        </div>                  
                        </Link>
                    </div>

                    <div className='bContainer' >

                        <Link to='/myBookList'>
                        <div className='item'>
                            <FaListCheck className='bigIcon'/>
                            <p className='sub' style={{paddingLeft:'79px'}}>예약 내역</p>
                        </div>
                        </Link>

                        <Link to='/myWedding'>
                        <div className='item'>
                            <FaRegCalendarAlt className='bigIcon'/>
                            <p className='sub' style={{paddingLeft:'54px'}}>웨딩 일정 관리</p>
                        </div>   
                        </Link>

                        <Link to='/myReview'>
                        <div className='item'>
                            <MdOutlineRateReview className='bigIcon' />
                            <p className='sub' style={{paddingLeft:'80px'}}>리뷰 관리</p>
                        </div>
                        </Link>               

                    </div>

                    <div className='bContainer' >
                        <Link to='/serviceCenter'>
                        <div className='item'>
                            <RiQuestionnaireLine className='bigIcon'/>
                            <p className='sub' style={{paddingLeft:'28px'}}>문의 내역 및 고객지원</p>
                        </div>    
                        </Link>

                        <Link to='/updateUser'>
                        <div className='item'>
                            <MdManageAccounts className='bigIcon' />
                            <p className='sub' style={{paddingLeft:'51px'}}>개인 정보 관리</p>
                        </div>
                        </Link>              

                        <Link to='/exitSite'>
                        <div className='item'>
                            <ImExit className='bigIcon' style={{paddingLeft:'68px'}}/>
                            <p className='sub' style={{paddingLeft:'68px'}}>회원 탈퇴</p>
                        </div>
                        </Link>
                    </div>
                
                </div>
            </div>
        </div>
    );
};

export default MyPage;