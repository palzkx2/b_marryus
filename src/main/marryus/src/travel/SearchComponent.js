import React, { useState } from 'react';
import './SearchComponent.css';
import loginImg from '../s_images/travel/santorini-island-5419777_1920.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const SearchComponent = () => {
    const [destinationType, setDestinationType] = useState('');
    const [searchType, setSearchType] = useState('');
    const [region, setRegion] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const [pyong, setRating] = useState('');
    const [keyword, setKeyword] = useState(''); // 키워드 상태 추가
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async () => {
        setErrorMessage('');
        try {
            const response = await axios.post('/api/search', {
                region: region,
                priceRange: priceRange,
                rating: pyong
            });
            setResults(response.data);
        } catch (error) {
            setErrorMessage('검색 중 오류가 발생했습니다.');
            setResults([]);
        }
    };

    const getRegions = () => {
        if (destinationType === 'domestic') {
            return (
                <>
                    <option value="제주도">제주도</option>
                    <option value="강릉">강릉</option>
                    <option value="부산">부산</option>
                    <option value="여수">여수</option>
                    <option value="경주">경주</option>
                    <option value="속초">속초</option>
                    <option value="남해">남해</option>
                    <option value="거제">거제</option>
                    <option value="포항">포항</option>
                    <option value="춘천">춘천</option>
                    <option value="전주">전주</option>
                    <option value="상주">상주</option>
                    <option value="김해">김해</option>
                    <option value="동해">동해</option>
                    <option value="이천">이천</option>
                    <option value="포천">포천</option>
                    <option value="거창">거창</option>
                    <option value="해남">해남</option>
                    <option value="화천">화천</option>
                    <option value="양양">양양</option>
                    <option value="고양">고양</option>
                    <option value="수원">수원</option>
                    <option value="그 외">그 외</option>
                </>
            );
        } else if (destinationType === 'international') {
            return (
                <>
                <option value="몰디브">몰디브</option>
                <option value="하와이">하와이</option>
                <option value="파리">파리</option>
                <option value="산토리니">산토리니</option>
                <option value="로마">로마</option>
                <option value="발리">발리</option>
                <option value="두바이">두바이</option>
                <option value="푸켓">푸켓</option>
                <option value="미코노스">미코노스</option>
                <option value="바르셀로나">바르셀로나</option>
                <option value="뉴욕">뉴욕</option>
                <option value="리우데자네이루">리우데자네이루</option>
                <option value="프라하">프라하</option>
                <option value="부에노스아이레스">부에노스아이레스</option>
                <option value="밴쿠버">밴쿠버</option>
                <option value="세비야">세비야</option>
                <option value="베네치아">베네치아</option>
                <option value="코타키나발루">코타키나발루</option>
                <option value="산후안">산후안</option>
                <option value="타이베이">타이베이</option>
                <option value="몰타">몰타</option>
                <option value="오사카">오사카</option>
                <option value="크레타">크레타</option>
                <option value="그 외">그 외</option>
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
                        <option value="sukso">숙소 조건 검색</option>
                        {/* <option value="keyword">키워드 검색</option> */}
                    </select>
                </div>

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

                {searchType === 'keyword' && (
                    <div className="search-selection">
                        <h2>검색어 입력</h2>
                        <input className="keyword-input" type="text" placeholder="키워드로 검색" onChange={(e) => setKeyword(e.target.value)} />
                    </div>
                )}

                <button className="search-button" onClick={handleSearch}>검색하기</button>

                {errorMessage && <p className="search-error-message">{errorMessage}</p>}

                <div className="search-results">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((accommodation) => (
                                <Link to={`/travelArticle/${accommodation.id}/${accommodation.sname}/${accommodation.pyong}/${accommodation.price}/${accommodation.addr}/${accommodation.imgName}/${accommodation.wido}/${accommodation.gyungdo}`}>
                                <li key={accommodation.id}>
                                    <h3 style={{color:'black'}}>{accommodation.sname}</h3>
                                    <p style={{color:'black'}}>가격: {accommodation.price}원</p>
                                    <p style={{color:'black'}}>평점: {accommodation.pyong}</p>
                                </li>
                                </Link>
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
