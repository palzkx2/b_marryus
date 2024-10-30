import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weddingItemReview.css';
import ReviewRing from './ReviewRing';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const RingReviewList = ({ item }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const history = useHistory();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editReview, setEditReview] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [currentUserEmail, setCurrentUserEmail] = useState(null);
    const [userRecommendations, setUserRecommendations] = useState({});
    const [sortOrder, setSortOrder] = useState('desc');
    const [sortBy, setSortBy] = useState('latest');
    const [userRole, setUserRole] = useState(null); // 사용자 역할 추가

    const checkSessionLogin = async () => {
        try {
            const response = await axios.get('/api/session', { withCredentials: true });
            if (response.data && response.data.userRole) {
                setIsLoggedIn(true);
                setUserRole(response.data.userRole);
                setCurrentUserId(response.data.id);
                setCurrentUserEmail(response.data.email);
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
                setCurrentUserId(response.data.id);
                setCurrentUserEmail(response.data.email);
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

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`/api/reviews`, {
                params: {
                    category: item.category,
                    productId: item.id
                }
            });
            setReviews(response.data);
            const savedRecommendations = JSON.parse(localStorage.getItem('userRecommendations')) || {};
            setUserRecommendations(savedRecommendations);
        } catch (error) {
            console.error('리뷰 데이터를 가져오는 데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [item.category, item.id]);

    const handleClose = () => {
        setIsModalOpen(false);
        fetchReviews();
    };

    const handleReviewClick = async () => {
        const isSessionLoggedIn = await checkSessionLogin();
        if (isSessionLoggedIn) {
            setIsModalOpen(true);
        } else {
            const isOAuthLoggedIn = await checkOauthLogin();
            if (isOAuthLoggedIn) {
                setIsModalOpen(true);
            } else {
                alert('로그인 후 리뷰를 작성해주세요!');
                history.push('/login');
            }
        }
    };

    const handleRecommendClick = async (reviewId) => {
        if (!isLoggedIn) {
            alert('로그인 후 추천할 수 있습니다!');
            history.push('/login');
            return;
        }

        const updatedRecommendations = { ...userRecommendations };

        if (!updatedRecommendations[reviewId]) {
            updatedRecommendations[reviewId] = [];
        }

        const userIndex = updatedRecommendations[reviewId].indexOf(currentUserEmail);
        if (userIndex > -1) {
            // 사용자가 이미 추천한 경우, 추천을 제거
            updatedRecommendations[reviewId].splice(userIndex, 1);
        } else {
            // 사용자가 추천을 추가
            updatedRecommendations[reviewId].push(currentUserEmail);
        }

        const updatedReviews = reviews.map(review => {
            if (review.id === reviewId) {
                return { 
                    ...review, 
                    recommended: updatedRecommendations[reviewId].length 
                };
            }
            return review;
        });

        setReviews(updatedReviews);
        setUserRecommendations(updatedRecommendations);
        localStorage.setItem('userRecommendations', JSON.stringify(updatedRecommendations));

        await axios.put(`/api/reviews/${reviewId}/recommend`, { recommended: updatedRecommendations[reviewId].length > 0 });
    };

    const handleEditClick = (review) => {
        setEditReview(review);
        setIsEditModalOpen(true);
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

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
        setEditReview(null);
        fetchReviews();
    };

    const sortReviews = (reviews) => {
        const sortedReviews = [...reviews];
        if (sortBy === 'latest') {
            sortedReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'rating') {
            sortedReviews.sort((a, b) => (sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating));
        } else if (sortBy === 'recommendation') {
            sortedReviews.sort((a, b) => (sortOrder === 'asc' ? a.recommendCount - b.recommendCount : b.recommendCount - a.recommendCount));
        }
        return sortedReviews;
    };

    const handleSortByChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('desc');
        }
    };

    const sortedReviews = sortReviews(reviews);

    return (
        <div className="weddingItemReview-item-detail-page">
            <div className='weddingItemReview-review'>
                <h2>리뷰 목록</h2>
                <div className='reviews-length'>
                    <span>총 리뷰{reviews.length}개</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    
                    <div className='sort-button-container'>
                        <button onClick={() => handleSortByChange('latest')} className='sort-button'>최신순</button>
                        <button onClick={() => handleSortByChange('rating')} className='sort-button'>평점순</button>
                        <button onClick={() => handleSortByChange('recommendation')} className='sort-button'>추천순</button>
                    </div>
                    <button onClick={handleReviewClick} className='weddingItemReview-review-button'>리뷰 작성</button>
                </div>
            </div>
            {isModalOpen && (
                <ReviewRing item={item} onClose={handleClose} />
            )}
            {isEditModalOpen && (
                <ReviewRing item={item} review={editReview} onClose={handleEditModalClose} />
            )}
            <div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {sortedReviews.length === 0 ? (
                        <li className="no-reviews">리뷰 없음</li>
                    ) : (
                        sortedReviews.map((review) => (
                            <li key={review.id} className="weddingItemReview-card">
                                <div className="review-header">
                                    <span className="product-name">{review.productName}</span> | 
                                    <span className="author">{review.author}</span> | 
                                    <span className="date">{new Date(review.createdAt).toLocaleDateString()}</span> | 
                                    <span className="rating">{review.rating}★</span>
                                </div>
                                <p className="weddingItemReview-content">{review.reviewContent}</p>
                                <span 
                                    className={`recommended ${isLoggedIn && userRecommendations[review.id]?.includes(currentUserEmail) ? 'active' : ''}`}
                                    onClick={() => handleRecommendClick(review.id)} 
                                >
                                    <div className='cover'></div>
                                </span>
                                {(isLoggedIn && currentUserEmail === review.email) || (isLoggedIn && userRole === 'ADMIN') ? (
                                    <>
                                        <button onClick={() => handleEditClick(review)}>수정</button>
                                        <button onClick={() => handleDeleteClick(review.id)}>삭제</button>
                                    </>
                                ) : ''}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default RingReviewList;
