import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AddSukso = () => {

    const history = useHistory();

    const [imageFile, setImageFile] = useState(null);
    const [sname, setSname] = useState('');
    const [hosil, setHosil] = useState('');
    const [price, setPrice] = useState('');
    const [where, setWhere] = useState('');
    const [place, setPlace] = useState('');
    const [pyong, setPyong] = useState('');
    const [wido,setWido] = useState('');
    const [gyungdo,setGyungdo] = useState('');
    const [addr, setAddr] = useState('');

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
        console.log(e.target.files[0]); // 파일 정보 로그
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form Data:', { 
            imageName: imageFile.name, 
            sname, 
            hosil, 
            price, 
            where, 
            place,
            pyong,
            wido,
            gyungdo,
            addr
        });

        const formData = new FormData();
        formData.append('sname', sname); 
        formData.append('hosil', hosil);
        formData.append('price', price);
        formData.append('where', where);
        formData.append('place', place);
        formData.append('pyong', pyong);
        formData.append('wido', wido);
        formData.append('gyungdo', gyungdo);
        formData.append('addr', addr);
        formData.append('imgName', imageFile.name);
        formData.append('imgName', imageFile);

        try {
            const response = await axios.post('http://localhost:8080/api/insertSukso', formData, {
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
                <h3 style={{textAlign:'center',color:'blue'}}> 숙소 추가 </h3>
                <label style={{margin:'10px',padding:'10px'}}>
                    <p>이미지:</p>
                    <input type='file' onChange={handleFileChange} required />
                </label>
                <br/>
                <label style={{margin:'10px',padding:'10px'}}>
                    <p>숙소 이름:</p>
                    <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={sname} onChange={(e) => setSname(e.target.value)} required />
                </label>
                <br/>
                <label style={{margin:'10px',padding:'10px'}}>
                    <p>호실:</p>
                    <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={hosil} onChange={(e) => setHosil(e.target.value)} required />
                </label>
                <br/>
                <label style={{margin:'10px',padding:'10px'}}>
                    <p>가격:</p>
                    <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={price} onChange={(e) => setPrice(e.target.value)} required />
                </label>
                <br/>
                <label style={{margin:'10px',padding:'10px'}}>
                    <p>국내 or 해외:</p>
                    <select style={{margin:'4px',padding:'10px',width:'94%'}} value={where} onChange={(e) => setWhere(e.target.value)}>
                        <option value="국내">국내</option>
                        <option value="해외">해외</option>
                    </select>
                </label>
                <br/>
                <label style={{margin:'10px',padding:'10px'}}>
                    <p>지역 이름:</p>
                    <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={place} onChange={(e) => setPlace(e.target.value)} required />
                </label>
                <br/>
                <label style={{margin:'10px',padding:'10px'}}> 
                    <p>평점:</p>
                    <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={pyong} onChange={(e) => setPyong(e.target.value)} required />
                </label>
                <br/>
                <label style={{margin:'10px',padding:'10px'}}>
                    <p>숙소 위치(위도):</p>
                    <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={wido} onChange={(e) => setWido(e.target.value)} required />
                </label>
                <br/>
                <label style={{margin:'10px',padding:'10px'}}>
                    <p>숙소 위치(경도):</p>
                    <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={gyungdo} onChange={(e) => setGyungdo(e.target.value)} required />
                </label>
                <br/>
                <label style={{margin:'10px',padding:'10px'}}>
                    <p>주소:</p>
                    <input style={{margin:'4px',padding:'10px',width:'300px'}} type='text' value={addr} onChange={(e) => setAddr(e.target.value)} required />
                </label>
                <br/>
                <button style={{margin:'30px 10px 10px 168px',padding:'10px'}} type='submit'>추가하기</button>
            </form>
    );
};

export default AddSukso;