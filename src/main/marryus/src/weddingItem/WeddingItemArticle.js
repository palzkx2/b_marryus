import React, { useEffect, useState } from 'react';
import './weddingItemArticle.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FlowerDesc from './FlowerDesc';

const WeddingItemArticle = () => {
    const { id } = useParams();
    const [item, setItem] = useState();
    const [categoryItems, setCategoryItems] = useState([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`/api/weddingItem/${id}`);
                setItem(response.data);

                const categoryResponse = await axios.get(`/api/weddingItem?category=${response.data.category}`);
                setCategoryItems(categoryResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchItem();
    }, [id]);

    if (!item) return <div>Loading...</div>;

    return (
        <div>
            <div className="weddingItemArticle-container">
                <div className="weddingItemArticle-image-container">
                    <img src={`${process.env.PUBLIC_URL}${item.imgAddr}`} alt={item.imgName} className="weddingItemArticle-image" />
                </div>
                <div className="weddingItemArticle-content"> {/* 오른쪽 내용 */}
                    <h1 className="weddingItemArticle-title">{item.imgName}</h1>
                    <p className="weddingItemArticle-price">{item.price}</p>
                    <p className="weddingItemArticle-description">
                        {
                            item.category==='flower' &&
                                <FlowerDesc/>
                        }
                        {
                            item.category==='suit' &&
                                <div> 수트 상세설명 </div>
                        }
                        {
                            item.category==='ring' &&
                            <div> 반지 상세설명 </div>
                        }
                    </p>
                    <button className="weddingItemArticle-purchase-button">구매하기</button>
                </div> 
            </div>
            <div className="category-list"> {/* 카테고리 리스트 컨테이너 */}
                <h2>같은 카테고리의 아이템</h2>
                <ul>
                    {categoryItems.map((categoryItem) => (
                        <li key={categoryItem.id} className="category-item">
                            <img src={`${process.env.PUBLIC_URL}${categoryItem.imgAddr}`} alt={categoryItem.imgName} className="category-item-image" />
                            <span>{categoryItem.imgName}</span>
                            <span>{categoryItem.price}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WeddingItemArticle;
