import React, { useEffect, useState } from 'react';
import './weddingItem.css';
import sampleImage from '../s_images/comaMain.jpg';
import axios from 'axios';

const WeddingItem = () => {
    const [activeCategory, setActiveCategory] = useState('전체');
    const categories = ['전체', 'flower', 'suit', 'ring'];

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    const [weddingItem, setWeddingItem] = useState([]);

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
                        <p className="image-price">{image.price}원</p>
                        <p className="image-rating">⭐ {image.rate} / 5</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeddingItem;
