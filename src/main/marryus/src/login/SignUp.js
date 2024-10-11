import React from 'react';
import loginImg from '../s_images/loginImage.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SignUp = () => {

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                    <p style={{marginTop:'140px', fontSize:'32pt', fontWeight:'bold', color:'#F8D3D3', textShadow:'2px 2px 2px rgba(0,0,0, 0.5)'}}>♥ 회원가입 ♥</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'800px', background:'#FFF0F5'}}>
                    <h2 style={{padding:'50px 70px 0px 70px'}}>이용약관</h2>
                    <div style={{width:'1250px', height:'200px', background:'white', margin:'0 70px 0 70px', border:'1px solid black', overflowY:'auto'}}>
                        <p style={{fontSize:'14pt', paddingLeft:'25px', paddingTop:'10px'}}>제 1조</p>
                        <p style={{fontSize:'14pt', paddingLeft:'25px'}}>제 2조</p>
                        <p style={{fontSize:'14pt', paddingLeft:'25px'}}>제 3조</p>
                        <p style={{fontSize:'14pt', paddingLeft:'25px'}}>제 4조</p>
                        <p style={{fontSize:'14pt', paddingLeft:'25px'}}>제 5조</p>
                        <p style={{fontSize:'14pt', paddingLeft:'25px'}}>제 6조</p>
                        <p style={{fontSize:'14pt', paddingLeft:'25px'}}>제 7조</p>
                        ......
                    </div>
                    <div style={{alignContent:'end', display:'flex', justifyContent:'end', marginRight:'80px', marginTop:'10px'}}>
                        <input type='checkbox' style={{marginTop:'3px'}}/> 위 약관에 동의합니다.
                    </div>
                    <h2 style={{padding:'50px 70px 0px 70px'}}>개인정보보호정책</h2>
                    <div style={{width:'1250px', height:'200px', background:'white', margin:'0 70px 0 70px', border:'1px solid black', overflowY:'auto'}}>
                        <p style={{fontWeight:'bold', padding:'10px', marginBottom:'5px', fontSize:'14pt'}}>개인정보취급방침</p>
                            <p style={{paddingLeft:'25px', fontSize:'11pt', marginBottom:'0'}}>'메리어스'는 (이하 '회사') 고객님의 개인정보를 중요시하며, "정보통신망 이용촉진 및 정보보호"에 관한 법률을 준수하고 있습니다.</p>
                            <p style={{paddingLeft:'25px', fontSize:'11pt', marginBottom:'0'}}>회사는 개인정보취급방침을 통하여 고객님께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며, 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.</p>
                            <p style={{paddingLeft:'25px', fontSize:'11pt', marginBottom:'0'}}>회사는 개인정보취급방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.</p>
                            <p style={{paddingLeft:'25px', fontSize:'11pt', marginBottom:'0'}}>ο 본 방침은 : 2010 년 08 월 20 일 부터 시행됩니다.</p>
                        <p style={{fontWeight:'bold', padding:'10px', marginBottom:'5px', fontSize:'14pt'}}>수집하는 개인정보 항목</p>
                            <p style={{paddingLeft:'25px', fontSize:'11pt', marginBottom:'0'}}>회사는 회원가입, 상담, 서비스 신청 등등을 위해 아래와 같은 개인정보를 수집하고 있습니다.</p>
                            <p style={{paddingLeft:'25px', fontSize:'11pt', marginBottom:'0'}}>ο 수집항목 : 이름 , 비밀번호 , 전화번호 , 이메일 , 서비스 이용기록 , 접속 로그 , 쿠키 , 접속 IP 정보</p>
                            <p style={{paddingLeft:'25px', fontSize:'11pt', marginBottom:'0'}}>ο 개인정보 수집방법 : 홈페이지(회원가입,이벤트신청,서비스문의,게시판,견적비교)</p>
                    </div>
                    <div style={{alignContent:'end', display:'flex', justifyContent:'end', marginRight:'80px', marginTop:'10px'}}>
                        <input type='checkbox' style={{marginTop:'3px'}}/> 위 약관에 동의합니다.
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'10px'}}>
                        <Link to='/join'>
                            <button style={{width:'150px', height:'60px', fontSize:'16pt', fontWeight:'bold', background:'#5DC060', border:'none', cursor:'pointer', borderRadius:'5px'}}>
                                확인
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;