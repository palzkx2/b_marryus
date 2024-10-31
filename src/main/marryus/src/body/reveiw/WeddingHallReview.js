import React, { useEffect, useRef, useState } from 'react';
import WdReviewArticle from './WdReviewArticle';
import './revew.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const WeddingHallReview = ({weddingHall}) => {

    const [content,setContent] = useState('')
    const [name,setName] = useState('')
    const [rating,setRating] = useState('')
    const [userRole, setUserRole] = useState('');
    const [created, setCreated] = useState('')
    const [email, setEmail] = useState('')
    const [reviewList,setReviewList] = useState([])
    const history = useHistory()
    const textRef = useRef()

    const deleteReview = (id) => {

        const deleteConfirm = window.confirm('리뷰를 삭제하시겠습니까?')

        if(deleteConfirm){
            fetch(`/api/deleteReview/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    setReviewList(prevReviews => prevReviews.filter(review => review.id !== id));
                    alert('리뷰가 삭제되었습니다.')
                } else {
                    console.error('리뷰 삭제 실패:', response.statusText);
                }
            })
            .catch(error => console.error('리뷰 삭제 요청 실패:', error));
        }

    };

    useEffect(() => {

        fetch(`/api/listByName?weddingHallName=${weddingHall}`)
            .then((response) => response.json())
            .then((data) => setReviewList(data))
            .catch((error) => console.error('리뷰 리스트 불러오기 실패', error));

    }, [weddingHall]);

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get('/api/session', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
                setUserRole(response.data.userRole); // 세션 정보를 상태에 저장
                setName(response.data.name)
                setEmail(response.data.email)
            } catch (error) {
                console.error('세션 정보 가져오기 실패:', error);
            }
        };

        fetchSessionData();
    }, []);

    const create = async () => {

        if(!userRole){
            alert('로그인 후 이용해주세요.')
            history.push('/login')
            return
        }

        if(!textRef.current.value){
            alert('내용을 입력해주세요.')
            return
        }

        try{

            const response = await axios.post('/api/createReview', {
                content:content,
                name:name,
                rating:rating,
                email:email,
                weddingHallName:weddingHall
            })

            // 평균 평점 업데이트 API 호출
            await axios.get(`/api/average?weddingHallName=${encodeURIComponent(weddingHall)}`)

            window.location.reload()

        }catch(error){
            console.log('리뷰 작성 실패', error)
        }

    }

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#ff6d75',
        },
        '& .MuiRating-iconHover': {
          color: '#ff3d47',
        },
    });
      
    return (
        <div>

            <div className='alignCenter'>
                <div style={{margin:'10px 10px 10px 20px',fontSize:'20pt'}}>총 리뷰({reviewList ? reviewList.length : 0}개)</div>
            </div>

            <div className='mainContainere' style={{height:'auto'}}>

                <div className='alignGood'>
                    <div className='reviewCon'>
                        <a href='#'><div className='bySubCon'>최신순</div></a>
                        <a href='#'><div className='bySubCon'>평점 높은순</div></a>
                        <a href='#'><div className='bySubCon'>평점 낮은순</div></a>
                        <a href='#'><div className='bySubCon'>추천순</div></a>
                    </div>
                </div>

                {reviewList.length > 0 ? (
                    reviewList.map((review) => (
                        <div key={review.id}>
                            <WdReviewArticle review={review} deleteReview={deleteReview} weddingHall={weddingHall}/>
                        </div>
                    ))
                ) : (
                    <p>리뷰가 없습니다.</p>
                )}

            </div>

            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div>
                    <textarea ref={textRef} onChange={(e) => setContent(e.target.value)} style={{width:'1377px', height:'70px', resize:'none', padding:'10px', whiteSpace: 'pre-wrap', fontSize:'12pt'}}></textarea>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'end', alignContent:'end', width:'1409px'}}>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <span style={{marginTop:'11px', marginRight:'10px', fontSize:'12pt'}}>평점 : </span>
                    <Box sx={{ '& > legend': { mt: 2 } }} style={{marginRight:'20px', marginTop:'8px'}}>
                        <StyledRating
                            value={rating}
                            onChange={(event, newValue) => setRating(newValue)}
                            name="customized-color"
                            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                            precision={0.5}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                    </Box>
                    <button style={{padding:'10px 20px'}} onClick={create}>등록</button>
                </div>
            </div>

        </div>
    );
};

export default WeddingHallReview;