import React, { useState } from 'react';
import './sdmBoard.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import studioImg from '../s_images/studioImage.jpg'

const SdmBoard = () => {
    const sdmInfo = [
        {
            name: "아우라스튜디오",
            subName: "서울특별시 강남구",
            like: "하트5개",
            tag: "배경위주 엔틱함 옥상씬",
            color: "green"
        },
        {
            name: "아우라스튜디오1",
            subName: "서울특별시 강남구1",
            like: "하트5개1",
            tag: "배경위주 엔틱함 옥상씬1",
            color: "green1"
        },
        {
            name: "아우라스튜디오2",
            subName: "서울특별시 강남구2",
            like: "하트5개2",
            tag: "배경위주 엔틱함 옥상씬2",
            color: "green2"
        },
        {
            name: "아우라스튜디오3",
            subName: "서울특별시 강남구3",
            like: "하트5개3",
            tag: "배경위주 엔틱함 옥상씬3",
            color: "green3"
        },
        {
            name: "아우라스튜디오4",
            subName: "서울특별시 강남구4",
            like: "하트5개4",
            tag: "배경위주 엔틱함 옥상씬4",
            color: "green4"
        },
        {
            name: "아우라스튜디오5",
            subName: "서울특별시 강남구5",
            like: "하트5개5",
            tag: "배경위주 엔틱함 옥상씬5",
            color: "green5"
        },
        {
            name: "아우라스튜디오6",
            subName: "서울특별시 강남구5",
            like: "하트5개5",
            tag: "배경위주 엔틱함 옥상씬5",
            color: "green5"
        },
        {
            name: "아우라스튜디오7",
            subName: "서울특별시 강남구5",
            like: "하트5개5",
            tag: "배경위주 엔틱함 옥상씬5",
            color: "green5"
        },
        {
            name: "아우라스튜디오8",
            subName: "서울특별시 강남구5",
            like: "하트5개5",
            tag: "배경위주 엔틱함 옥상씬5",
            color: "green5"
        },
        {
            name: "아우라스튜디오9",
            subName: "서울특별시 강남구5",
            like: "하트5개5",
            tag: "배경위주 엔틱함 옥상씬5",
            color: "green5"
        },
        {
            name: "아우라스튜디오10",
            subName: "서울특별시 강남구5",
            like: "하트5개5",
            tag: "배경위주 엔틱함 옥상씬5",
            color: "green5"
        }
    ];

    const [data] = useState(sdmInfo);

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${studioImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -130px)`}}>
                </div>
            </div>
            <div className='stk'>
                <div className='bigCategoryInput'>
                    메리어스
                    <input type='text' style={{ marginTop: '30px', height: '30px' }} />
                </div>
                <div className='bigCategory'>
                    <div className='categorys'>
                        <button className='btnStyle'>전체상품</button>
                        <p style={{ paddingLeft: '170px', paddingTop: '11px' }}>&gt;&gt;</p>
                    </div>
                    <div className='categorys'>
                        <button className='btnStyle'>스튜디오</button>
                        <p style={{ paddingLeft: '170px', paddingTop: '11px' }}>&gt;&gt;</p>
                    </div>
                    <div className='categorys'>
                        <button className='btnStyle'>드레스</button>
                        <p style={{ paddingLeft: '188px', paddingTop: '11px' }}>&gt;&gt;</p>
                    </div>
                    <div className='categorys'>
                        <button className='btnStyle'>메이크업</button>
                        <p style={{ paddingLeft: '170px', paddingTop: '11px' }}>&gt;&gt;</p>
                    </div>
                </div>
            </div>
            <div style={{marginLeft:'100px'}}>
                <div className='smallCategory'>
                    <button className='btnStyle1'>전체상품</button>
                    <button className='btnStyle1'>인물위주</button>
                    <button className='btnStyle1'>배경위주</button>
                    <button className='btnStyle1'>사랑스러움</button>

                    <button className='btnStyle1' style={{ marginLeft: '540px' }}>낮은가격순</button>
                    <button className='btnStyle1'>높은가격순</button>
                </div>
                <div style={{ marginLeft: '21.5%' }}>
                    {
                        // data를 4개씩 나누기 위한 배열 생성
                        Array.from({ length: Math.ceil(data.length / 4) }).map((_, rowIndex) => (
                            <div key={rowIndex} style={{ display: 'flex', marginBottom: '20px', margin:'0 20px'}}>
                                {
                                    data.slice(rowIndex * 4, rowIndex * 4 + 4).map((item, index) => (
                                        <div key={index} className='imgBoard' style={{ width: '220px', margin: '0 26px' }}>
                                            <div className='imgDiv'>
                                                <Link to={`/sdmArticle/${item.name}`} style={{color:'black'}}>
                                                    <img src='' alt='' width={220} height={200} />
                                                </Link>
                                                <Link to={`/sdmArticle/${item.name}`} style={{color:'black'}}>
                                                    <strong>{item.name}</strong>
                                                </Link>
                                                <Link to={`/sdmArticle/${item.name}`} style={{color:'black'}}>
                                                    <p>{item.subName}</p>
                                                </Link>
                                                <Link to={`/sdmArticle/${item.name}`} style={{color:'black'}}>
                                                    <p>{item.like}</p>
                                                </Link>
                                                <Link to={`/sdmArticle/${item.name}`} style={{color:'black'}}>
                                                    <p>{item.tag}</p>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default SdmBoard;
