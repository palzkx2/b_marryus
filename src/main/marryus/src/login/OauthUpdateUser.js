import React, { useEffect, useRef, useState } from 'react';
import loginImg from '../s_images/loginImage.jpg';
import { FaHeart } from "react-icons/fa6";
import './signup.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import './calendar.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const OauthUpdateUser = () => {
    const [joinHover,setJoinHover] = useState(false)
    const [emailAgree,setEmailAgree] = useState('')
    const [date, setDate] = useState(null); // 선택된 날짜 상태
    const [showCalendar, setShowCalendar] = useState(false); // 달력 표시 상태
    const inputRef = useRef(null); // input 필드 참조
    const [emailInput, setEmailInput] = useState('');
    const [domainInput, setDomainInput] = useState('');
    const [name, setName] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');
    const [addr, setAddr] = useState('');
    const [hopeArea, setHopeArea] = useState('');
    const [weddingDate, setWeddingDate] = useState('');

    const history = useHistory()

    useEffect(() => {

        const fetchSessionData = async () => {

            try {
                const response = await axios.get('/api/oauthReaduser', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
                console.log('세션 정보 : ', response.data)
                const storedEmail = response.data.email;
                console.log('response.data.email받기-------------',response.data.email)
                const storedPhone = response.data.phone;

                if(storedEmail){
                    const emailParts = storedEmail.split('@');

                    if(emailParts.length === 2){
                        setEmailInput(emailParts[0])
                        setDomainInput(emailParts[1])
                        console.log('emailInput받아옴---------------',emailParts[0])
                        console.log('domainInput받아옴---------------',emailParts[1])
                    }
                }

                if(storedPhone){
                    const phoneParts = storedPhone.split('-');

                    if(phoneParts.length === 3){
                        setPhone1(phoneParts[0])
                        setPhone2(phoneParts[1])
                        setPhone3(phoneParts[2])
                        console.log('phone1받아옴---------------',phoneParts[0])
                        console.log('phone2받아옴---------------',phoneParts[1])
                        console.log('phone3받아옴---------------',phoneParts[2])
                    }
                }

                setName(response.data.name);
                setAddr(response.data.addr);
                setHopeArea(response.data.hopeArea);
                setWeddingDate(response.data.weddingDate);
                console.log('weddingDate받아옴------------------',weddingDate)

            } catch (error) {
                console.error('세션 정보 가져오기 실패:', error);
            }

        };

        fetchSessionData();

    }, []);

    const handleUpdate = async () => {
        const updatedEmail = `${emailInput}@${domainInput}`; // 이메일 조합
        const updatePhone = `${phone1}-${phone2}-${phone3}`;
        const updatedUser = { email: updatedEmail, name, phone: updatePhone, addr, hopeArea, weddingDate };

        const response = await fetch('/api/oauthUpdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            alert('정보가 수정되었습니다.');
            history.push('/myPage')
        } else {
            alert('수정에 실패했습니다.');
        }
    };

    // 요일 배열
    const weekdaysKorean = ['일', '월', '화', '수', '목', '금', '토'];

    // 날짜 선택 시 처리
    const onDateChange = (newDate) => {
        setDate(newDate); // 선택된 날짜 상태 업데이트
        // 선택된 날짜의 요일을 한글로 표시
        const formattedDate = date ? `${format(newDate, 'yyyy년 MM월 dd일')} ${weekdaysKorean[newDate.getDay()]}요일` : '';
        setWeddingDate(formattedDate)

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
                    <p style={{marginTop:'140px', fontSize:'32pt', fontWeight:'bold', color:'#F8D3D3', textShadow:'2px 2px 2px rgba(0,0,0, 0.5)'}}>♥ 회원정보수정 ♥</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'700px', background:'#FFE4E1'}}>
                    <h2 style={{padding:'50px 70px 0px 70px'}}>수정 할 정보 입력</h2>
                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderTop:'1px solid gray', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>이메일 (아이디)</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'564px', borderTop:'1px solid gray', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center', marginTop:83}}>
                        <input type='text' style={{marginLeft:'20px', color:'rgba(0,0,0,0.4)'}} value={emailInput} readOnly/> @ <input type='text' style={{width:'90px', color:'rgba(0,0,0,0.4)'}} value={domainInput} readOnly/>
                        <select style={{marginLeft:'10px', fontSize:'9pt', height:'19px', color:'rgba(0,0,0,0.4)'}} disabled={true}>
                            <option>직접입력</option>
                            <option>naver.com</option>
                            <option>gmail.com</option>
                            <option>nate.com</option>
                            <option>daum.net</option>
                        </select>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>성명</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'615px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center', marginTop:84}}>
                        <input type='text' style={{marginLeft:'20px', color:'rgba(0,0,0,0.4)'}} value={name} readOnly/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>휴대폰</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'665.9px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center', marginTop:84}}>
                        <select style={{marginLeft:'20px'}} value={phone1} onChange={(e) => setPhone1(e.target.value)}>
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
                        </select> - <input type='text' style={{width:'70px'}} value={phone2} onChange={(e) => setPhone2(e.target.value)}/> - <input type='text' style={{width:'70px'}} value={phone3} onChange={(e) => setPhone3(e.target.value)}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>주소</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'718.3px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center', marginTop:83}}>
                        <input type='text' style={{marginLeft:'20px'}} value={addr} onChange={(e) => setAddr(e.target.value)}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>예식희망지역</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'768.3px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center', marginTop:84}}>
                        <input type='text' style={{marginLeft:'20px'}} value={hopeArea} onChange={(e) => setHopeArea(e.target.value)}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>결혼예정일</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'820.1px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center', marginTop:83}}>
                        <input
                            style={{ marginLeft: '20px', paddingLeft:'12px' }}
                            ref={inputRef}
                            type="text"
                            value={weddingDate} // 선택된 날짜를 표시
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
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'869.9px', borderBottom:'1px solid gray', alignContent:'center', marginTop:84}}>
                        <input type='radio' value={'Y'} name='emailAgree' style={{marginLeft:'20px', fontSize:'8pt'}}/>이메일 수신 동의
                        <input type='radio' value={'N'} name='emailAgree' style={{marginLeft:'20px', fontSize:'8pt'}}/>이메일 수신 거부
                    </div>

                    <div style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'30px'}}>
                        <button onClick={handleUpdate} className='signUpHover' style={{width:'150px', height:'70px', fontSize:'16pt', fontWeight:'bold', background:'#5DC060', border:'none', cursor:'pointer', borderRadius:'5px'}}
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

export default OauthUpdateUser;
