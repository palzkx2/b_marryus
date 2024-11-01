import React, { useEffect, useState } from 'react';
import './weddingItem.css';
import sampleImage from '../s_images/comaMain.jpg';
import axios from 'axios';
import numeral from 'numeral';
import { useHistory } from 'react-router-dom';

const WeddingItem = () => {
    const [activeCategory, setActiveCategory] = useState('전체');
    const categories = ['전체', 'flower', 'suit', 'ring'];
    const [weddingItem, setWeddingItem] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('/api/session', { withCredentials: true });
                if (response.data) {
                    setIsLoggedIn(true);
                    setUserRole(response.data.userRole); // 예: 'admin' 또는 'user'
                }
            } catch (error) {
                console.error('로그인 상태 확인 실패:', error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleAddItem = () => {
        history.push('/addWeddingItem'); // 추가 페이지로 이동
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    useEffect(() => {
        const weddingItemList = async () => {
            try {
                const response = await axios.get('/api/weddingItem', {
                    params: { category: activeCategory === '전체' ? undefined : activeCategory }
                });
                setWeddingItem(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        weddingItemList();
    }, [activeCategory]);

    const handleDeleteItem = async (id) => {
        if (window.confirm('정말로 이 아이템을 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/weddingItem/${id}`);
                setWeddingItem(weddingItem.filter(item => item.id !== id)); // 로컬 상태 업데이트
                alert('아이템이 삭제되었습니다.');
            } catch (error) {
                console.error('아이템 삭제 실패:', error);
                alert('아이템 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="container">
            <img src={sampleImage} alt="혼수 물품" className="main-image" />
            <div className="button-container">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category-button ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
                    {isLoggedIn && userRole === 'ADMIN' && (
                        <button className="add-button" onClick={handleAddItem}>
                            추가
                        </button>
                    )}
            </div>
            <div className="image-gallery">
                {weddingItem.map((image) => (
                    <div key={image.id} className="image-container">
                        <a href={`/weddingItemArticle/${image.id}`}>
                            <img
                                src={`${process.env.PUBLIC_URL}${image.imgAddr}`}
                                alt={image.imgName}
                                className="gallery-image"
                            />
                        </a>
                        <a href={`/weddingItemArticle/${image.id}`}>
                            <p className="image-name">{image.imgName}</p>
                        </a>
                        <p className="image-price">{numeral(image.price).format('0,0')}원</p>
                        <p className="image-rating">⭐ {image.rate} / 5</p>
                        {isLoggedIn && userRole === 'ADMIN' && (
                            <button className="delete-button" onClick={() => handleDeleteItem(image.id)}>
                                삭제
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeddingItem;
