import React, { useState } from 'react';
import axios from 'axios';
import MapTest from '../map/MapTest';

const GeocodingComponent = ({ onGeocode }) => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [type, setType] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/api/geoCode?address=${encodeURIComponent(address)}&type=${type}`);
            // 서버에서 반환된 좌표를 사용하여 상태 업데이트
            const newCoordinates = { x: response.data.x, y: response.data.y };
            setCoordinates(newCoordinates);
            onGeocode(newCoordinates.x, newCoordinates.y); // 좌표가 업데이트 된 후 호출
            setMessage('');
        } catch (error) {
            console.error("Error fetching coordinates", error);
            setMessage('정확한 주소를 입력해주세요!');
        }
    };

    return (
        <div>
            <div>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value='ROAD'>도로명 주소</option>
                    <option value='PARCEL'>지번 주소</option>
                </select>
                <input 
                    type="text" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="주소를 입력하세요" 
                />
                <button onClick={handleSubmit}>좌표 검색</button>
                <div style={{ margin: '10px 10px 10px 90px', color: 'red' }}>
                    {message}
                </div>
            </div>
            {coordinates && (
                <div>
                    좌표: 위도(Y): {coordinates.y}, 경도(X): {coordinates.x}
                    <div className='map'>
                        <MapTest coordinates={{ lat: parseFloat(coordinates.y), lng: parseFloat(coordinates.x) }} name='여기가 맞나요?' />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeocodingComponent;
