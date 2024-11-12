import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weddingItemReview.css';

const ReviewSdm = ({ item, onClose, review }) => {
    const [rating, setRating] = useState(review ? review.rating : 0); // 별점 상태
    const [hoverRating, setHoverRating] = useState(0); // 호버 상태
    const [reviewText, setReviewText] = useState(review ? review.reviewContent : ''); // 리뷰 텍스트 상태
    const [author, setAuthor] = useState(''); // 작성자 상태 관리
    const [email, setEmail] = useState(''); // 작성자 이메일 불러오기

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get('/api/session');
                setAuthor(response.data.name); // 세션에서 사용자 이름 가져오기
                setEmail(response.data.email);
            } catch (error) {
                console.log('세션 데이터 가져오기 실패:', error);
            }
        };

        const fetchOauthData = async () => { //OAuth 데이터 가져오기
            try {
                const response = await axios.get('/api/oauthUserInfo');
                if (response.data && response.data.name) {
                    setAuthor(response.data.name); // OAuth에서 사용자 이름 가져오기
                    setEmail(response.data.email);
                }
            } catch (error) {
                console.log('OAuth 데이터 가져오기 실패:', error);
            }
        };

        fetchSessionData();
        fetchOauthData(); // OAuth 데이터 가져오는 함수 호출
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            alert('별점을 선택해주세요!');
            return;
        }

        // 리뷰 데이터 전송
        const reviewPayload = {
            reviewContent: reviewText,
            rating: rating,
            category: item.category,
            subcategory: item.subcategory,
            productId: item.id,
            author: author,
            productName: item.imgName,
            recommended: false,
            createdAt: new Date().toISOString(),
            email: email,
        };

        try {
            if (review) {
                // 수정 모드
                await axios.put(`/api/reviews/${review.id}`, reviewPayload);
                alert('리뷰가 성공적으로 수정되었습니다!');
            } else {
                // 추가 모드
                await axios.post('/api/reviews/create', reviewPayload);
                await axios.post('/api/reviews', reviewPayload);

                alert('리뷰가 성공적으로 제출되었습니다!');
            }
            await updateAverageRating(item.id);
            onClose();
        } catch (error) {
            console.log('리뷰 제출 실패:', error);
        }
    };

    const updateAverageRating = async (productId) => {
        try {
            const response = await axios.get(`/api/reviews/averageRating`, {
                params: { productId }
            });

            const averageRating = response.data.averageRating;

            console.log('평균 별점 응답:', averageRating);  // 응답 값 확인

            if (isNaN(averageRating) || averageRating == null) {
                throw new Error('평균 별점이 유효하지 않음');
            }

            await axios.put(`/api/weddingItem/${productId}`, { rate: averageRating });
            console.log('평균 별점이 업데이트되었습니다:', averageRating);
            
        } catch (error) {
            console.log('평균 별점 업데이트 실패:', error.message);
        }
    };

    return (
        <div className="weddingItemReview-modal">
            <div className="weddingItemReview-modal-content">
                <span className="weddingItemReview-close" onClick={onClose}>&times;</span>
                <h2>{item.imgName}</h2>
                <img src={item.imgAddr} alt={item.imgName} className="weddingItemReview-product-image" />
                <div className="weddingItemReview-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={star <= (hoverRating || rating) ? 'filled' : 'empty'}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            ★
                        </span>
                    ))}
                </div>
                <form className="weddingItemReview-form" onSubmit={handleSubmit}>
                    <textarea
                        placeholder="리뷰를 작성하세요..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                    <button type="submit">{review ? '리뷰 수정' : '리뷰 제출'}</button>
                </form>
            </div>
        </div>
    );
};

export default ReviewSdm;