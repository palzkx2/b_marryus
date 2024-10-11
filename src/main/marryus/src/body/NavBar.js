import React, { useEffect, useState } from 'react';
import './navBar.css'
import './main.css'
import { BsSearchHeart } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { TbShoppingCartHeart } from "react-icons/tb";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = () => {

    const [windowScroll, setWindowScroll] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        function scrollView() {
            setWindowScroll(window.scrollY)
        }
        
        window.addEventListener('scroll', scrollView);
        return () => window.removeEventListener('scroll', scrollView);
    }, [])

    useEffect(() => {

        if(windowScroll >= 200){
            document.querySelector('.topNav').classList.add('ModalOpen');
            document.querySelector('.topNav').classList.remove('ModalClose');
        } else {
            document.querySelector('.topNav').classList.add('ModalClose');
            document.querySelector('.topNav').classList.remove('ModalOpen');
        }

    }, [windowScroll])

    return (
        <div>

            <nav className="topNav">
                <Link to='/'><h1 style={{color:'white'}}>Marry Us</h1></Link>
                <input type='text' placeholder='검색 할 내용을 입력하세요'/>
                <BsSearchHeart className='searchIcon' style={{ transform: isHovered ? 'translateX(-10px)' : 'translateX(0px)', transition: 'all 0.6s ease' }}/>
                <div>   
                    <Link to='/'>
                        <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            전체메뉴
                        </p>
                    </Link>
                    <Link to='/weddingHall'>
                        <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            웨딩홀
                        </p>
                    </Link>
                    <Link to='/sdm'>
                        <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            스드메
                        </p>
                    </Link>
                    <Link to='/weddingItem'>
                        <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            혼수컬렉션
                        </p>
                    </Link>
                    <Link to='/travel'>
                        <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            신혼여행지
                        </p>
                    </Link>
                </div>
                <Link to='/myPage' style={{color:'white'}}>
                    <FaUserTie className='icon'/>
                </Link>
                <Link to='/cart' style={{color:'white'}}>
                    <TbShoppingCartHeart className='icon' style={{marginLeft:'20px'}}/>
                </Link>
            </nav>

            <div style={{justifyContent:'center', alignContent:'center', display:'flex', margin:'30px 0'}}>
                <div className='login' style={{display:'flex', flexDirection:'row'}}>
                    <Link to='/login'><p>로그인</p></Link>
                    <Link to='/signup'><p style={{marginLeft:'50px'}}>회원가입</p></Link>
                    <Link to='/myPage'><p style={{marginLeft:'50px'}}>마이페이지</p></Link>
                    <strong style={{margin:'0 300px', fontSize:'36pt', color:'black'}}><Link to='/' style={{color:'black'}}>Marry Us</Link></strong>
                    <input type='text' placeholder='검색 할 내용을 입력하세요.' style={{height:'20px', margin:'16px 0', width:'292px', fontSize:'10pt'}}/>
                </div>
            </div>
            <hr style={{width:'100%'}}/>
            <div style={{justifyContent:'center', alignContent:'center', display:'flex', marginTop:'10px'}}>
                <div className='category' style={{display:'flex', flexDirection:'row'}}>
                    <Link to='/'><p>전체메뉴</p></Link>
                    <Link to='/weddingHall'><p>웨딩홀</p></Link>
                    <Link to='/sdm'><p>스드메</p></Link>
                    <Link to='/weddingItem'><p>혼수컬렉션</p></Link>
                    <Link to='/travel'><p>신혼여행지</p></Link>
                </div>
                <div style={{margin:'0 440px'}}></div>
                <div className='category' style={{display:'flex', flexDirection:'row'}}>
                    <Link to='/main' style={{color:'black'}}>
                        <p>홈으로</p>
                    </Link>
                    <Link to='/serviceCenter' style={{color:'black'}}>
                        <p style={{paddingLeft:'20px', marginRight:'21px'}}>고객센터</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;