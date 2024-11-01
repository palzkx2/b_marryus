import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddWeddingItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemCategory, setItemCategory] = useState(''); // 카테고리 상태
    const [itemImage, setItemImage] = useState(null); // 선택된 이미지 파일
    const [imagePreview, setImagePreview] = useState(''); // 이미지 미리보기
    const history = useHistory();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setItemImage(file);
            setImagePreview(URL.createObjectURL(file)); // 이미지 미리보기
        }
    };

    const handleCategoryChange = (e) => {
        setItemCategory(e.target.value);
        console.log(e.target.value); // 선택된 값 확인    
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!itemImage) {
            alert('이미지를 선택해주세요!');
            return;
        }

        // 이미지 파일 이름 추출
        const imageFileName = itemImage.name;

        // imgAddr 생성
        const imgAddr = `/s_images/weddingItem/${itemCategory}/${imageFileName}`;

        const newItem = {
            imgName: itemName,
            price: itemPrice,
            category: itemCategory,
            imgAddr: imgAddr, // 생성된 경로
            rate: 0, // 초기 평점
        };

        try {
            // FormData를 사용하여 이미지 파일 전송
            const formData = new FormData();
            formData.append('item', JSON.stringify(newItem));
            formData.append('image', itemImage); // 이미지 파일 추가

            await axios.post('/api/weddingItem', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('아이템이 추가되었습니다!');
            history.push('/addWeddingItem'); // 성공 후 같은 페이지로 이동
        } catch (error) {
            console.error('아이템 추가 실패:', error);
            alert('아이템 추가 중 오류가 발생했습니다.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="상품 이름"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
            /><br/>
            <input
                type="number"
                placeholder="가격"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                required
            /><br/>
            <select
                value={itemCategory}
                onChange={handleCategoryChange} // 카테고리 선택 시 함수 호출
                required
            >
                <option value="" disabled>카테고리 선택</option>
                <option value="suit">Suit</option>
                <option value="flower">Flower</option>
                <option value="ring">Ring</option>
            </select><br/>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
            /><br/>
            {imagePreview && (
                <div className="image-preview">
                    <img src={imagePreview} alt="미리보기" style={{ width: '100px', height: '100px' }} />
                </div>
            )}
            <button type="submit">추가</button>
        </form>
    );
};

export default AddWeddingItem;
