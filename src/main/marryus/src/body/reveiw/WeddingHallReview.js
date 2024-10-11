import React from 'react';
import WdReviewArticle from './WdReviewArticle';
import './revew.css'

const WeddingHallReview = () => {
    return (
        <div>
                
                <div className='alignCenter'>
                    <div style={{margin:'10px 10px 10px 20px',fontSize:'20pt'}}>총 리뷰(10개)</div>
                </div>
                <div className='mainContainere'>

                    <div className='alignGood'>                  
                        <div className='reviewCon'>
                            <a href='#'><div className='bySubCon'>최신순</div></a>
                            <a href='#'><div className='bySubCon'>평점 높은순</div></a>
                            <a href='#'><div className='bySubCon'>평점 낮은순</div></a>
                            <a href='#'><div className='bySubCon'>추천순</div></a>
                        </div>
                    </div>         
                            <div>
                                <WdReviewArticle/>
                            </div>

                </div>
        </div>
    );
};

export default WeddingHallReview;