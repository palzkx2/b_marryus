import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const PaymentInputs = ({setOrderNum}) => {
    
    const [btnToggle,setBtnToggle] = useState(false);
    

   const history = useHistory();
   const [formData, setFormData] = useState({
    englishName: '', // 영문 이름 //수정한데이터
    englishFamilyName: '', // 영문 성 //수정한데이터
    email: '', // 이메일
    phone: '' // 전화번호
});

    const changeInput = (evt) =>{
        const {value, name} = evt.target;
        
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log("Input changed:", name, value);

    }
    const ssgOrderConfirm = async(evt) =>{

        evt.preventDefault();

        try{
            const payload = { // 서버가 요청하는 형식에 맞추어 payload 생성 // 수정한 부분
                englishName: formData.englishName,
                englishFamilyName: formData.englishFamilyName,
                email: formData.email,
                phone: formData.phone,
                payMethod: 'CREDIT_CARD'
            };
            const response =await axios.post('http://localhost:8080/api/order/done',payload, {withCredentials: true});
            console.log("서버응답데이터:" ,response.data);
            alert('입력정보 저장이 완료되었습니다.')
            setBtnToggle(true)
            setOrderNum(response.data)
            history.push('/payment');
        }catch(error){
            console.error("제출 중 오류 발생:", error.response ? error.response.data : error.message);
        }


    }
 
    return (
        <div>
           <div className='reservationInformation' style={{ width: '90%', maxWidth: '472px', height: '414px', margin: '0 auto', padding: '20px' }}>
               <h3 className='ritems'>예약 정보 입력
                    {    
                        btnToggle &&
                        <button style={{marginLeft:'30px'}} onClick={()=>setBtnToggle(false)}>수정</button>
                    }
               </h3>
               

               <div className='ritemsName' style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
                       <label style={{ marginBottom: '5px' }}>영문 이름</label>
                       <input disabled={btnToggle} name='englishName' value={formData.englishName} onChange={changeInput} placeholder='gildong' style={{ width: '100%', height: '30px', padding: '5px' }} /> {/* 수정한데이터 */}
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', width: '48%' }}>
                       <label style={{ marginBottom: '5px' }}>영문 성</label>
                       <input disabled={btnToggle} name='englishFamilyName' value={formData.englishFamilyName} onChange={changeInput} placeholder='hong' style={{ width: '100%', height: '30px', padding: '5px' }} /> {/* 수정한데이터 */}
                   </div>
               </div>

               <div>
                   <p style={{ fontSize: '10pt', marginTop: '-11px', color: '#999' }}>
                       띄어쓰기 없이 입력해주세요.
                   </p>
               </div>

               <div className='ritemsEmail' style={{ display: 'flex', flexDirection: 'column', margin: '15px 0' }}>
                   <label style={{ marginBottom: '5px' }}>이메일</label>
                   <input disabled={btnToggle} name='email' value={formData.email} onChange={changeInput} placeholder='email@example.com' style={{ width: '100%', height: '30px', padding: '5px' }} />
               </div>

               <div className='ritemsPhone' style={{ display: 'flex', flexDirection: 'column', margin: '15px 0' }}>
                   <label style={{ marginBottom: '5px' }}>번호</label>
                   <input disabled={btnToggle} name='phone' value={formData.phone} onChange={changeInput} placeholder='010-0000-0000' style={{ width: '100%', height: '30px', padding: '5px' }} />
               </div>
               <div className='lastButton'>
                   <button onClick={ssgOrderConfirm} className={`lastBtn ${btnToggle ? 'active' : 'lastInactiveBtn'}`} style={{
                       display: 'flex',
                       justifyContent: 'center', alignItems: 'center', width: '103%',
                       height: '50px' 
                   }}>
                       입력하기
                   </button>
               </div>
           </div>
       </div>
    );
};

export default PaymentInputs;