import axios from 'axios';
import React, { useState } from 'react';
import loginImg from '../s_images/weddingHall/wdHallBar1.jpg'
import './insertWeddingHall.css'

const InsertWeddingHall = () => {

    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState('');
    const [addr, setAddr] = useState('');
    const [tag, setTag] = useState('');
    const [buffet, setBuffet] = useState('');
    const [price, setPrice] = useState('');
    const [wido,setWido] = useState('');
    const [gyungdo,setGyungdo] = useState('');
    const [imgType,setImgType] = useState('');
    const [fileName, setFileName] = useState('첨부파일'); // 기본 파일명 설정

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);

        const file = e.target.files[0];

        if (file) {
            setFileName(file.name); // 선택된 파일명을 업데이트
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form Data:', { 
            imageName: imageFile.name, 
            name, 
            addr, 
            tag, 
            buffet, 
            price,
            wido,
            gyungdo,
            imgType
        });

        const formData = new FormData();
        formData.append('imageName', imageFile.name); 
        formData.append('imageFile', imageFile);
        formData.append('name', name);
        formData.append('addr', addr);
        formData.append('tag', tag);
        formData.append('buffet', buffet);
        formData.append('price', Number(price));
        formData.append('wido', wido);
        formData.append('gyungdo', gyungdo);
        formData.append('imgType', imgType);

        const currentTime = new Date().toISOString();
        formData.append('created',currentTime);

        try {
            const response = await axios.post('http://192.168.16.23:8080/api/insertWeddingHall', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data); // 성공 메시지 표시
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('웨딩홀 추가 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>

                <div style={{margin:'auto',width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom:'50px' }}>
                <form onSubmit={handleSubmit} style={{
                    width: '1000px',
                    padding: '30px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    <h2 style={{ textAlign: 'center', color: '#333' }}>웨딩홀 추가</h2>

                    <div style={{ marginBottom: '15px', display:'flex', justifyContent:'center', alignContent:'center' }}>
                        <div className='filebox' style={{ display: 'flex', alignItems: 'center', width:'562px' }}>
                        <label style={{marginRight:'7px'}}>이미지</label>
                            <input
                            className="upload-name"
                            value={fileName}
                            readOnly
                            style={{
                                flex: '1',
                                padding: '8px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                marginRight: '8px'
                            }}
                            />
                            <label htmlFor="file" style={{
                            padding: '8px 16px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            }}>파일 찾기</label>
                            <input type="file" id="file" onChange={handleFileChange} required style={{ display: 'none' }} />
                        </div>
                    </div>

                    {/* 반복되는 입력 필드들을 공통 스타일로 적용 */}
                    {[
                        { label: "이름", value: name, onChange: setName },
                        { label: "주소", value: addr, onChange: setAddr },
                        { label: "태그", value: tag, onChange: setTag },
                        { label: "뷔페", value: buffet, onChange: setBuffet },
                        { label: "가격", value: price, onChange: setPrice },
                        { label: "위도", value: wido, onChange: setWido },
                        { label: "경도", value: gyungdo, onChange: setGyungdo },
                    ].map((field, index) => (
                    <div key={index} style={{ marginBottom: '15px', display:'flex', justifyContent:'center', alignContent:'center' }}>
                        <label style={{marginRight:'20px', paddingTop:"7px"}}>{field.label}</label>
                        <input
                        type="text"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        required
                        style={{
                            width: '500px',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                        }}
                        />
                    </div>
                    ))}

                    {/* 종류 선택 */}
                    <div style={{ marginBottom: '20px', display:'flex', justifyContent:'center', alignContent:'center' }}>
                        <label style={{marginRight:'20px', paddingTop:'7px'}}>종류</label>
                        <select
                            value={imgType}
                            onChange={(e) => setImgType(e.target.value)}
                            required
                            style={{
                            width: '518px',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            }}
                        >
                            <option value="">선택하세요</option>
                            <option value="웨딩홀">웨딩홀</option>
                            <option value="호텔">호텔</option>
                            <option value="스몰">스몰</option>
                            <option value="하우스">하우스</option>
                            <option value="야외웨딩홀">야외웨딩홀</option>
                        </select>
                    </div>
                    <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                        <button className='insertBtn' type="submit">추가하기</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InsertWeddingHall;