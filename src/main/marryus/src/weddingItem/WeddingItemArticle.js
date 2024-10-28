import React, { useEffect, useState } from 'react';
import './weddingItemArticle.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FlowerDesc from './FlowerDesc';
import SuitDesc from './SuitDesc';
import RingDesc from './RingDesc';
import RingReviewList from './RingReviewList';

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

     // 현재 아이템의 인덱스 찾기
    const currentIndex = categoryItems.findIndex(categoryItem => categoryItem.id === item.id);

    // 양옆 아이템 선택
    const leftItems = categoryItems.slice(Math.max(0, currentIndex - 2), currentIndex); // 왼쪽 2개
    const rightItems = categoryItems.slice(currentIndex + 1, currentIndex + 3); // 오른쪽 2개

    const displayedItems = [
        ...Array(currentIndex === 0 ? 2 : currentIndex === 1 ? 1 : 0).fill({ id: null }), // 첫 번째 아이템일 때 빈 두 개, 두 번째 아이템일 때 빈 한 개
        ...leftItems,
        item,
        ...rightItems
    ];


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
                                <FlowerDesc item={item}/>
                        }
                        {
                            item.category==='suit' &&
                                <SuitDesc item={item}/>
                        }
                        {
                            item.category==='ring' &&
                                <RingDesc item={item}/>
                        }
                    </p>
                </div> 
            </div>
            <div className="weddingItemArticle-category-list"> {/* 카테고리 리스트 컨테이너 */}
                <div className='weddingItemArticle-category-list-grid'>
                    {displayedItems.map((categoryItem) => (
                        categoryItem.id ? ( // id가 있을 때만 링크를 생성
                            <a href={`/weddingItemArticle/${categoryItem.id}`} key={categoryItem.id}>
                                <div className="weddingItemArticle-category-item">
                                    <>
                                        <img src={`${process.env.PUBLIC_URL}${categoryItem.imgAddr}`} alt={categoryItem.imgName} className="weddingItemArticle-category-item-image" />
                                        <span>{categoryItem.imgName}</span>
                                        <span>{categoryItem.price}</span>
                                    </>
                                </div>
                            </a>
                        ) : (
                            <div key={Math.random()} className="weddingItemArticle-category-item">
                                <span>&nbsp;</span>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <RingReviewList item={item}/>
        </div>
    );
};

export default WeddingItemArticle;
