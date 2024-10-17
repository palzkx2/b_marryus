import React, { useState } from 'react';
import './weddingItem.css';
import sampleImage from '../s_images/comaMain.jpg';
import bouquetImage from '../s_images/bouquet.jpg';
import suitImage from '../s_images/suit.jpg';
import weddingImage from '../s_images/weddingItem.jpg';

const WeddingItem = () => {
    const [activeCategory, setActiveCategory] = useState('전체');

    const categories = ['전체', '부케', '수트', '혼수'];

    const images = {
        전체: [
            { src: bouquetImage, name: '부케 A', price: '50,000원', rating: 4 },
            { src: suitImage, name: '수트 A', price: '100,000원', rating: 5 },
            { src: weddingImage, name: '혼수 A', price: '200,000원', rating: 4 },
            { src: bouquetImage, name: '부케 B', price: '60,000원', rating: 5 },
            { src: suitImage, name: '수트 B', price: '120,000원', rating: 4 },
            { src: weddingImage, name: '혼수 B', price: '220,000원', rating: 5 },
        ],
        부케: [
            { src: bouquetImage, name: '부케 A', price: '50,000원', rating: 4 },
            { src: bouquetImage, name: '부케 B', price: '60,000원', rating: 5 },
            { src: bouquetImage, name: '부케 C', price: '55,000원', rating: 3 },
            { src: bouquetImage, name: '부케 D', price: '70,000원', rating: 4 },
        ],
        수트: [
            { src: suitImage, name: '수트 A', price: '100,000원', rating: 5 },
            { src: suitImage, name: '수트 B', price: '120,000원', rating: 4 },
            { src: suitImage, name: '수트 C', price: '110,000원', rating: 3 },
            { src: suitImage, name: '수트 D', price: '130,000원', rating: 4 },
        ],
        혼수: [
            { src: weddingImage, name: '혼수 A', price: '200,000원', rating: 4 },
            { src: weddingImage, name: '혼수 B', price: '220,000원', rating: 5 },
            { src: weddingImage, name: '혼수 C', price: '210,000원', rating: 4 },
            { src: weddingImage, name: '혼수 D', price: '230,000원', rating: 5 },
        ],
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
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
            </div>
            <div className="image-gallery">
                {images[activeCategory].map((image, index) => (
                    <div key={index} className="image-container">
                        <img src={image.src} alt={image.name} className="gallery-image" />
                        <p className="image-name">{image.name}</p>
                        <p className="image-price">{image.price}</p>
                        <p className="image-rating">⭐ {image.rating} / 5</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeddingItem;
