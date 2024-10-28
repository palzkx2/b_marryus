// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // 스타일 파일 추가

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>여행 카테고리</h2>
            <ul>
                <li><Link to="/domesticDestinations">국내 여행지</Link></li>
                <li><Link to="/overseasDestinations">해외 여행지</Link></li>
                <li><Link to="/travelSearch">조건 검색</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
