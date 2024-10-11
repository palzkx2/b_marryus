import React from 'react';
import serviceCenterImg from '../s_images/serviceCenterImage.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './serviceCenter.css'

const ServiceCenter = () => {
    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${serviceCenterImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -220px)`}}>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{background:'beige', width:'1400px', height:'500px', display:'flex', justifyContent:'center', alignContent:'center', marginBottom:'50px'}}>
                    <div style={{width:'1200px', height:'400px', margin:'50px 0'}}>
                        <p style={{fontSize:'18pt', fontWeight:'bold'}}>고객센터</p>
                        <div style={{background:'#C2A67E', width:'100%', height:'60px', display:'flex', justifyContent:'start', alignContent:'start'}}>
                            <p style={{marginLeft:'30px', fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>순번</p>
                            <p style={{margin:'0 400px', fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>제목</p>
                            <p style={{marginRight:'70px', fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>작성자</p>
                            <p style={{marginRight:'70px', fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>작성일</p>
                            <p style={{fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>조회수</p>
                        </div>
                        <div style={{width:'100%', height:'50px', display:'flex', justifyContent:'start', alignContent:'start', borderBottom:'1px solid rgba(0,0,0,0.2)'}}>
                            <p style={{marginLeft:'25px', fontSize:'12pt', padding:'20px 0'}}>0001</p>
                            <div style={{marginLeft:'50px', margin:'auto'}}>
                                <p style={{fontSize:'12pt', padding:'20px 0'}}>메리어스 홈페이지 오픈 !</p>
                            </div>
                            <p style={{marginRight:'50px', fontSize:'12pt', padding:'20px 0'}}>관리자</p>
                            <p style={{marginRight:'50px', fontSize:'12pt', padding:'20px 0'}}>2024-10-10</p>
                            <p style={{fontSize:'12pt', padding:'20px 0', marginRight:'40px'}}>0000</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{marginBottom:'50px'}}>
                    <Link to='/'>
                        <button className='btnHover'>메인으로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCenter;