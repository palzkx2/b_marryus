import React, { useState } from 'react';
import axios from 'axios';
import MapTest from '../map/MapTest';

const GeocodingComponent = () => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);  // 좌표를 null로 초기화
    const [type,setType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/geoCode?address=${encodeURIComponent(address)}&type=${type}`);
            // 서버에서 반환된 좌표를 사용하여 상태 업데이트
            setCoordinates({ x: response.data.x, y: response.data.y });
        } catch (error) {
            console.error("Error fetching coordinates", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={type} onChange={(e)=>setType(e.target.value)}>
                    <option value='ROAD'>도로명 주소</option>
                    <option value='PARCEL'>지번 주소</option>
                </select>
                <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="주소를 입력하세요" 
                />
                <button type="submit">좌표 가져오기</button>
            </form>
            {coordinates && (
                <div>
                    좌표: X: {coordinates.x}, Y: {coordinates.y}
                    <div className='map'>
                        <MapTest coordinates={{ lat: parseFloat(coordinates.y), lng: parseFloat(coordinates.x) }} name='여기가 맞나요?'/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeocodingComponent;
