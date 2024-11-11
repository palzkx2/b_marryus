import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom';

const AddSdm = () => {
    const [sdm, setSdm] = useState({
        itemNm: '',
        addr: '',
        totalLikes: 0,
        itemDetail: '',
        stockNumber: 0,
        price: 0,
        rating: 0,
        tag: '인물 위주',
        category: '스튜디오', // Default category
        itemsellstatus: 'SELL', // Default sell status
        delFlag: false
    });

    const [image, setImage] = useState([]); // Allow multiple images
    const itemNmRef = useRef();
    const history = useHistory();

    // 파일 선택 시 호출되는 함수
    const changeImage = (evt) => {

        const files = evt.target.files;

        const fileArray = Array.from(files); 
        // 선택된 파일들을 배열로 변환
        console.log("Selected files: ", fileArray); 

         // 기존 이미지와 새로운 이미지를 합치고 중복 제거
        const updatedFiles = [...image, ...fileArray].filter((file, index, self) =>
        index === self.findIndex(f => f.name === file.name)
        );

        setImage(updatedFiles); // 상태에 파일 저장
    };

    const changeInput = (evt) => {
        const { value, name } = evt.target;
        console.log("Input changed:", name, value);
        setSdm({ 
            ...sdm, 
            [name]: ['totalLikes', 'stockNumber', 'price', 'rating'].includes(name) 
                ? parseInt(value) || 0  // Parse value to integer or set to 0
                : value 
        });
    };

    const onSubmit = async (evt) => {
        evt.preventDefault();
    
        if (!sdm.itemNm || !sdm.addr || !sdm.itemsellstatus || !sdm.tag) {
            console.log("필수 입력 필드가 누락되었습니다.");
            return;
        }
    
        const formData = new FormData();
    
        // JSON 데이터를 문자열로 변환하여 추가
        formData.append('sdmData', JSON.stringify(sdm));
    
        // 파일 추가
        if (image.length > 0) {
            image.forEach((file) => {
                formData.append('files', file);
            });
        }
    
        try {
            const response = await axios.post('http://192.168.16.23:8080/api/sdm/sdmRegister', formData);
            console.log("서버 응답 데이터: ", response.data);
    
            if (response.data.result === 'success') {
                console.log("등록 성공!");
                resetForm();
                history.push('/sdm'); 
            } else {
                console.log("등록 실패:", response.data);
            }
        } catch (error) {
            console.error("제출 중 오류 발생:", error.response ? error.response.data : error.message);
        }
    };
    const resetForm = () => {
        setSdm({
            itemNm: '',
            addr: '',
            totalLikes: 0,
            itemDetail: '',
            stockNumber: 0,
            price: 0,
            rating: 0,
            tag: '인물 위주',
            category: '스튜디오',
            itemsellstatus: 'Sell', // 일관된 기본값으로 수정
            delFlag: false
        });
        setImage([]); // 이미지 상태 초기화
        console.log("폼 리셋 완료!");
        itemNmRef.current.focus(); // 폼 리셋 후 첫 번째 입력 필드에 포커스
    };

    return (
        <form onSubmit={onSubmit}>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center', fontSize:'18px', padding:'10px'}}>
                <div>
                <div>
                    <p style={{textAlign:'center', margin:'20px'}}>상품 등록</p>
                </div>
                <div>
                        <p>
                            <label style={{padding:`10px 10px`}} >1. 카테고리</label>
                            <select name='category' value={sdm.category} onChange={changeInput} required style={{padding:'8px'}}>
                                <option value='스튜디오'>스튜디오</option>
                                <option value='드레스'>드레스</option>
                                <option value='메이크업'>메이크업</option>
                            </select>
                        </p>
                </div>

                <div>
                        <p>
                            <label style={{padding:`10px 10px`}} >2. 상호명</label>
                            <input type='text' name='itemNm' value={sdm.itemNm} onChange={changeInput} ref={itemNmRef} required style={{padding:'8px'}}/>
                        </p>
                </div>

                <div>
                    <p>
                        <label style={{padding:`10px 10px`}} >3. 주소</label>
                        <input type='text' name='addr' value={sdm.addr} onChange={changeInput} required style={{padding:'8px'}}/>
                    </p>
                </div>

                <div>
                <p>
                    <label style={{padding:`10px 10px`}} >4. 상품 세부 설명</label>
                    <input type='text' name='itemDetail' value={sdm.itemDetail} onChange={changeInput} style={{padding:'8px'}}/>
                </p>
                </div>
                    
                <div>
                        <p>
                            <label style={{padding:`10px 10px`}} >5. 예약 가능 횟수(1년 기준)</label>
                            <input type='text' name='stockNumber' value={sdm.stockNumber} onChange={changeInput} style={{padding:'8px'}}/>
                        </p>
                </div>
                
                <div>
                    <p>
                        <label style={{padding:`10px 10px`}} >6. 가격</label>
                        <input type='text' name='price' value={sdm.price} onChange={changeInput} style={{padding:'8px'}} />
                    </p>
                </div>


                <div>
                    <p>
                        <label style={{padding:`10px 10px`}} >7. 평점</label>
                        <input type='text' name='rating' value={sdm.rating} onChange={changeInput} style={{padding:'8px'}} />
                    </p>
                </div>

                <div>
                    <p>
                        <label style={{padding:`10px 10px`}} >8. 판매중</label>
                        <select name='itemsellstatus' value={sdm.itemsellstatus} onChange={changeInput} required style={{padding:'8px', fontSize:'15px'}} >
                            <option value='SELL'>Sell</option>
                            <option value='SOLD_OUT'>SoldOut</option>
                        </select>
                    </p>
                </div>

                <div>
                    <p>
                        <label style={{padding:`10px 10px`}} >9. 태그</label>
                        <select name='tag' value={sdm.tag} onChange={changeInput} required style={{padding:'8px',fontSize:'15px'}}>
                            <option value='인물 위주'>인물 위주</option>
                            <option value='배경 위주'>배경 위주</option>
                            <option value='사랑스러움'>사랑스러움</option>
                        </select>
                    </p>
                </div>
                
                <div>
                    <p>
                        <label style={{padding:`10px 10px`}} >10. 사진</label>
                        <input type='file' onChange={changeImage} accept="image/*" multiple style={{padding:'10px'}}/>
                    </p>
                </div>

                <p style={{display:'flex', justifyContent:'center', textAlign:'center'}}>
                    <button type='submit' style={{ padding: `15px 20px`, fontSize: '16px', cursor: 'pointer' ,width:'137px',height:'49px' }}>추가</button>
                </p>
                
                </div>
            </div>
        </form>
    );
};

export default AddSdm;