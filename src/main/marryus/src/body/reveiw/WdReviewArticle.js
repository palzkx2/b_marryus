import React from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { MdOutlineRecommend, MdRecommend } from 'react-icons/md';

const WdReviewArticle = () => {
    return (
        <div>
            <div style={{display:'flex',margin:'10px',padding:'10px'}}>
                <div className='articleInfo'>
                    <div className='articleInfoHead'>
                        너무 그지 같아요
                    </div>
                    <div style={{display:'flex',position:'absolute',margin:'9px 30px 10px 0px'}}> 
                        <div style={{marginLeft:'0px',display:'flex'}}>
                            <a href='#'>
                                <div style={{paddingLeft:'20px',marginTop:'5px',marginRight:'5px',fontSize:'10pt',color:'gray'}}>추천하기</div>
                            </a>
                            <a href='#'>
                                <GoHeartFill className='recomIcon' />
                            </a>
                            <a href='#'>
                                <GoHeart className='recomIcon' />
                            </a>

                        </div>
                        <a href='#'>
                            <div className='a1t2' style={{marginLeft:'460px',fontSize:'9pt'}}>수정</div>
                        </a>
                        <a href='#'>
                            <div className='a1t2' style={{marginLeft:'10px',fontSize:'9pt'}}>삭제</div>
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
