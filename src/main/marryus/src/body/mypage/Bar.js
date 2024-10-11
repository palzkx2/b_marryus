import React from 'react';
import loginImg from '../../s_images/loginImage.jpg'
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Bar = () => {

    return (
        <div>
            <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
            </div>
        </div>
    );
};

export default Bar;