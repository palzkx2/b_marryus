import React, { useEffect, useState } from 'react';
import './myPage.css'; 
import { Link } from 'react-router-dom'; 
import Bar from './Bar'; 
import axios from 'axios'; 
import ReviewRing from '../../weddingItem/ReviewRing';

const MyReivew = () => {
    const [reviews, setReviews] = useState([]); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editReview, setEditReview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [item, setItem] = useState(null)
    

    // 로그인 상태 확인 함수
    const checkSessionLogin = async () => {
        try {
            const response = await axios.get('/api/session', { withCredentials: true });
            if (response.data) {
                setIsLoggedIn(true);
                setCurrentUserEmail(response.data.email);
                fetchMyReviews(response.data.email); // email을 전달
                return true;
            }
        } catch (error) {
            console.error('세션 로그인 확인 실패:', error);
        }
        return false;
    };

    const checkOauthLogin = async () => {
        try {
            const response = await axios.get('/api/oauthUserInfo', { withCredentials: true });
            if (response.data && response.data.name) {
                setIsLoggedIn(true);
                setCurrentUserEmail(response.data.email);
                fetchMyReviews(response.data.email); // email을 전달
                return true;
            }
        } catch (error) {
            console.error('OAuth 로그인 확인 실패:', error);
        }
        return false;
    };

    const checkLoginStatus = async () => {
        const sessionLoggedIn = await checkSessionLogin();
        if (!sessionLoggedIn) {
            await checkOauthLogin();
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);
    
    // 사용자 리뷰 가져오는 함수
    const fetchMyReviews = async (email) => {
        try {
            const response = await axios.get(`/api/reviews/email/${email}`, { withCredentials: true });
            setReviews(response.data);
        } catch (error) {
            console.error('리뷰를 가져오는 데 오류가 발생했습니다:', error);
        }
    };

    const handleEditClick = async (review) => {
        setEditReview(review);
    
    // 리뷰에서 카테고리와 아이템 ID를 가져옴
    const { category, productId } = review;

    try {
        // 카테고리와 ID를 사용하여 아이템 정보를 API에서 가져옴
        const response = await axios.get(`/api/reviews/${review.id}`, {
            params: { category, id: productId } // 카테고리와 ID를 쿼리 파라미터로 전달
        });

        const associatedItem = response.data; // 가져온 아이템 데이터
        setItem(associatedItem); // 관련 아이템 설정
        setIsEditModalOpen(true); // 모달 열기
    } catch (error) {
        console.error('아이템 정보를 가져오는 데 실패했습니다:', error);
        alert('아이템 정보를 가져오는 데 문제가 발생했습니다.');
    }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        fetchMyReviews();
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditReview(null);
        fetchMyReviews(currentUserEmail);
    };

    const handleDeleteClick = async (reviewId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/reviews/${reviewId}`);
                setReviews(reviews.filter(review => review.id !== reviewId));
            } catch (error) {
                console.error('리뷰 삭제 실패:', error);
                alert('리뷰 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div>
            <div className='alignGood'>
                <Bar /> 
            </div>
            <div className='alignGood'>
                <div className='mainContainer'>
                    <div className='alignGood'>
                        <p className='byeBtna' style={{ backgroundColor: 'gray', border: 'none', padding: '10px', width: '230px' }}>
                            내가 쓴 리뷰 목록 
                        </p>
                    </div>
                    {isModalOpen && (
                        <ReviewRing item={item} onClose={handleClose} />
                    )}
                    {isEditModalOpen && (
                        <ReviewRing item={item} review={editReview} onClose={handleEditModalClose} />
                    )}
                    <div className='alignGood' style={{ margin: '30px 30px' }}>
                        {reviews.length === 0 ? (
                            <p>리뷰가 없습니다.</p>
                        ) : (
                            <ul>
                                {reviews.map(review => (
                                    <li key={review.id}>
                                        <h3>{review.productName}</h3> 
                                        <p>{review.reviewContent}</p> 
                                        <p>평점: {review.rating}★</p> 
                                        <p>작성일: {new Date(review.createdAt).toLocaleDateString()}</p>
                                        <button onClick={() => handleEditClick(review)}>수정</button>
                                        <button onClick={() => handleDeleteClick(review.id)}>삭제</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className='conBox'>
                        <Link to='/myPage'><p className='byeBtn'>돌아가기</p></Link> 
                        <Link to='#'><p className='byeBtn'>수정 완료</p></Link> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyReivew;
