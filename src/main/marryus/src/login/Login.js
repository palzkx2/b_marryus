import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GiLockedHeart } from "react-icons/gi";
import loginImg from '../s_images/loginImage.jpg'
import { Link, useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { SiKakao, SiNaver } from 'react-icons/si';
import './login.css'
import FindIdModal from './FindIdModal';
import FindPwdModal from './FindPwdModal';

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()
    const [findIdModalOpen,setFindIdModalOpen] = useState(false)
    const [findPwdModalOpen,setFindPwdModalOpen] = useState(false)

    const openFindIdModal = () => {
        setFindIdModalOpen(true)
    }

    const closeFindIdModal = () => {
        setFindIdModalOpen(false)
    }

    const openFindPwdModal = () => {
        setFindPwdModalOpen(true)
    }

    const closeFindPwdModal = () => {
        setFindPwdModalOpen(false)
    }

    const handleLogin = async () => {

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try{
            const response = await axios.post('/api/login', {email,password}, { withCredentials: true });
            console.log('이메일 받았냐---------------------',email)
            console.log('비밀번호 받았냐----------------------',password)

            if(response.status === 200){
                console.log('로그인 성공 : ', response.data);
                history.push('/')
                window.location.reload();
            }

        }catch(error) {
            console.log('로그인 실패 : ', error.response.data);
            alert('이메일 및 비밀번호를 확인해주세요.')
        }

    }

    // 키 입력 감지 함수
    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    const openModalWindow = (site) => {
        const width = 600;
        const height = 400;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        let authWindow     
        if(site==='google'){              
            authWindow =
            window.open(
                'http://localhost:8080/oauth2/authorization/google', // 열고자 하는 URL
                '구글로 로그인', // 창 이름
                `width=${width}, height=${height}, top=${top}, left=${left}`
            );
        }else if(site==='kakao'){
            authWindow =
            window.open(
                'http://localhost:8080/oauth2/authorization/kakao', // 열고자 하는 URL
                '카카오로 로그인', // 창 이름
                `width=${width}, height=${height}, top=${top}, left=${left}`
            );
        }
        else if(site==='naver'){
            authWindow =
            window.open(
                'http://localhost:8080/oauth2/authorization/naver', // 열고자 하는 URL
                '네이버 로그인', // 창 이름
                `width=${width}, height=${height}, top=${top}, left=${left}`
            );
        }
        window.addEventListener('message', (event) => {
            console.log(event.data)
            console.log(event.origin)
            if (event.origin !== 'http://localhost:8080') {
              return;
            }
            if (event.data === 'success') {
                authWindow.close();
                history.push('/')
                alert('로그인 성공!');
                window.location.reload()
            }else if (event.data === 'signup'){
                alert('로그인 성공! 추가정보를 입력해주세요');
                history.push('/oauthSignup')
                window.location.reload();
            }


          });
      };

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                    <p style={{marginTop:'140px', fontSize:'32pt', fontWeight:'bold', color:'#F8D3D3', textShadow:'2px 2px 2px rgba(0,0,0, 0.5)'}}>♥ 로그인 ♥</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'600px', display:'flex', justifyContent:'center', alignContent:'center', background:'#FFF0F5'}}>
                    <div style={{background:'#FFE4E1', width:'1200px', height:'500px', margin:'50px 0', display:'flex', justifyContent:'center', alignContent:'center'}}>
                        <div style={{marginTop:'50px', position:'relative'}}>
                            <GiLockedHeart style={{width:'60px', height:'60px', color:'silver'}}/>
                        </div>
                        <div style={{marginTop:'150px', position:'absolute', fontWeight:'bold', marginRight:'50px'}}>
                            이메일 <input type='text' ref={emailRef} style={{width:'250px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'20px'}} onKeyDown={enterKeyPress}/>
                        </div>
                        <div style={{marginTop:'190px', position:'absolute', fontWeight:'bold', marginRight:'49px'}}>
                            비밀번호 <input type='password' ref={passwordRef} style={{width:'250px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'6px', fontFamily: 'Arial, sans-serif'}} onKeyDown={enterKeyPress}/>
                        </div>
                        <div style={{marginTop:'150px', position:'absolute', fontWeight:'bold', marginLeft:'400px'}}>
                            <button style={{width:'70px', height:'70px', borderRadius:'5px', background:'#5DC060', border:'none', cursor:'pointer', fontWeight:'bold', marginRight:'40px'}} onClick={handleLogin}>로그인</button>
                        </div>
                        <div style={{marginTop:'250px', position:'absolute', fontWeight:'bold'}}>
                            <button onClick={openFindIdModal} style={{background:'none', border:'1px solid gray', cursor:'pointer', fontWeight:'bold', padding:'5px', marginLeft:'12px'}}>아이디 찾기</button>
                            <FindIdModal isOpen={findIdModalOpen} closeModal={closeFindIdModal}/>
                            <button onClick={openFindPwdModal} style={{background:'none', border:'1px solid gray', cursor:'pointer', fontWeight:'bold', padding:'5px',marginLeft:'7px'}}>비밀번호 찾기</button>
                            <FindPwdModal isOpen={findPwdModalOpen} closeModal={closeFindPwdModal}/>
                            <Link to='/signup'>
                                <button style={{background:'none', border:'1px solid gray', cursor:'pointer', marginLeft:'7px', fontWeight:'bold', padding:'5px'}}>회원가입</button>
                            </Link>
                            {/*  Oauth2.0 인증  */}
                            <div style={{padding:'10px',margin:'1px -3px -11px -34px',position:'absolute'}}>
                                <div className='siteContainer' onClick={()=>openModalWindow('google')}>
                                    <FcGoogle className='siteIcon' onClick={()=>openModalWindow('google')} style={{padding:'0px',margin:'5px 5px 6px 5px'}} />
                                    <div className='siteFont' style={{color:'black'}}>구글로 로그인하기</div>
                                </div>
                                <div className='siteContainer' onClick={()=>openModalWindow('naver')}>
                                    <SiNaver className='siteIcon' onClick={()=>openModalWindow('naver')} style={{width:'16px',height:'16px',marginTop:'3px',backgroundColor:' #00c73c'}}/>
                                    <div className='siteFont' >네이버로 로그인하기</div>
                                </div>
                                <div className='siteContainer' onClick={()=>openModalWindow('kakao')}>
                                    <SiKakao className='siteIcon' style={{backgroundColor:'#E1CA00 ',borderRadius:'40%',padding:'3px 4px 3px 4px',color:'black',marginTop:'3px'}} onClick={()=>openModalWindow('kakao')} />
                                    <div className='siteFont'>카카오로 로그인하기</div>
                                </div>  
                            </div>
                            {/*  Oauth2.0 인증 END */}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;