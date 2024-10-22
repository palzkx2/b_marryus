import React from 'react';

const FlowerDesc = () => {
    return (
        <div>
            <select style={{width:'100%',padding:'10px',marginBottom:'10px',fontSize:'16px'}}>
                <option>꽃 색상</option>
                <option>레드</option>
                <option>바이올렛</option>
                <option>블루</option>
                <option>핑크</option>
            </select>        
        </div>
    );
};

export default FlowerDesc;