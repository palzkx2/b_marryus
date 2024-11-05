import React, { useEffect, useState } from 'react';
import './navBar.css'
import './main.css'
import { BsSearchHeart } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { TbShoppingCartHeart } from "react-icons/tb";
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import mainLogo from '../s_images/main/m1.png'
import CartBar from './CartBar';


const NavBar = () => {

    const [userRole,setUserRole] = useState('')
    const history = useHistory() 
    const location = useLocation()

    useEffect(() => {
        const fetchSessionData1 = async () => {
            try {
                const response = await axios.get('/api/session', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
                console.log('세션 정보 : ', response.data)
                setUserRole(response.data.userRole); // 세션 정보를 상태에 저장
            } catch (error) {
                console.error('세션 가져오기 실패:', error);
            }
        };
        fetchSessionData1();
    }, []);

    const logout = async () => {
        try{
            const response = await axios.get('/api/logout');
            console.log('세션 정보 : ', response.data)
            console.log('로그아웃 성공')
            history.push('/')
            window.location.reload();
        }catch(error) {
            console.error('로그아웃 실패: ', error);
        }
    }

    const oauthLogout = async () => {
        try{
            const response = await axios.post('/api/oauthLogout');
            history.push('/')
            window.location.reload();
        }catch(error) {
            console.error('로그아웃 실패: ', error);
        }
    }

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



    const [data,setData] = useState({});

    useEffect(()=>{
        axios.get('/api/oauthUserInfo',{withCredentials: true})
        .then(res=>setData(res.data))
        .catch(error=>console.log(error))
    },[])

    const PlsLogin = () => {
        alert('로그인 후 이용해주세요.')
        history.push('/login')
    };

    //웨딩홀
    const isWeddingHallActive = () => {
        return location.pathname === '/weddingHall' || location.pathname.startsWith('/wdArticle');
    };

    //스드메
    const isSdmActive = () => {
        return location.pathname === '/sdm' || location.pathname.startsWith('/sdmArticle');
    };

    //혼수컬랙션
    const isWeddingItemActive = () => {
        return location.pathname === '/weddingItem' || location.pathname.startsWith('/weddingItemArticle');
    };

    //신혼여행지
    const isTravelActive = () => {
        return (
            location.pathname === '/travel' ||
            location.pathname === '/overseasDestinations' ||
            location.pathname === '/domesticDestinations' ||
            location.pathname === '/travelSearch' ||
            location.pathname === '/ArticlePage'
        );
    };
    const cartBtn = () => {
        if(data.name === undefined && !userRole){
            alert('로그인 후 이용해주세요.')
            history.push('/login')
        }else{
            history.push('/cart')
        }
    }

    return (
        <div>

            <nav className="topNav">
                <Link to='/'><h1 style={{color:'white'}}>MarryUs</h1></Link>
                {/* <input type='text' placeholder='검색 할 내용을 입력하세요'/>
                <BsSearchHeart className='searchIcon' style={{ transform: isHovered ? 'translateX(-10px)' : 'translateX(0px)', transition: 'all 0.6s ease' }}/> */}
                <div>   
                    <Link to='/'>
                        <p onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            전체메뉴
                        </p>
                    </Link>
                    <NavLink
                        to='/weddingHall'
                        className={isWeddingHallActive() ? 'active' : ''}
                    >
                        <p>웨딩홀</p>
                    </NavLink>
                    <NavLink
                        to='/sdm'
                        className={isSdmActive() ? 'active' : ''}
                    >
                        <p>스드메</p>
                    </NavLink>
                    <NavLink
                        to='/weddingItem'
                        className={isWeddingItemActive() ? 'active' : ''}
                    >
                        <p>혼수컬렉션</p>
                    </NavLink>
                    <NavLink
                        to='/travel'
                        className={isTravelActive() ? 'active' : ''}
                    >
                        <p>신혼여행지</p>
                    </NavLink>
                </div>
                {
                    (data.name === undefined && !userRole) ? (
                        <FaUserTie className='icon' onClick={PlsLogin}/>
                    ) : (
                        <Link to='/myPage' style={{color:'white'}}>
                            <FaUserTie className='icon'/>
                        </Link>
                    )
                }
                <div style={{margin:'1px'}} onClick={cartBtn} >
                    <TbShoppingCartHeart className='icon' style={{marginLeft:'20px'}}/>
                </div>
            </nav>

            <div style={{justifyContent:'center', alignContent:'center', display:'flex', margin:'30px 0'}}>
                <div className='login' style={{display:'flex', flexDirection:'row'}}>
                    {
                        data.name!==undefined  ?
                        <Link to='/'><p onClick={oauthLogout} style={{marginTop:50}}>로그아웃</p></Link> : 
                        
                        (
                            userRole ? <Link to='/'><p onClick={logout} style={{marginTop:50}}>로그아웃</p></Link>
                                     : <Link to='/login'><p style={{marginTop:50}}>로그인</p></Link>
                        )
                        
                    }

                    {/* <input type='text' placeholder='검색 할 내용을 입력하세요.' style={{height:'20px', margin:'16px 0', width:'292px', fontSize:'10pt'}}/> */}
                    {
                        (data.name !== undefined || userRole) ? (
                            <Link to='/myPage'><p style={{ marginLeft: '50px' }}>마이페이지</p></Link>
                        ) : ''
                    }
                    {
                        (data.name !== undefined || userRole) ? (
                            <Link to='/cart'><p style={{ marginLeft: '50px' }}>장바구니</p></Link>
                        ) : ''
                    }
                   
                    <div style={{margin:'0 300px'}}>
                        <Link to='/' style={{color:'black'}}><img width={'300px'} height={'130px'} src={mainLogo}/></Link>
                    </div>
                    
                    {
                        (data.name === undefined && !userRole) ? (
                            <Link to='/signup'>
                                <p style={{marginLeft: '50px',marginTop:50}}>회원가입</p>
                            </Link>
                        ) : ''
                    }
                                        {
                        (data.name !== undefined || userRole) ? (
                            <Link to='/myPage'><p style={{ marginLeft: '50px', marginTop:50 }}>마이페이지</p></Link>
                        ) : ''
                    }
                </div>
            </div>
            <hr style={{width:'100%'}}/>
            <div style={{justifyContent:'center', alignContent:'center', display:'flex', marginTop:'10px'}}>
                <div className='category' style={{display:'flex', flexDirection:'row'}}>
                    <Link to='/'><p>전체메뉴</p></Link>
                    <NavLink
                        to='/weddingHall'
                        className={isWeddingHallActive() ? 'active' : ''}
                    >
                        <p>웨딩홀</p>
                    </NavLink>
                    <NavLink
                        to='/sdm'
                        className={isSdmActive() ? 'active' : ''}
                    >
                        <p>스드메</p>
                    </NavLink>
                    <NavLink
                        to='/weddingItem'
                        className={isWeddingItemActive() ? 'active' : ''}
                    >
                        <p>혼수컬렉션</p>
                    </NavLink>
                    <NavLink
                        to='/travel'
                        className={isTravelActive() ? 'active' : ''}
                    >
                        <p>신혼여행지</p>
                    </NavLink>
                </div>
                <div style={{margin:'0 440px'}}></div>
                <div className='category' style={{display:'flex', flexDirection:'row'}}>
                    <Link to='/main' style={{color:'black'}}>
                        <p>홈으로</p>
                    </Link>
                    {
                        (data.name === undefined && !userRole) ? (
                            <p onClick={PlsLogin} style={{ paddingLeft: '20px', marginRight: '21px', cursor: 'pointer' }}>
                                고객센터
                            </p>
                        ) : (
                            <NavLink to='/serviceCenter'>
                                <p style={{ paddingLeft: '20px', marginRight: '21px' }}>고객센터</p>
                            </NavLink>
                        )
                    }


                </div>
            </div>

            {/* <div onClick={cartBtn} style={{cursor:'pointer'}}>
                <CartBar/>
            </div> */}
        </div>
    );
};

export default NavBar;