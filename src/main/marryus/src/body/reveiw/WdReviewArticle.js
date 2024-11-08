import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const WdReviewArticle = ({review, deleteReview, weddingHall}) => {

    const {name,content,created,rating} = review

    const [toggle,setToggle] = useState(false)
    const [recommendCount, setRecommendCount] = useState(review.recommendCount);
    const [userEmail, setUserEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [newContent, setNewContent] = useState(content);
    const [newCreated, setNewCreated] = useState(created)
    const [newRating, setNewRating] = useState(rating);
    const [useToEmail,setUseToEmail] = useState('')
    const [data,setData] = useState({});
    const history = useHistory()

    useEffect(() => {

        const selectEmail = () => {
            
            if(userEmail || data.email){
                const selectToEmail = userEmail || data.email
                setUseToEmail(selectToEmail)
            }
            
        }
        
        selectEmail()
        
    }, [userEmail, data.email])

    useEffect(()=>{
        axios.get('/api/oauthUserInfo',{withCredentials: true})
        .then(res=>setData(res.data))
        .catch(error=>console.log(error))
    },[])

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

    // 세션에서 사용자 이메일을 가져오는 코드
    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                // OAuth 이메일이 없을 경우 세션에서 이메일 가져오기
                if (!userEmail) {
                    const response = await axios.get('/api/session', { withCredentials: true });
                    setUserEmail(response.data.email); // 세션 정보에서 이메일 설정
                }
            } catch (error) {
                console.error('세션 정보 가져오기 실패:', error);
            }
        };

        if (!userEmail) {  // OAuth 이메일이 없을 경우 세션에서 이메일 가져오기
            fetchSessionData();
        }
    }, [userEmail]); // userEmail 변경 시마다 실행

    const handleToggleRecommendation = async () => {

        if(data.name === undefined && !userEmail){
            alert('로그인 후 이용해주세요.')
            history.push('/login')
            return
        }

        const emailToUse = userEmail || data.email;

        try {
            const response = await axios.post(`/api/toggleRecommendation`, null, {
                params: { email: emailToUse, reviewId: review.id },
            });
            setToggle(response.data.isRecommended);
            setRecommendCount(response.data.recommendCount);
            window.location.reload()
        } catch (error) {
            console.error('추천하기 실패:', error);
        }
    };

    useEffect(() => {

        const checkRecommendation = async () => {

            if (userEmail || data.email) {

                const emailToUse = userEmail || data.email;

                try {

                    const response = await axios.get(`/api/checkRecommendation`, {
                        params: { email: emailToUse, reviewId: review.id },
                    });
    
                    // 추천 상태 업데이트
                    setToggle(response.data.isRecommended);

                } catch (error) {
                    console.error('추천 상태 가져오기 실패:', error);
                }

            }

        };
    
        // 추천 상태 확인
        if (userEmail || data.email) {
            checkRecommendation();
        }

    }, [userEmail, data.email, review.id]);

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
                            <span onClick={handleToggleRecommendation}>
                                {
                                    toggle ? <GoHeartFill className='recomIcon'/> : <GoHeart className='recomIcon'/>
                                }
                            </span>
                            <span style={{marginLeft:'10px', marginTop:'5px'}}>{recommendCount}</span>
                        </div>
                        {!isEditing &&
                        <>
                        {
                            useToEmail === review.email ?
                            <div onClick={handleEditClick} className='a1t2' style={{margin:'-25px 300px 20px 1290px',fontSize:'9pt',position:'absolute', cursor:'pointer'}}>수정</div>
                            :
                            <div></div>
                        }
                        {
                            useToEmail === review.email ?
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
