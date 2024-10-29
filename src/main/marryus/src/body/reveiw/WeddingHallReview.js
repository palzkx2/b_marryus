import React, { useEffect, useState } from 'react';
import WdReviewArticle from './WdReviewArticle';
import './revew.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const WeddingHallReview = ({weddingHall}) => {

    const [content,setContent] = useState('')
    const [name,setName] = useState('')
    const [rating,setRating] = useState('')
    const [userRole, setUserRole] = useState('');
    const [created, setCreated] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get('/api/session', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
                console.log('세션 정보 : ', response.data);
                console.log('사용자 이름 : ', response.data.name)
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

        try{

            const response = await axios.post('/api/createReview', {
                content:content,
                name:name,
                rating:rating,
                email:email,
                weddingHallName:weddingHall
            })
            console.log('response.data넘어옴?--------------',response.data)

        }catch{
            console.log('리뷰 작성 실패')
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

            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div>
                    <textarea onChange={(e) => setContent(e.target.value)} style={{width:'1377px', height:'70px', resize:'none', padding:'10px', whiteSpace: 'pre-wrap', fontSize:'12pt'}}></textarea>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'end', alignContent:'end', width:'1409px'}}>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <span style={{marginTop:'11px', marginRight:'10px', fontSize:'12pt'}}>평점 : </span>
                    <Box sx={{ '& > legend': { mt: 2 } }} style={{marginRight:'20px', marginTop:'8px'}}>
                        <StyledRating
                            name="customized-color"
                            defaultValue={4.5}
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