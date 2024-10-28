import React, { useState } from 'react';
import './SearchComponent.css';
import loginImg from '../s_images/travel/santorini-island-5419777_1920.jpg';

const SearchComponent = () => {
    const [destinationType, setDestinationType] = useState('');
    const [searchType, setSearchType] = useState('');
    const [region, setRegion] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [rating, setRating] = useState('');
    const [keyword, setKeyword] = useState(''); // 키워드 상태 추가
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const exampleData = [
        { id: 1, name: '여행사 A', price: 200000, rating: 4.5, region: 'ulsan' },
        { id: 2, name: '여행사 B', price: 150000, rating: 4.0, region: 'jeju' },
        { id: 3, name: '여행사 C', price: 250000, rating: 5.0, region: 'busan' },
        { id: 4, name: '여행사 D', price: 100000, rating: 3.5, region: 'bali' },
        { id: 5, name: '여행사 E', price: 300000, rating: 4.8, region: 'paris' },
        // 추가 데이터...
    ];

    const handleSearch = () => {
        let filteredResults;

        if (searchType === 'agency') {
            filteredResults = exampleData.filter(item => {
                return (!priceRange || item.price <= priceRange) &&
                    (!rating || item.rating >= rating) &&
                    (!region || item.region === region) &&
                    (!destinationType || (destinationType === 'domestic' && ['ulsan', 'jeju', 'busan'].includes(item.region)) ||
                    (destinationType === 'international' && ['bali', 'paris'].includes(item.region)));
            });
        } else if (searchType === 'keyword') {
            filteredResults = exampleData.filter(item => {
                return item.name.includes(keyword);
            });
        }

        if (filteredResults.length > 0) {
            setResults(filteredResults);
            setErrorMessage('');
        } else {
            setErrorMessage('조건에 일치하는 여행이 없습니다.');
            setResults([]);
        }
    };

    const getRegions = () => {
        if (destinationType === 'domestic') {
            return (
                <>
                    <option value="jeju">제주도</option>
                    <option value="gangleung">강릉</option>
                    <option value="busan">부산</option>
                    <option value="yeosu">여수</option>
                    <option value="gyeongju">경주</option>
                    <option value="sokcho">속초</option>
                    <option value="namhae">남해</option>
                    <option value="geojae">거제</option>
                    <option value="pohang">포항</option>
                    <option value="chuncheon">춘천</option>
                    <option value="jeonsu">전주</option>
                    <option value="sangju">상주</option>
                    <option value="gimhae">김해</option>
                    <option value="donghae">동해</option>
                    <option value="icheon">이천</option>
                    <option value="pocheon">포천</option>
                    <option value="geochang">거창</option>
                    <option value="haenam">해남</option>
                    <option value="hwacheon">화천</option>
                    <option value="yangyang">양양</option>
                    <option value="goyang">고양</option>
                    <option value="suwon">수원</option>
                    <option value="others">그 외</option>
                </>
            );
        } else if (destinationType === 'international') {
            return (
                <>
                    <option value="paris">파리</option>
                    <option value="maldiv">몰디브</option>
                    <option value="bali">발리</option>
                    <option value="hawaii">하와이</option>
                    <option value="jpn">일본</option>
                    <option value="tail">태국</option>
                    <option value="newz">뉴질랜드</option>
                    <option value="aus">호주</option>
                    <option value="hothers">그 외</option>
                </>
            );
        } else {
            return <option value="">지역을 선택하세요</option>;
        }
    };

    return (
        <div>

                <div style={{
                    margin: 'auto',
                    width: '1400px',
                    height: '350px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    backgroundImage: `url(${loginImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: `center calc(100% - -130px)`
                }}>
                </div>


            <div className='search-container'>
                <h1>신혼여행 검색</h1>
                <div className="search-selection">
                    <h2>검색 유형</h2>
                    <select className="search-type-select" onChange={(e) => setSearchType(e.target.value)}>
                        <option value="">선택하세요</option>
                        <option value="agency">여행사 조건 검색</option>
                        <option value="sukso">숙소 조건 검색(미구현)</option>
                        <option value="place">지역 조건 검색(미구현)</option>
                        <option value="keyword">키워드 검색</option>
                    </select>
                </div>

                {searchType === 'agency' && (
                    <>
                        <div className="search-selection">
                            <h2>여행지 종류</h2>
                            <select className="destination-select" onChange={(e) => setDestinationType(e.target.value)}>
                                <option value="">선택하세요</option>
                                <option value="domestic">국내</option>
                                <option value="international">해외</option>
                            </select>
                        </div>
                        <div className="search-selection">
                            <h2>지역 선택</h2>
                            <select className="region-select" onChange={(e) => setRegion(e.target.value)}>
                                <option value="">선택하세요</option>
                                {getRegions()}
                            </select>
                        </div>
                        <div className="search-selection">
                            <h2>가격 범위 선택</h2>
                            <input className="price-input" type="number" placeholder="최대 가격" onChange={(e) => setPriceRange(e.target.value)} />
                        </div>
                        <div className="search-selection">
                            <h2>평점 선택</h2>
                            <input className="rating-input" type="number" placeholder="최소 평점" onChange={(e) => setRating(e.target.value)} />
                        </div>
                    </>
                )}

                {searchType === 'keyword' && (
                    <div className="search-selection">
                        <h2>검색어 입력</h2>
                        <input className="keyword-input" type="text" placeholder="키워드로 검색" onChange={(e) => setKeyword(e.target.value)} />
                    </div>
                )}


                {searchType === 'sukso' && (
                    <>
                        <div className="search-selection">
                            <h2>숙소 종류</h2>
                            <select className="destination-select" onChange={(e) => setDestinationType(e.target.value)}>
                                <option value="">선택하세요</option>
                                <option value="domestic">국내</option>
                                <option value="international">해외</option>
                            </select>
                        </div>
                        <div className="search-selection">
                            <h2>지역 선택</h2>
                            <select className="region-select" onChange={(e) => setRegion(e.target.value)}>
                                <option value="">선택하세요</option>
                                {getRegions()}
                            </select>
                        </div>
                        <div className="search-selection">
                            <h2>가격 범위 선택</h2>
                            <input className="price-input" type="number" placeholder="최대 가격" onChange={(e) => setPriceRange(e.target.value)} />
                        </div>
                        <div className="search-selection">
                            <h2>평점 선택</h2>
                            <input className="rating-input" type="number" placeholder="최소 평점" onChange={(e) => setRating(e.target.value)} />
                        </div>
                    </>
                )}
                {searchType === 'place' && (
                    <>
                        <div className="search-selection">
                            <h2>지역 종류</h2>
                            <select className="destination-select" onChange={(e) => setDestinationType(e.target.value)}>
                                <option value="">선택하세요</option>
                                <option value="domestic">국내</option>
                                <option value="international">해외</option>
                            </select>
                        </div>
                        <div className="search-selection">
                            <h2>지역 선택</h2>
                            <select className="region-select" onChange={(e) => setRegion(e.target.value)}>
                                <option value="">선택하세요</option>
                                {getRegions()}
                            </select>
                        </div>
                        <div className="search-selection">
                            <h2>가격 범위 선택</h2>
                            <input className="price-input" type="number" placeholder="최대 가격" onChange={(e) => setPriceRange(e.target.value)} />
                        </div>
                        <div className="search-selection">
                            <h2>평점 선택</h2>
                            <input className="rating-input" type="number" placeholder="최소 평점" onChange={(e) => setRating(e.target.value)} />
                        </div>
                    </>
                )}

                <button className="search-button" onClick={handleSearch}>검색하기</button>

                {errorMessage && <p className="search-error-message">{errorMessage}</p>}

                <div className="search-results">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((result) => (
                                <li key={result.id}>
                                    <h3>{result.name}</h3>
                                    <p>가격: {result.price}원</p>
                                    <p>평점: {result.rating}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-results">조건에 일치하는 여행이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
