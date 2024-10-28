import React, { useRef, useState } from 'react';
import loginImg from '../s_images/loginImage.jpg'
import { FaHeart } from "react-icons/fa6";
import './signup.css'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import './calendar.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Join = () => {

    const history = useHistory();
    const [joinHover,setJoinHover] = useState(false)
    const [emailAgree,setEmailAgree] = useState('')
    const [date, setDate] = useState(null); // 선택된 날짜 상태
    const [showCalendar, setShowCalendar] = useState(false); // 달력 표시 상태
    const [noWeddingDate, setNoWeddingDate] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('');
    const [isDomainInputDisabled, setIsDomainInputDisabled] = useState(false);
    const [isEmailAvailable, setIsEmailAvailable] = useState(null); // 이메일 중복 여부
    const emailInput = useRef(null); // 이메일 입력 필드 참조
    const domainInput = useRef(null); // 도메인 입력 필드 참조
    const passwordInput = useRef(null); // 비밀번호 입력 필드 참조
    const nameInput = useRef(null); // 성명 입력 필드 참조
    const addrInput = useRef(null); // 주소 입력 필드 참조
    const hopeAreaInput = useRef(null); // 희망지역 입력 필드 참조
    const weddingDateInput = useRef(null); // 결혼예정일 입력 필드 참조
    const phonePart1Ref = useRef(null);
    const phonePart2Ref = useRef(null);
    const phonePart3Ref = useRef(null);
    const confirmPasswordInput = useRef(null);
    const weddingDateCheck = useRef(null);

    const [certificationNumber, setCertificationNumber] = useState('');
    const [inputCertificationNumber, setInputCertificationNumber] = useState('');
    const [message, setMessage] = useState('');
    const [isCertificationNumberSent, setIsCertificationNumberSent] = useState(false);
    const [color,setColor] = useState('');
    const [accept, setAccept] = useState(false);

    const sendEmail = () => {

        const email = `${emailInput.current.value}@${domainInput.current.value}`

        console.log('email조합됐나----------', email)

        axios.post('/api/sendEmail',null,{params: {email}})
        .then(response => {
            setCertificationNumber(response.data)
            setIsCertificationNumberSent(true)
            setColor('blue')
            setAccept(true)
            setMessage('인증번호가 이메일로 발송되었습니다.')
        })
        .catch(() => {
            setIsCertificationNumberSent(false)
            setColor('red')
            setAccept(false)
            setMessage('인증번호 전송에 실패하였습니다.')
        });

    }

    const verifyCertificationNumber = () => {

        const trimmedInput = inputCertificationNumber.trim();
        const trimmedStored = String(certificationNumber).trim();

        if(trimmedInput === trimmedStored){
            setMessage('인증이 완료되었습니다.')
            setIsCertificationNumberSent(false)
            setAccept(true)
            setColor('blue')
        }else{
            setMessage('인증번호가 일치하지 않습니다.')
            setAccept(false)
            setColor('red')
        }

    }

    // 요일 배열
    const weekdaysKorean = ['일', '월', '화', '수', '목', '금', '토'];

    // 선택된 날짜의 요일을 한글로 표시
    const formattedDate = noWeddingDate ? '미정' : (date ? `${format(date, 'yyyy년 MM월 dd일')} ${weekdaysKorean[date.getDay()]}요일` : '');

    // 날짜 선택 시 처리
    const onDateChange = (newDate) => {
        setDate(newDate); // 선택된 날짜 상태 업데이트
        setNoWeddingDate(false);
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

    const handleEmailCheck = async () => {

        const email = `${emailInput.current.value}@${domainInput.current.value}`.trim();
    
        if (!email || emailInput.current.value === '' || domainInput.current.value === '') {
            alert('이메일을 입력해주세요.'); // 이메일이 비어있을 경우 경고
            return;
        }

        // 추가적인 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }
    
        try {

            const response = await axios.get(`/api/checkEmail?email=${encodeURIComponent(email)}`);
            
            if (response.data) {
                // 이미 사용 중인 이메일일 경우
                alert('이미 사용 중인 이메일입니다.');
            } else {
                // 사용 가능한 이메일일 경우
                setIsEmailAvailable(true);
                alert('사용 가능한 이메일입니다.');
            }

        } catch (error) {

            console.error('이메일 중복 확인 오류:', error);
            alert('이메일 중복 확인 중 오류가 발생했습니다.');

        }

    };

    const handleJoin = async () => {

        if (isEmailAvailable === null) {
            alert('이메일 중복 확인이 필요합니다.');
            return;
        }

        if(accept === false){
            alert('인증을 완료해주세요.')
            return;
        }

        const pwd1 = passwordInput.current.value;
        const confirmPassword = confirmPasswordInput.current.value;
        
        if (pwd1 !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 이메일 검증
        const email = `${emailInput.current.value}@${domainInput.current.value}`.trim();

        try {
            const emailCheckResponse = await axios.get('/api/checkEmail', {params:{email}});

            if (emailCheckResponse.data) {
                alert('이미 사용 중인 이메일입니다.'); // 중복된 이메일
                return;
            }

        } catch (error) {

            console.error('이메일 중복 확인 오류:', error);
            alert('이메일 중복 확인 중 오류가 발생했습니다.');
            return;

        }
        
        if (!email) {
            alert('이메일을 입력해주세요.'); // 이메일이 비어있을 경우 경고
            emailInput.current.focus();
            return;
        }

        // 추가적인 유효성 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        const phonePart1 = phonePart1Ref.current.value; // select로 선택된 번호 앞자리
        const phonePart2 = phonePart2Ref.current.value; // 첫 번째 input
        const phonePart3 = phonePart3Ref.current.value; // 두 번째 input

        const password = passwordInput.current.value; // 비밀번호
        const name = nameInput.current.value; // 성명
        const phone = `${phonePart1}${phonePart2}${phonePart3}`; // 전화번호
        const addr = addrInput.current.value; // 주소
        const hopeArea = hopeAreaInput.current.value; // 희망지역
        const weddingDate = weddingDateInput.current.value; // 결혼예정일
        const emailAgreeValue = emailAgree === '이메일 수신 동의' ? 'Y' : 'N'
        const userRole = email === 'marryus@marryus.com' ? 'ADMIN' : 'USER'

        if(!password){
            alert('비밀번호를 입력해주세요.')
            passwordInput.current.focus();
            return
        }

        if(!name){
            alert('이름을 입력해주세요.')
            nameInput.current.focus();
            return
        }

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
            email: email,
            password: password,
            name: name,
            phone: phone,
            addr: addr,
            hopeArea: hopeArea,
            weddingDate: weddingDate,
            emailAgree: emailAgreeValue,
            userRole: userRole
        };

        try {
            const response = await axios.post('/api/register', memberData);
            if (response.status === 201) {
                alert('회원가입이 성공적으로 완료되었습니다.');
                history.push('/login');
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

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                    <p style={{marginTop:'140px', fontSize:'32pt', fontWeight:'bold', color:'#F8D3D3', textShadow:'2px 2px 2px rgba(0,0,0, 0.5)'}}>♥ 회원가입 ♥</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'730px', background:'#FFE4E1'}}>

                    <h2 style={{padding:'50px 70px 0px 70px'}}>내 정보 입력</h2>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderTop:'1px solid gray', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>이메일 (아이디)</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'564px', borderTop:'1px solid gray', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' ref={emailInput} style={{marginLeft:'20px'}}/> @ <input type='text' ref={domainInput} style={{width:'90px'}} value={selectedDomain} disabled={isDomainInputDisabled} onChange={(e) => setSelectedDomain(e.target.value)}/>
                        <select style={{marginLeft:'10px', fontSize:'9pt', height:'19px'}} onChange={handleDomainChange}>
                            <option>직접입력</option>
                            <option>naver.com</option>
                            <option>gmail.com</option>
                            <option>nate.com</option>
                            <option>daum.net</option>
                        </select>
                        <button style={{marginLeft:'5px', fontSize:'8pt', padding:'4px 7px', background:'gray', border:'1px solid gray', fontWeight:'bold', cursor:'pointer', color:'white', position:'relative'}} onClick={handleEmailCheck}>중복확인</button>
                        {
                            <button style={{marginLeft:'5px', fontSize:'8pt', padding:'4px 7px', background:'gray', border:'1px solid gray', fontWeight:'bold', cursor:'pointer', color:'white', display:isEmailAvailable === null ? 'none' : 'block', position:'absolute', top:'15px', right:'525px'}} onClick={sendEmail}>인증번호발송</button>
                        }
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>인증번호</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'616px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' style={{marginLeft:'20px', fontFamily: 'Arial, sans-serif'}} disabled={isCertificationNumberSent ? false : true} value={inputCertificationNumber} onChange={(e) => setInputCertificationNumber(e.target.value)}/>
                        <button style={{marginLeft:'5px', fontSize:'8pt', padding:'4px 7px', background:'gray', border:'1px solid gray', fontWeight:'bold', cursor:'pointer', color:'white'}} onClick={verifyCertificationNumber}>인증하기</button>
                        <span style={{marginLeft:'10px', color:color, fontSize:'9pt'}}>{message}</span>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>비밀번호</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'667px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='password' ref={passwordInput} style={{marginLeft:'20px', fontFamily: 'Arial, sans-serif'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>비밀번호 확인</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'718px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='password' ref={confirmPasswordInput} style={{marginLeft:'20px', fontFamily: 'Arial, sans-serif'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>성명</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'769px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' ref={nameInput} style={{marginLeft:'20px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>휴대폰</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'820px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
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
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'871px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' ref={addrInput} style={{marginLeft:'20px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>예식희망지역</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'922px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
                        <input type='text' ref={hopeAreaInput} style={{marginLeft:'20px'}}/>
                    </div>

                    <div style={{width:'200px', height:'50px', background:'#C3E6CB', margin:'0 70px 0 70px', position:'relative', borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
                        <p style={{fontWeight:'bold', color:'gray', padding:'15px 30px'}}>결혼예정일</p>
                    </div>
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'973px', borderBottom:'1px solid rgba(0,0,0,0.1)', alignContent:'center'}}>
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
                    <div style={{width:'1050px', height:'50px', background:'none', position:'absolute', margin:'0 70px 0 270px', top:'1024px', borderBottom:'1px solid gray', alignContent:'center'}}>
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

export default Join;