import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import GeocodingComponent from './GeocodingComponent ';

const AddSukso = () => {
    const history = useHistory();

    const [imageFile, setImageFile] = useState(null);
    const [sname, setSname] = useState('');
    const [hosil, setHosil] = useState('');
    const [price, setPrice] = useState('');
    const [where, setWhere] = useState('국내'); // 기본값 설정
    const [place, setPlace] = useState('');
    const [pyong, setPyong] = useState('');
    const [wido, setWido] = useState('');
    const [gyungdo, setGyungdo] = useState('');
    const [addr, setAddr] = useState('');

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
        console.log(e.target.files[0]); // 파일 정보 로그
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Form Data:', { 
            imageName: imageFile.name, 
            sname, 
            hosil, 
            price, 
            where, 
            place,
            pyong,
            wido,
            gyungdo,
            addr
        });

        const formData = new FormData();
        formData.append('sname', sname);
        formData.append('hosil', hosil);
        formData.append('price', price);
        formData.append('where', where);
        formData.append('place', place);
        formData.append('pyong', pyong);
        formData.append('wido', wido);
        formData.append('gyungdo', gyungdo);
        formData.append('addr', addr);
        formData.append('imgName', imageFile.name);
        formData.append('imgName', imageFile);

        try {
            const response = await axios.post('http://localhost:8080/api/insertSukso', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data); // 성공 메시지 표시
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert('숙소 추가 중 오류가 발생했습니다.');
        }
    };

    const getRegions = () => {
        if (where === '국내') {
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
        } else if (where === '해외') {
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
        <form onSubmit={handleSubmit}>
            <h3 style={{ textAlign: 'center', color: 'blue' }}> 숙소 추가 </h3>

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>이미지:</p>
                <input type="file" onChange={handleFileChange} required />
            </label>
            <br />

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>숙소 이름:</p>
                <input
                    style={{ margin: '4px', padding: '10px', width: '300px' }}
                    type="text"
                    value={sname}
                    onChange={(e) => setSname(e.target.value)}
                    required
                />
            </label>
            <br />

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>호실:</p>
                <input
                    style={{ margin: '4px', padding: '10px', width: '300px' }}
                    type="text"
                    value={hosil}
                    onChange={(e) => setHosil(e.target.value)}
                    required
                />
            </label>
            <br />

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>가격:</p>
                <input
                    style={{ margin: '4px', padding: '10px', width: '300px' }}
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <br />

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>국내 or 해외:</p>
                <select
                    style={{ margin: '4px', padding: '10px', width: '94%' }}
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                >
                    <option value="국내">국내</option>
                    <option value="해외">해외</option>
                </select>
            </label>
            <br />

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>지역 선택:</p>
                <select
                    style={{ margin: '4px', padding: '10px', width: '94%' }}
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                >
                    <option value="">선택하세요</option>
                    {getRegions()}
                </select>
            </label>
            <br />

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>평점:</p>
                <input
                    style={{ margin: '4px', padding: '10px', width: '300px' }}
                    type="text"
                    value={pyong}
                    onChange={(e) => setPyong(e.target.value)}
                    required
                />
            </label>
            <br />

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>숙소 위치(위도):</p>
                <input
                    style={{ margin: '4px', padding: '10px', width: '300px' }}
                    type="text"
                    value={wido}
                    onChange={(e) => setWido(e.target.value)}
                    required
                />
            </label>
            <br />

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>숙소 위치(경도):</p>
                <input
                    style={{ margin: '4px', padding: '10px', width: '300px' }}
                    type="text"
                    value={gyungdo}
                    onChange={(e) => setGyungdo(e.target.value)}
                    required
                />
            </label>
            <br />

            <label style={{ margin: '10px', padding: '10px' }}>
                <p>주소:</p>
                <input
                    style={{ margin: '4px', padding: '10px', width: '300px' }}
                    type="text"
                    value={addr}
                    onChange={(e) => setAddr(e.target.value)}
                    required
                />
            </label>
            <br />
            <GeocodingComponent/>

            <button style={{ margin: '30px 10px 10px 168px', padding: '10px' }} type="submit">
                추가하기
            </button>
        </form>
    );
};

export default AddSukso;
