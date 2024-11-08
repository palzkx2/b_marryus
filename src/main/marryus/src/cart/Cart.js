import React, { useEffect, useState } from 'react';
import studioImg from '../s_images/cartBar.jpg'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './cart.css'
import axios from 'axios';
import { FaCircleMinus } from "react-icons/fa6";

const Cart = () => {

    const [weddingHalls, setWeddingHalls] = useState([]);
    const [householdItems, setHouseholdItems] = useState([]);
    const [studios, setStudios] = useState([]);
    const [destinations, setDestinations] = useState([]);
   
    
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
                    .filter(item => 
                        item.category === '스튜디오' || 
                        item.category === '메이크업' || 
                        item.category === '드레스'
                    )
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        price: parseInt(item.price, 10),
                        quantity: item.count,
                        userType: item.userType,
                        checked: true // 체크박스 상태 추가
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
                        ringMaleSize: item.ringMaleSize, // 남자 사이즈 추가
                        ringFemaleSize: item.ringFemaleSize, // 여자 사이즈 추가
                        suitColor: item.suitColor,//양복색상
                        suitSize: item.suitSize,//양복 사이즈
                        suitPantsSize: item.suitPantsSize,//양복 바지사이즈
                        suitVest: item.suitVest,//조끼(선택)
                        suitJacket: item.suitJacket,//자켓(선택)
                        flowerColor: item.flowerColor,//부케색상
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

    // 체크된 아이템을 수집하는 함수 추가
    const getCheckedItems = () => {
    const getItems = (items) => {
        return items.filter(item => item.checked).map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            userType: item.userType,
            // 필요한 경우 추가 속성을 여기에 추가
        }));
    };

    return [
        ...getItems(weddingHalls),
        ...getItems(studios),
        ...getItems(householdItems),
        ...getItems(destinations),
    ];
};

    // 주문하기 버튼 클릭 시
    const handleOrder = () => {

        if(!weddingHalls && !studios && !householdItems && !destinations){
            alert('상품을 선택해주세요.')
            return
        }

        const checkedItems = getCheckedItems();
        // 체크된 항목을 어떻게 처리할지 여기에서 결정
        console.log("체크된 아이템:", checkedItems); // 디버깅용

        // 예를 들어, 결제 페이지로 아이템을 넘길 수 있습니다:
        history.push({
            pathname: '/payment',
            state: { items: checkedItems }, // 체크된 아이템을 결제 페이지로 전달
        });
        
    };

  const onDelete = async(id) => {
        const confirmation = window.confirm('삭제하시겠습니까?');
        if (confirmation) {
                try {
                    // 백엔드 API 엔드포인트
                    const response = await axios.delete(`/api/deleteCart/${id}`);        
                    // 성공적으로 삭제된 경우
                    console.log('삭제 성공:', response.data);
                    alert('삭제되었습니다.')
                    // 상태에서 삭제된 아이템 제거
                setWeddingHalls(prevItems => prevItems.filter(item => item.id !== id));
                setStudios(prevItems => prevItems.filter(item => item.id !== id));
                setHouseholdItems(prevItems => prevItems.filter(item => item.id !== id));
                setDestinations(prevItems => prevItems.filter(item => item.id !== id));
                } catch (error) {
                    // 오류 처리
                    console.error('삭제 실패:', error);
                }
            }else {
                // 취소 시 실행되는 로직
                alert('취소되었습니다.');
                console.log("삭제가 취소되었습니다.");
            }
  };

  const [travel, setTravel] = useState([]);

  useEffect(() => {
      axios.get('/api/readSukso')
          .then((response) => {
              setTravel(response.data);
          })
          .catch(err => console.log("데이터 불러오기 실패:", err));
  }, []);
  
  const goToArticleByName = (sname) => {
    // travel 배열에서 sname과 일치하는 항목을 찾음
    const foundItem = travel.find((item) => item.sname === sname);

    if (foundItem) {
        // 일치하는 항목이 있을 경우, 해당 데이터로 URL 이동
        window.location.href = `/travelArticle/${foundItem.id}/${foundItem.sname}/${foundItem.pyong}/${foundItem.price}/${foundItem.addr}/${foundItem.imgName}/${foundItem.wido}/${foundItem.gyungdo}`;
    } else {
        console.error("해당 이름의 데이터를 찾을 수 없습니다.");
    }
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
                                            <div className='inppputCon'>
                                                <input type="number" value={item.quantity} 
                                                        onChange={(e) => handleQuantityChange('weddingHalls', item.id, parseInt(e.target.value))} min="1"
                                                        disabled={!item.checked} 
                                                        //   체크 되지 않으면 수정 불가
                                                        />
                                            </div>
                                            <div className='minusIcnCon'><FaCircleMinus onClick={()=>onDelete(item.id)} className='minusIcn'/></div>
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
                                            <div className='inppputCon'>
                                                <input type="number" value={item.quantity} 
                                                        onChange={(e) => handleQuantityChange('studios', item.id, parseInt(e.target.value))} min="1"
                                                        disabled={!item.checked} 
                                                        //   체크 되지 않으면 수정 불가
                                                        />
                                            </div>
                                            <div className='minusIcnCon'><FaCircleMinus onClick={()=>onDelete(item.id)} className='minusIcn'/></div>
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
                                            <>
                                              {item.ringMaleSize && (
                                                  <span>남자 사이즈: {item.ringMaleSize}</span>
                                              )}
                                              {item.ringFemaleSize && (
                                                  <span>여자 사이즈: {item.ringFemaleSize}</span>
                                              )}
                                              {item.suitColor && (
                                                  <span>{item.suitColor}</span>
                                              )}
                                              {item.suitSize && (
                                                  <span>{item.suitSize}</span>
                                              )}
                                              {item.suitPantsSize && (
                                                  <span>{item.suitPantsSize}</span>
                                              )}
                                              {item.suitVest && (
                                                  <span>{item.suitVest}</span>
                                              )}
                                              {item.suitJacket && (
                                                  <span>{item.suitJacket}</span>
                                              )}
                                              {item.flowerColor && (
                                                  <span>{item.flowerColor}</span>
                                              )}
                                            </>
                                            <div className='inppputCon'>
                                                <input type="number" value={item.quantity} 
                                                        onChange={(e) => handleQuantityChange('householdItems', item.id, parseInt(e.target.value))} min="1"
                                                        disabled={!item.checked} 
                                                        //   체크 되지 않으면 수정 불가
                                                        />
                                            </div>
                                            <div className='minusIcnCon'><FaCircleMinus onClick={()=>onDelete(item.id)} className='minusIcn'/></div>
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
                                            <span className='pidif' onClick={() => goToArticleByName(item.name)}>{item.name}</span>
                                            <span>{item.price}원</span>
                                            <div className='inppputCon'>
                                                <input type="number" value={item.quantity} 
                                                        onChange={(e) => handleQuantityChange('destinations', item.id, parseInt(e.target.value))} min="1"
                                                        disabled={!item.checked} 
                                                        //   체크 되지 않으면 수정 불가
                                                        />
                                            </div>
                                            <div className='minusIcnCon'><FaCircleMinus onClick={()=>onDelete(item.id)} className='minusIcn'/></div>
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