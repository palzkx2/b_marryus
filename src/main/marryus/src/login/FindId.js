import React from 'react';
import { GiLockedHeart } from 'react-icons/gi';
import loginImg from '../s_images/loginImage.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const FindId = () => {
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
                            이메일 
                            <input type='text' style={{width:'140px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'24px'}}/> @
                            <input type='text' style={{width:'90px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'5px'}}/>
                        </div>
                        <div>
                            <select style={{position:'absolute', width:'100px', height:'30px', borderRadius:'5px', border:'none', marginTop:'150px', marginLeft:'135px'}}>
                                <option>naver.com</option>
                                <option>gmail.com</option>
                                <option>nate.com</option>
                                <option>daum.net</option>
                            </select>
                        </div>
                        <div style={{marginTop:'190px', position:'absolute', fontWeight:'bold'}}>
                            이름 <input type='text' style={{width:'250px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'33px'}}/>
                        </div>
                        <div style={{marginTop:'230px', position:'absolute', fontWeight:'bold'}}>
                            연락처 
                            <select style={{width:'60px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'24px'}}>
                                <option>010</option>
                                <option>011</option>
                                <option>012</option>
                                <option>013</option>
                                <option>014</option>
                                <option>015</option>
                                <option>016</option>
                                <option>017</option>
                                <option>018</option>
                                <option>019</option>
                            </select> -
                            <input type='text' style={{width:'80px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'5px'}}/> -
                            <input type='text' style={{width:'80px', height:'30px', borderRadius:'5px', border:'none', marginLeft:'5px'}}/>
                        </div>
                        <div style={{marginTop:'290px', position:'absolute', fontWeight:'bold'}}>
                            <button style={{background:'none', border:'1px solid gray', cursor:'pointer', fontWeight:'bold', padding:'5px'}}>확인</button>
                            <Link to='/'>
                                <button style={{background:'none', border:'1px solid gray', cursor:'pointer', marginLeft:'7px', fontWeight:'bold', padding:'5px'}}>취소</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindId;