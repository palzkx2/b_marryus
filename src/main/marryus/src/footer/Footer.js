import React from 'react';
import './Footer.css'
import instagram from '../s_images/instagram.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div>
                <p style={{color:'#fff', fontWeight:'bold', fontSize:'32px', marginTop:'36px'}}>MarryUs</p>
                <p style={{color:'#fff', fontSize:'9pt'}}>메리어스</p>
                <p style={{color:'gray', fontSize:'9pt', marginTop:'16px'}}>(주)메리어스코리아</p>
                <p style={{color:'gray', fontSize:'9pt',}}>팀원 정준우,황대웅,임경륜,이윤용</p>
                <p style={{color:'gray', fontSize:'9pt',}}>COPYRIGHT 2024 MARRYUS ALL RIGHTS RESERVED.</p>
            </div>

            <div style={{paddingLeft:'20px', paddingTop:'30px', marginLeft:'80px'}}>
                <p style={{marginTop:'20px'}}>
                    <img src={instagram} alt='instargram' width={22} height={22}></img>
                    <img src={instagram} alt='instargram' width={22} height={22} style={{paddingLeft:'15px'}}></img>
                    <img src={instagram} alt='instargram' width={22} height={22} style={{paddingLeft:'15px'}}></img>
                    <img src={instagram} alt='instargram' width={22} height={22} style={{paddingLeft:'15px'}}></img>
                    <img src={instagram} alt='instargram' width={22} height={22} style={{paddingLeft:'15px'}}></img>
                    <img src={instagram} alt='instargram' width={22} height={22} style={{paddingLeft:'15px'}}></img>
                </p>
                <p style={{paddingTop:'15px', color:'white', fontSize:'9pt'}}>Infomation</p>
                <p style={{color:'gray', fontSize:'9pt', marginTop:'16px'}}>사업자등록번호 123 45 78910</p>
                <p style={{color:'gray', fontSize:'9pt'}}>통신판매업신고 제2024-서울강남-00000호</p>
                <p style={{color:'gray', fontSize:'9pt'}}>개인정보관리책임자 <strong>XXX</strong></p>
            </div>

            <div style={{marginLeft:'100px'}}>
                <div style={{flexDirection:'row', display:'flex', fontSize:'10pt', color:'white', paddingTop:'30px', marginTop:'20px'}}>
                    <p>회사소개</p>
                    <p style={{paddingLeft:'40px'}}>이용약관</p>
                    <p style={{paddingLeft:'40px'}}>개인정보처리방침</p>
                    <p style={{paddingLeft:'40px'}}>오시는 길</p>
                </div>
                <p style={{paddingTop:'15px', color:'white', fontSize:'9pt'}}>Contact Us</p>
                <p style={{color:'gray', fontSize:'9pt', marginTop:'16px'}}>오전 10:00 - 오후 07:00 (화요일-토요일)</p>
                <p style={{color:'gray', fontSize:'9pt'}}><strong>T</strong> 02 0000 0000&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<strong>F</strong> 02 1111 1111</p>
                <p style={{color:'gray', fontSize:'9pt'}}>서울특별시 강남구 테헤란로 124 4층 메리어스</p>
            </div>
        </div>
    );
};

export default Footer;