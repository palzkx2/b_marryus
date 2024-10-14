import axios from 'axios';
import React, { useState } from 'react';

const InsertWeddingHall = () => {

    const [imageFile, setImageFile] = useState(null);
    const [name, setName] = useState('');
    const [addr, setAddr] = useState('');
    const [tag, setTag] = useState('');
    const [buffet, setBuffet] = useState('');
    const [price, setPrice] = useState('');

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
            price 
        });

        const formData = new FormData();
        formData.append('imageName', imageFile.name); 
        formData.append('imageFile', imageFile);
        formData.append('name', name);
        formData.append('addr', addr);
        formData.append('tag', tag);
        formData.append('buffet', buffet);
        formData.append('price', Number(price));

        try {
            const response = await axios.post('http://localhost:8080/api/insertWeddingHall', formData, {
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
            <label>
                이미지:
                <input type='file' onChange={handleFileChange} required />
            </label>
            <br />
            <label>
                이름:
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <br />
            <label>
                주소:
                <input type='text' value={addr} onChange={(e) => setAddr(e.target.value)} required />
            </label>
            <br />
            <label>
                태그:
                <input type='text' value={tag} onChange={(e) => setTag(e.target.value)} required />
            </label>
            <br />
            <label>
                뷔페:
                <input type='text' value={buffet} onChange={(e) => setBuffet(e.target.value)} required />
            </label>
            <br />
            <label>
                가격:
                <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>
            <br />
            <button type='submit'>추가하기</button>
        </form>
    );
};

export default InsertWeddingHall;