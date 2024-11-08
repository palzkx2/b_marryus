import axios from 'axios';
import React, { useState } from 'react';

const AddAgency = () => {

    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState('');
    const [addr, setAddr] = useState('');
    const [tag, setTag] = useState('');
    const [buffet, setBuffet] = useState('');
    const [price, setPrice] = useState('');
    const [wido,setWido] = useState('');
    const [gyungdo,setGyungdo] = useState('');
    const [imgType,setImgType] = useState('');

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
        console.log(e.target.files[0]); // 파일 정보 로그
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

        try {
            const response = await axios.post('http://192.168.16.23:8080/api/insertTravel', formData, {
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
        <form onSubmit={handleSubmit}>
            <h3 style={{textAlign:'center',color:'blue'}}> 여행사 추가 </h3>
            <label style={{margin:'10px',padding:'10px'}}>
                이미지: <input type='file' onChange={handleFileChange} required />
            </label>
            <br/>
            <label style={{margin:'10px',padding:'10px'}}>
                이름: <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <br/>
            <label style={{margin:'10px',padding:'10px'}}>
                주소: <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={addr} onChange={(e) => setAddr(e.target.value)} required />
            </label>
            <br/>
            <label style={{margin:'10px',padding:'10px'}}>
                태그: <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={tag} onChange={(e) => setTag(e.target.value)} required />
            </label>
            <br/>
            <label style={{margin:'10px',padding:'10px'}}>
                뷔페: <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={buffet} onChange={(e) => setBuffet(e.target.value)} required />
            </label>
            <br/>
            <label style={{margin:'10px',padding:'10px'}}>
                가격: <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>
            <br/>
            <label style={{margin:'10px',padding:'10px'}}> 
                위도: <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={wido} onChange={(e) => setWido(e.target.value)} required />
            </label>
            <br/>
            <label style={{margin:'10px',padding:'10px'}}>
                경도: <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={gyungdo} onChange={(e) => setGyungdo(e.target.value)} required />
            </label>
            <br/>
            <label style={{margin:'10px',padding:'10px'}}>
                종류: <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={imgType} onChange={(e) => setImgType(e.target.value)} required />
            </label>
            <br/>
            <button style={{margin:'30px 10px 10px 168px',padding:'10px'}} type='submit'>추가하기</button>
        </form>
    );
};

export default AddAgency;