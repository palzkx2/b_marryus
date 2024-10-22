import React from 'react';

const SuitDesc = () => {
    return (
        <div>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}}>
                <option>색상</option>
                <option>네이비챠콜</option>
                <option>다크베이지</option>
                <option>챠콜</option>
                <option>브라운</option>
                <option>블랙</option>
                <option>카키</option>
                <option>아이보리</option>
            </select>
            <br/>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}}>
                <option>자켓사이즈</option>
                <option>S(90-95)</option>
                <option>M(95-100)</option>
                <option>L(100-105)</option>
                <option>XL(105-110)</option>
                <option>2XL(115)</option>
                <option>3XL(120)</option>
            </select>
            <br/>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}}>
                <option>바지사이즈</option>
                <option>S(28-29)</option>
                <option>M(30-31)</option>
                <option>L(32-33)</option>
                <option>XL(34-35)</option>
                <option>2Xl(36-37)</option>
                <option>3XL(39)</option>
            </select>
            <br/>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}}>
                <option>조끼</option>
                <option>카라조끼M(+40,000)</option>
                <option>카라조끼L(+40,000)</option>
                <option>카라조끼XL(+42,000)</option>
                <option>V넥조끼L(+40,000)</option>
                <option>V넥조끼L(+40,000)</option>
                <option>V넥조끼XL(+42,000)</option>
            </select>
            <br/>        
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}}>
                <option>더블자켓</option>
                <option>더블자켓으로 변경(+3,000)</option>
            </select>
        </div>
    );
};

export default SuitDesc;