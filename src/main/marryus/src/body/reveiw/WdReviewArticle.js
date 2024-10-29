import React, { useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { MdOutlineRecommend, MdRecommend } from 'react-icons/md';

const WdReviewArticle = () => {

    const [toggle,setToggle] = useState(false)

    const onToggle = () => {
        setToggle(!toggle)
        const iconElement = document.querySelector('.recomIcon');
        if (iconElement) {
            iconElement.classList.add('recomIcon-click');
            setTimeout(() => {
                iconElement.classList.remove('recomIcon-click');
            }, 150);
        }
    }

    return (
        <div>
            <div style={{display:'flex',margin:'10px',padding:'10px'}}>
                <div className='articleInfo'>
                    <div className='articleInfoHead'>
                        너무 그지 같아요
                    </div>
                    <div style={{display:'flex',position:'absolute',margin:'9px 30px 10px 0px'}}> 
                        <div style={{marginLeft:'0px',display:'flex'}}>

                            <div style={{paddingLeft:'20px',marginTop:'5px',marginRight:'5px',fontSize:'10pt',color:'gray'}}>추천하기</div>
                            <span onClick={onToggle} className='recomIcon'>
                            {
                                toggle ?
                                <GoHeartFill className='recomIcon'/> : <GoHeart className='recomIcon'/>
                            }
                            </span>

                        </div>
                        <a href='#'>
                            <div className='a1t2' style={{margin:'-28px 300px 20px 1130px',fontSize:'9pt',position:'absolute'}}>수정</div>
                        </a>
                        <a href='#'>
                            <div className='a1t2' style={{margin:'-28px 300px 20px 1160px',fontSize:'9pt',position:'absolute'}}>삭제</div>
                        </a>
                    </div>
                    <div style={{display:'flex',float:'right'}}>
                            <div className='articleInfoSub'>평점 : 0점</div>
                            <div className='articleInfoSub'>작성자:정준우</div>
                            <div className='articleInfoSub'>작성일자:2024-10-10</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WdReviewArticle;
