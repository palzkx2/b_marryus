import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Bar from './Bar';

const MyQna = () => {
    return (
        <div>
            <div className='alignGood'>
                <Bar/>
            </div>
            <div className='alignGood'>
                <div className='mainContainer'>
                    <div className='myAccHeader'>문의내영ㄱ</div>
                    <div className='conBox'>
                            <Link to='/myPage'><p className='byeBtn'>돌아가기</p></Link>
                            <Link to='#'><p className='byeBtn'>수정 완료</p></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyQna;