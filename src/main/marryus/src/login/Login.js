import React, { useRef, useState } from 'react';
import { GiLockedHeart } from "react-icons/gi";
import loginImg from '../s_images/loginImage.jpg'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const history = useHistory()

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
            }

        }catch(error) {
            console.log('로그인 실패 : ', error.response.data);
        }

    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                    <p style={{marginTop:'140px', fontSize:'32pt', fontWeight:'bold', color:'#F8D3D3', textShadow:'2px 2px 2px rgba(0,0,0, 0.5)'}}>♥ 로그인 ♥</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'500px', display:'flex', justifyContent:'center', alignContent:'center', background:'#FFF0F5'}}>
                    <div style={{background:'#FFE4E1', width:'1200px', height:'400px', margin:'50px 0', display:'flex', justifyContent:'center', alignContent:'center'}}>
                        <div style={{marginTop:'50px', position:'relative'}}>
                            <GiLockedHeart style={{width:'60px', height:'60px', color:'silver'}}/>
                        </div>
                        <div style={{marginTop:'150px', position:'absolute', fontWeight:'bold'}}>
                            이메일 <input type='text' ref={emailRef} style={{width:'250px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'20px'}}/>
                        </div>
                        <div style={{marginTop:'190px', position:'absolute', fontWeight:'bold'}}>
                            비밀번호 <input type='password' ref={passwordRef} style={{width:'250px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'6px', fontFamily: 'Arial, sans-serif'}}/>
                        </div>
                        <div style={{marginTop:'150px', position:'absolute', fontWeight:'bold', marginLeft:'400px'}}>
                            <button style={{width:'70px', height:'70px', borderRadius:'5px', background:'#5DC060', border:'none', cursor:'pointer', fontWeight:'bold'}} onClick={handleLogin}>로그인</button>
                        </div>
                        <div style={{marginTop:'250px', position:'absolute', fontWeight:'bold'}}>
                            <Link to='/findId'>
                                <button style={{background:'none', border:'1px solid gray', cursor:'pointer', fontWeight:'bold', padding:'5px'}}>아이디/비밀번호 찾기</button>
                            </Link>
                            <Link to='/signup'>
                                <button style={{background:'none', border:'1px solid gray', cursor:'pointer', marginLeft:'7px', fontWeight:'bold', padding:'5px'}}>회원가입</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;