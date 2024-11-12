import React, { useEffect, useRef, useState } from 'react';
import loginImg from '../s_images/loginImage.jpg'
import { FaHeart } from "react-icons/fa6";
import './signup.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import './calendar.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const OauthSingUp = () => {
    const history = useHistory();
    const [joinHover,setJoinHover] = useState(false)
    const [emailAgree,setEmailAgree] = useState('')
    const [date, setDate] = useState(null); // 선택된 날짜 상태
    const [showCalendar, setShowCalendar] = useState(false); // 달력 표시 상태
    const [noWeddingDate, setNoWeddingDate] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [isDomainInputDisabled, setIsDomainInputDisabled] = useState(false);
    const [isEmailAvailable, setIsEmailAvailable] = useState(null); // 이메일 중복 여부
   
    const domainInput = useRef(null); // 도메인 입력 필드 참조
   
    
    const addrInput = useRef(null); // 주소 입력 필드 참조
    const hopeAreaInput = useRef(null); // 희망지역 입력 필드 참조
    const weddingDateInput = useRef(null); // 결혼예정일 입력 필드 참조
    const phonePart1Ref = useRef(null);
    const phonePart2Ref = useRef(null);
    const phonePart3Ref = useRef(null);
    const weddingDateCheck = useRef(null);

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

    const handleEmailAgreeChange = (e) => {
        setEmailAgree(e.target.value);
    };


    const handleJoin = async () => { 
        const phonePart1 = phonePart1Ref.current.value; // select로 선택된 번호 앞자리
        const phonePart2 = phonePart2Ref.current.value; // 첫 번째 input
        const phonePart3 = phonePart3Ref.current.value; // 두 번째 input

        const phone = `${phonePart1}-${phonePart2}-${phonePart3}`; // 전화번호
        const addr = addrInput.current.value; // 주소
        const hopeArea = hopeAreaInput.current.value; // 희망지역
        const weddingDate = weddingDateInput.current.value; // 결혼예정일
        const emailAgreeValue = emailAgree === '이메일 수신 동의' ? 'Y' : 'N'
        if(!phonePart2){
            alert('전화번호를 정확히 입력해주세요.')
            phonePart2Ref.current.focus();
            return
        }

        if(!phonePart3){
            alert('전화번호를 정확히 입력해주세요.')
            phonePart3Ref.current.focus();
            return
        }

        if(!addr){
            alert('주소를 입력해주세요.')
            addrInput.current.focus();
            return
        }

        if(!hopeArea){
            alert('예식희망지역을 선택해주세요.')
            hopeAreaInput.current.focus();
            return
        }

        if(!weddingDate && !weddingDateCheck){
            alert('결혼예정일을 선택해주세요.')
            return
        }

        // 백엔드로 데이터 전송
        const memberData = {
            phone: phone,
            addr: addr,
            hopeArea: hopeArea,
            weddingDate: weddingDate,
            emailAgree: emailAgreeValue,
        };

        try {
            const response = await axios.post('/api/oauthregister', memberData);
            if (response.status === 201) {
                alert('회원가입이 성공적으로 완료되었습니다.');
                history.push('/');
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('이미 사용 중인 이메일입니다.'); // 중복 이메일 처리
            } else {
                console.error('회원가입 오류:', error);
                alert('회원가입 중 오류가 발생했습니다.');
            }
        }

    }

    const handleNoWeddingDateChange = (e) => {

        setNoWeddingDate(e.target.checked);

        if (e.target.checked) {
            setDate(null); // 미정 선택 시 날짜 초기화
        }

    };

    const handleDomainChange = (event) => {

        const domain = event.target.value;
    
        setSelectedDomain(domain);
    
        if (domain !== '직접입력') {

            domainInput.current.value = domain; // 선택된 도메인을 domainInput에 설정
            setIsDomainInputDisabled(true); // 도메인 입력 비활성화

        } else {

            domainInput.current.value = ''; // '직접입력'이 선택되면 domainInput 비워줌
            setIsDomainInputDisabled(false); // 도메인 입력 활성화
            setSelectedDomain('');

        }
        
    };


    const [data,setData] = useState({});

    useEffect(()=>{
        axios.get('/api/oauthUserInfo',{withCredentials: true})
        .then(res=>setData(res.data))
        .catch(error=>console.log(error))
    },[])


    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                    <p style={{marginTop:'140px', fontSize:'32pt', fontWeight:'bold', color:'#F8D3D3', textShadow:'2px 2px 2px rgba(0,0,0, 0.5)'}}>♥ 추가정보입력 ♥</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'700px', background:'#FFE4E1'}}>

                    <h2 style={{padding:'50px 70px 0px 70px'}}>내 정보 입력</h2>                  
                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)', borderTop:'1px solid gray'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>휴대폰</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'653px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center', borderTop:'1px solid gray'}}>
                        <select style={{marginLeft:'20px'}} ref={phonePart1Ref}>
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
                        </select> - <input type='text' style={{width:'70px'}} ref={phonePart2Ref}/> - <input type='text' style={{width:'70px'}} ref={phonePart3Ref}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>주소</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'705px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' ref={addrInput} style={{marginLeft:'20px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>예식희망지역</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'756px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' ref={hopeAreaInput} style={{marginLeft:'20px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>결혼예정일</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'807px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input
                            style={{ marginLeft: '20px', paddingLeft:'12px' }}
                            ref={weddingDateInput}
                            type="text"
                            value={formattedDate} // 선택된 날짜를 표시
                            onFocus={() => setShowCalendar(true)} // 포커스 시 달력 표시
                            onBlur={handleBlur} // 포커스 벗어나면 달력 숨기기
                            placeholder="날짜를 선택하세요"
                            lang='ko'
                            disabled={noWeddingDate} // 미정 체크 시 비활성화
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
                        <input type='checkbox' style={{marginLeft:'15px'}} checked={noWeddingDate} onChange={handleNoWeddingDateChange}/> 미정
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid gray'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>이메일 수신여부</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'858px', borderBottom:'1px solid gray', alignContent:'center'}}>
                        <input type='radio' value={'이메일 수신 동의'} style={{marginLeft:'20px', fontSize:'8pt'}} onChange={handleEmailAgreeChange}/>이메일 수신 동의
                        <input type='radio' value={'이메일 수신 거부'} style={{marginLeft:'20px', fontSize:'8pt'}} onChange={handleEmailAgreeChange}/>이메일 수신 거부
                    </div>

                    <div style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'30px'}}>
                        <button className='signUpHover' style={{width:'150px', height:'70px', fontSize:'16pt', fontWeight:'bold', background:'#5DC060', border:'none', cursor:'pointer', borderRadius:'5px'}}
                        onClick={handleJoin}
                        onMouseEnter={() => setJoinHover(true)} 
                        onMouseLeave={() => setJoinHover(false)}>
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

export default OauthSingUp;