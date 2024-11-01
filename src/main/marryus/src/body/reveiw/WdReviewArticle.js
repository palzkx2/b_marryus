import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const WdReviewArticle = ({review, deleteReview, weddingHall, setReviewList}) => {

    const {id,name,content,created,rating} = review

    const [toggle,setToggle] = useState(false)
    const [userEmail, setUserEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(content);
    const [newCreated, setNewCreated] = useState(created)
    const [newRating, setNewRating] = useState(rating);

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
          color: '#ff3d47',
        },
    });

    const handleEditClick = () => {
        setIsEditing(true); // 수정 버튼 클릭 시 수정 모드 활성화
    };

    const handleSaveClick = async () => {

        try {

            const response = await axios.post(`/api/updateReview/${review.id}`, {
                content: newContent,
                created: newCreated,
                rating:newRating
            });

            await axios.get(`/api/average?weddingHallName=${encodeURIComponent(weddingHall)}`)

            setIsEditing(false);
            alert('리뷰가 수정되었습니다.');
            window.location.reload()

        } catch (error) {
            console.error('리뷰 수정 실패', error);
        }

    };

    const handleCancelClick = () => {
        setNewContent(content); // 수정 취소 시 원래 내용으로 되돌리기
        setIsEditing(false); // 수정 모드 비활성화
    };

    const onToggle = () => {
        setToggle(!toggle)
    }

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get('/api/session', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
                console.log('사용자 이메일 : ', response.data.email)
                setUserEmail(response.data.email); // 세션 정보를 상태에 저장
            } catch (error) {
                console.error('세션 정보 가져오기 실패:', error);
            }
        };

        fetchSessionData();
    }, []);

    return (
        <div>
            <div style={{display:'flex',margin:'auto'}}>
                <div className='articleInfo'>
                    {isEditing && (
                        <div>
                            <textarea
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                style={{width:'1300px', height:'50px', resize:'none'}}
                            />
                            <div style={{display:'flex', flexDirection:'row'}}>
                                <span style={{marginTop:'4px'}}>평점 : </span>
                                <Box sx={{ '& > legend': { mt: 2 } }} style={{margin:'0 10px'}}>
                                    <StyledRating
                                        value={newRating}
                                        defaultValue={rating}
                                        onChange={(event, newValue) => setNewRating(newValue)}
                                        name="customized-color"
                                        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                        precision={0.5}
                                        icon={<FavoriteIcon fontSize="inherit" />}
                                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                                    />
                                </Box>
                            </div>
                            <div>
                                <button onClick={handleSaveClick} style={{background:'none', border:'none', cursor:'pointer', marginLeft:'3px'}}>저장</button>
                                <button onClick={handleCancelClick} style={{background:'none', border:'none', cursor:'pointer', marginLeft:'10px'}}>취소</button>
                            </div>
                        </div>
                    )}
                    {!isEditing &&
                    <>
                        <div className='articleInfoHead' style={{ whiteSpace: 'pre-line' }}>
                            {content}
                        </div>
                    </>
                    }
                    <div style={{display:'flex',position:'absolute',margin:'9px 30px 10px 0px'}}> 
                        <div style={{marginLeft:'0px',display:'flex'}}>

                            <div style={{paddingLeft:'20px',marginTop:'5px',marginRight:'5px',fontSize:'10pt',color:'gray'}}>추천하기</div>
                            <span onClick={onToggle}>
                                {
                                    toggle ? <GoHeartFill className='recomIcon'/> : <GoHeart className='recomIcon'/>
                                }
                            </span>

                        </div>
                        {!isEditing &&
                        <>
                        {
                            userEmail === review.email ?
                            <div onClick={handleEditClick} className='a1t2' style={{margin:'-25px 300px 20px 1290px',fontSize:'9pt',position:'absolute', cursor:'pointer'}}>수정</div>
                            :
                            <div></div>
                        }
                        {
                            userEmail === review.email ?
                            <div onClick={() => deleteReview(review.id)} className='a1t2' style={{margin:'-25px 300px 20px 1320px',fontSize:'9pt',position:'absolute', cursor:'pointer'}}>삭제</div>
                            :
                            <div></div>
                        }
                        </>
                        }
                    </div>
                    
                    <div style={{display:'flex',float:'right'}}>
                            <div className='articleInfoSub'>평점 : {rating}점</div>
                            <div className='articleInfoSub'>작성자:{name}</div>
                            <div className='articleInfoSub'>작성일자:{created}</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WdReviewArticle;
