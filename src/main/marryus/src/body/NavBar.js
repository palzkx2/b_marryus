import React, { useEffect, useState } from 'react';
import './navBar.css'
import './main.css'
import { BsSearchHeart } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { TbShoppingCartHeart } from "react-icons/tb";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const NavBar = () => {

    const [userRole,setUserRole] = useState([])

    // useEffect(() => {

    //     const fetchOAuthUserInfo = async () => {
    //         try {
    //             const response = await axios.get('/api/oauthUserInfo', { withCredentials: true });
    //             console.log('OAuth세션 정보 : ', response.data);
    //             setUserRole(response.data.user); // 필요한 경우에 맞게 수정
    //         } catch (error) {
    //             console.error('OAuth 정보 가져오기 실패:', error);
    //         }
    //     };
    
    //     fetchOAuthUserInfo();

    // }, []);

    // useEffect(() => {
    //     axios.get('/api/oauthUserInfo', {withCredentials: true})
    //     .then(res=>setUserRole(res.data))
    //     .catch(error=>console.log(error))
    // },[])
    
    // useEffect(() => {

    //     const fetchSessionData1 = async () => {

    //         try {
    //             const response = await axios.get('/api/session', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
    //             console.log('세션 정보 : ', response.data)
    //             setUserRole(response.data.userRole); // 세션 정보를 상태에 저장
    //         } catch (error) {
    //             console.error('세션 가져오기 실패:', error);
    //             if (error.response && error.response.status === 401) {
    //                 // 사용자에게 로그인 페이지로 리다이렉트하도록 안내
    //                 console.log('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
    //             }

    //         }

    //     };

    //     fetchSessionData1();

    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sessionResponse, oauthResponse] = await Promise.all([
                    axios.get('/api/session', { withCredentials: true }), // 세션 정보를 가져오는 API 호출
                    axios.get('/api/oauthUserInfo', { withCredentials: true }) // OAuth 정보를 가져오는 API 호출
                ]);
    
                // 세션 정보 처리
                console.log('세션 정보 : ', sessionResponse.data);
                const sessionUserRole = sessionResponse.data.userRole;
    
                // OAuth 정보 처리
                console.log('OAuth세션 정보 : ', oauthResponse.data);
                const oauthUser = oauthResponse.data.user; // 필요에 따라 수정
    
                // 사용자 역할을 업데이트 (둘 중 하나만 사용하는 경우 적절히 선택)
                setUserRole(sessionUserRole || oauthUser); // 우선 순위에 따라 결정
    
            } catch (error) {
                console.error('API 호출 실패:', error);
                if (error.response && error.response.status === 401) {
                    // 사용자에게 로그인 페이지로 리다이렉트하도록 안내
                    console.log('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');
                    // 필요에 따라 여기에서 리다이렉트를 구현
                }
            }
        };
    
        fetchData();
    }, []);

    const logout = async () => {
        try {
            // 로그아웃 요청을 보냄
            const response = await axios.post('/api/logout', {}, { withCredentials: true });
            console.log('로그아웃 성공:', response.data);
            
            // 세션 및 쿠키 상태를 초기화
            setUserRole([]); // 사용자 역할 상태 초기화
    
            // 로그아웃 후 페이지를 새로고침하여 세션 정보를 리셋
            window.location.reload(); 
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

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
                    {
                        userRole ?
                        <Link to='/'><p onClick={logout}>로그아웃</p></Link> : <Link to='/login'><p>로그인</p></Link>
                    }

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