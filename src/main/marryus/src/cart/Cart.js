import React, { useEffect, useState } from 'react';
import studioImg from '../s_images/cartBar.jpg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './cart.css'
import axios from 'axios';

const Cart = () => {

    const [weddingHalls, setWeddingHalls] = useState([]);

    useEffect(() => {
        const getCartList = async () => {
            try {
                const response = await axios.get('/api/readCart', { withCredentials: true }); // 세션 정보를 가져오는 API 호출
                console.log('세션 정보 : ', response.data);
    
                // 웨딩홀 데이터 세분화
                const weddingHalls = response.data
                    .filter(item => item.category === '웨딩홀')
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseInt(item.price, 10), // 문자열을 정수로 변환
                        quantity: item.count, // 수량
                        userType: item.userType,
                        // 필요에 따라 추가 속성을 더 설정할 수 있습니다.
                    }));
    
                // 스튜디오 데이터 세분화
                const studios = response.data
                    .filter(item => item.category === '스튜디오')
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseInt(item.price, 10),
                        quantity: item.count,
                        userType: item.userType,
                        // 필요에 따라 추가 속성을 더 설정할 수 있습니다.
                    }));
    
                // 혼수 아이템 데이터 세분화
                const householdItems = response.data
                    .filter(item => item.category === '혼수')
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseInt(item.price, 10),
                        quantity: item.count,
                        userType: item.userType,
                        // 필요에 따라 추가 속성을 더 설정할 수 있습니다.
                    }));
    
                // 여행지 데이터 세분화
                const destinations = response.data
                    .filter(item => item.category === '여행지')
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseInt(item.price, 10),
                        quantity: item.count,
                        userType: item.userType,
                        // 필요에 따라 추가 속성을 더 설정할 수 있습니다.
                    }));
    
                // 상태 설정
                setWeddingHalls(weddingHalls);
                setStudios(studios);
                setHouseholdItems(householdItems);
                setDestinations(destinations);
    
            } catch (error) {
                console.error('세션 정보 가져오기 실패:', error);
            }
        };
    
        getCartList();
    }, []);
    
    
    
      const [studios, setStudios] = useState([
        { id: 1, name: '스드메 패키지 1', price: 2000000, quantity: 1, checked: true },
        { id: 2, name: '스드메 패키지 2', price: 2500000, quantity: 1, checked: true },
      ]);
    
      const [householdItems, setHouseholdItems] = useState([
        { id: 1, name: '혼수 가전 1', price: 1000000, quantity: 1, checked: true },
        { id: 2, name: '혼수 가구 2', price: 1500000, quantity: 1, checked: true },
      ]);
    
      const [destinations, setDestinations] = useState([
        { id: 1, name: '허니문 여행지 1', price: 5000000, quantity: 1, checked: true },
        { id: 2, name: '허니문 여행지 2', price: 4500000, quantity: 1, checked: true },
      ]);
    

      const history = useHistory();

  // 각 카테고리별 합계 계산 함수 (체크된 항목만 포함)
  const calculateCategoryTotal = (items) =>
    items
      .filter(item => item.checked) // 체크된 항목만 포함
      .reduce((total, item) => total + item.price * item.quantity, 0);

  // 전체 합계 계산 함수
  const calculateTotal = () => {
    return (
      calculateCategoryTotal(weddingHalls) +
      calculateCategoryTotal(studios) +
      calculateCategoryTotal(householdItems) +
      calculateCategoryTotal(destinations)
    );
  };

  // 수량 변경 함수
  const handleQuantityChange = (category, id, quantity) => {
    const updateItems = (items, setItems) => {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      );
      setItems(updatedItems);
    };

    switch (category) {
      case 'weddingHalls':
        updateItems(weddingHalls, setWeddingHalls);
        break;
      case 'studios':
        updateItems(studios, setStudios);
        break;
      case 'householdItems':
        updateItems(householdItems, setHouseholdItems);
        break;
      case 'destinations':
        updateItems(destinations, setDestinations);
        break;
      default:
        break;
    }
  };

  // 체크박스 선택 변경 함수
  const handleCheckboxChange = (category, id, checked) => {
    const updateItems = (items, setItems) => {
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, checked: checked } : item
      );
      setItems(updatedItems);
    };

    switch (category) {
      case 'weddingHalls':
        updateItems(weddingHalls, setWeddingHalls);
        break;
      case 'studios':
        updateItems(studios, setStudios);
        break;
      case 'householdItems':
        updateItems(householdItems, setHouseholdItems);
        break;
      case 'destinations':
        updateItems(destinations, setDestinations);
        break;
      default:
        break;
    }
  };

  // 주문하기 버튼 클릭 시
  const handleOrder = () => {
    history.push('/payment');
  };

    return (
        <div>
            {/*  배너 이미지  */}
            <div className='alignGood'>
                <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                    <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${studioImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                    </div>
                </div>
            </div>
            {/*  배너 이미지  end*/}


            <div className='alignGood'>
                <div className='mainContainer'>
                    <div className="cart-container">
                        <h1>장바구니</h1>

                            {/*  웨딩홀 장바구니  */}
                            <div className="cart-category">
                                <div className='conboxHeader'>웨딩홀</div>
                                <div className='cartConbox'>
                                    {weddingHalls.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <input type="checkbox" checked={item.checked}
                                                onChange={(e) => handleCheckboxChange('weddingHalls', item.id, e.target.checked)}/>
                                            <span>{item.name}</span>
                                            <span>{item.price}원</span>
                                            <input type="number" value={item.quantity} 
                                                    onChange={(e) => handleQuantityChange('weddingHalls', item.id, parseInt(e.target.value))} min="1"
                                                    disabled={!item.checked} 
                                                    //   체크 되지 않으면 수정 불가
                                                    />
                                        </div>
                                    ))}
                                </div>

                                <div className="category-total">
                                    합계: {calculateCategoryTotal(weddingHalls)}원
                                </div>
                            </div>
                            {/*  웨딩홀 장바구니 end  */}

                            {/*  스드메 장바구니  */}
                            <div className="cart-category">
                                <div className='conboxHeader'>스드메</div>
                                <div className='cartConbox'>
                                    {studios.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <input type="checkbox" checked={item.checked}
                                                onChange={(e) => handleCheckboxChange('studios', item.id, e.target.checked)}/>
                                            <span>{item.name}</span>
                                            <span>{item.price}원</span>
                                            <input type="number" value={item.quantity} 
                                                    onChange={(e) => handleQuantityChange('studios', item.id, parseInt(e.target.value))} min="1"
                                                    disabled={!item.checked} 
                                                    //   체크 되지 않으면 수정 불가
                                                    />
                                        </div>
                                    ))}
                                </div>
                                <div className="category-total">
                                    합계: {calculateCategoryTotal(studios)}원
                                </div>
                            </div>
                            {/*  스드메 장바구니 end */}
                            
                            {/*  혼수 컬렉션 장바구니 */}
                            <div className="cart-category">
                                <div className='conboxHeader'>혼수 컬렉션</div>
                                <div className='cartConbox'>
                                    {householdItems.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <input type="checkbox" checked={item.checked}
                                                onChange={(e) => handleCheckboxChange('householdItems', item.id, e.target.checked)}/>
                                            <span>{item.name}</span>
                                            <span>{item.price}원</span>
                                            <input type="number" value={item.quantity} 
                                                    onChange={(e) => handleQuantityChange('householdItems', item.id, parseInt(e.target.value))} min="1"
                                                    disabled={!item.checked} 
                                                    //   체크 되지 않으면 수정 불가
                                                    />
                                        </div>
                                    ))}
                                </div>
                                <div className="category-total">
                                    합계: {calculateCategoryTotal(householdItems)}원
                                </div>
                            </div>
                            {/*  혼수 컬렉션 장바구니 end */}
                            
                            {/* 여행지 장바구니 */}
                            <div className="cart-category">
                                <div className='conboxHeader'>여행지</div>
                                <div className='cartConbox'>
                                    {destinations.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <input type="checkbox" checked={item.checked}
                                                onChange={(e) => handleCheckboxChange('destinations', item.id, e.target.checked)}/>
                                            <span>{item.name}</span>
                                            <span>{item.price}원</span>
                                            <input type="number" value={item.quantity} 
                                                    onChange={(e) => handleQuantityChange('destinations', item.id, parseInt(e.target.value))} min="1"
                                                    disabled={!item.checked} 
                                                    //   체크 되지 않으면 수정 불가
                                                    />
                                        </div>
                                    ))}
                                </div>
                                <div className="category-total">
                                    합계: {calculateCategoryTotal(destinations)}원
                                </div>
                            </div>
                            {/*  여행지 장바구니 end */}
                            
                            {/* 총 합 */}
                            <div className="cart-total">
                                <h3>총 합계: {calculateTotal()}원</h3>
                            </div>
                            {/*  총 합 end */}
                            
                            {/* 주문하기 버튼 */}
                            <div style={{display:'flex',alignContent:'center',justifyContent:'center'}}>
                                <button style={{width:'300px',marginRight:'20px'}} className="order-button" onClick={handleOrder}>
                                    주문하기
                                </button>
                                <button style={{width:'300px'}}  className="norder-button"  onClick={handleOrder}>
                                    네이버 페이로 주문하기
                                </button>
                            </div>
                            {/* 주문하기 버튼 end*/}
                        </div>        
                    </div>
                 </div>
            </div>
    );
};

export default Cart;