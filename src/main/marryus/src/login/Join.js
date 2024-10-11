import React, { useRef, useState } from 'react';
import loginImg from '../s_images/loginImage.jpg'
import { FaHeart } from "react-icons/fa6";
import './signup.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import './calendar.css'

const Join = () => {

    const [joinHover,setJoinHover] = useState(false)
    const [date, setDate] = useState(null); // 선택된 날짜 상태
    const [showCalendar, setShowCalendar] = useState(false); // 달력 표시 상태
    const inputRef = useRef(null); // input 필드 참조

    // 요일 배열
    const weekdaysKorean = ['일', '월', '화', '수', '목', '금', '토'];

    // 선택된 날짜의 요일을 한글로 표시
    const formattedDate = date ? `${format(date, 'yyyy년 MM월 dd일')} ${weekdaysKorean[date.getDay()]}요일` : '';

    // 날짜 선택 시 처리
    const onDateChange = (newDate) => {
        setDate(newDate); // 선택된 날짜 상태 업데이트
        setShowCalendar(false); // 달력 닫기
    };

    const handleBlur = (e) => {
        const isCalendar = e.relatedTarget && e.relatedTarget.closest('.react-calendar'); // 달력 내부 요소인지 확인
        if (!e.currentTarget.contains(e.relatedTarget) && !isCalendar) {
            setShowCalendar(false); // 달력 닫기
        }
    };

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                    <p style={{marginTop:'140px', fontSize:'32pt', fontWeight:'bold', color:'#F8D3D3', textShadow:'2px 2px 2px rgba(0,0,0, 0.5)'}}>♥ 회원가입 ♥</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'700px', background:'#FFE4E1'}}>
                    <h2 style={{padding:'50px 70px 0px 70px'}}>내 정보 입력</h2>
                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderTop:'1px solid gray', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>이메일 (아이디)</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'564px', borderTop:'1px solid gray', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' style={{marginLeft:'20px'}}/> @ <input type='text' style={{width:'90px'}}/>
                        <select style={{marginLeft:'10px', fontSize:'9pt', height:'19px'}}>
                            <option>직접입력</option>
                            <option>naver.com</option>
                            <option>gmail.com</option>
                            <option>nate.com</option>
                            <option>daum.net</option>
                        </select>
                        <button style={{marginLeft:'5px', fontSize:'8pt', padding:'4px 7px', background:'gray', border:'1px solid gray', fontWeight:'bold', cursor:'pointer', color:'white'}}>중복확인</button>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>비밀번호</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'616px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' style={{marginLeft:'20px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>비밀번호 확인</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'667px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' style={{marginLeft:'20px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>성명</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'718px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' style={{marginLeft:'20px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>휴대폰</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'769px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <select style={{marginLeft:'20px'}}>
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
                        </select> - <input type='text' style={{width:'70px'}}/> - <input type='text' style={{width:'70px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>예식희망지역</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'820px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' style={{marginLeft:'20px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>결혼예정일</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'871px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input
                            style={{ marginLeft: '20px', paddingLeft:'12px' }}
                            ref={inputRef}
                            type="text"
                            value={formattedDate} // 선택된 날짜를 표시
                            onFocus={() => setShowCalendar(true)} // 포커스 시 달력 표시
                            onBlur={handleBlur} // 포커스 벗어나면 달력 숨기기
                            placeholder="날짜를 선택하세요"
                            lang='ko'
                        />
                        <div
                            className={`transCale ${showCalendar ? 'active' : ''}`} // showCalendar에 따라 클래스 추가
                        >
                            <Calendar
                                onChange={onDateChange}
                                value={date}
                                locale="ko-KR" // 한국어 설정
                            />
                        </div>
                        <input type='checkbox' style={{marginLeft:'15px'}}/> 미정
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid gray'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>이메일 수신여부</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'922px', borderBottom:'1px solid gray', alignContent:'center'}}>
                        <input type='radio' name='emailAgree' style={{marginLeft:'20px', fontSize:'8pt'}}/>이메일 수신 동의
                        <input type='radio' name='emailAgree' style={{marginLeft:'20px', fontSize:'8pt'}}/>이메일 수신 거부
                    </div>

                    <div style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'30px'}}>
                        <button className='signUpHover' style={{width:'150px', height:'70px', fontSize:'16pt', fontWeight:'bold', background:'#5DC060', border:'none', cursor:'pointer', borderRadius:'5px'}}
                        onMouseEnter={() => setJoinHover(true)} onMouseLeave={() => setJoinHover(false)}>
                            <FaHeart style={{marginRight:'10px'}}/>
                            {
                                joinHover ? 'Yes!' : 'Marry?'
                            }
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Join;