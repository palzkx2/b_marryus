import React, { useEffect, useState } from 'react';
import sdmImg from '../s_images/sdmImage.jpg'; // 기본 이미지
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
//import EditSdm from '../sdm/EditSdm';
import './sdmarticle.css';
import SdmModal from '../sdm/common/SdmModal'; 
import '../sdm/common/sdmmodal.css';
import RingReviewList from '../weddingItem/RingReviewList';


export const API_SERVER_HOST = 'http://localhost:8080'; // 서버 주소




const SdmArticle = () => {
    const { itemNm } = useParams();
    const [sdm, setSdm] = useState(null);
   // const [isEdit, setIsEdit] = useState(false); 
   const [selectedImage, setSelectedImage] = useState('');
   const [userRole,setUserRole] = useState('')
   const [showModal, setShowModal] = useState(false);
   const [item, setItem] = useState();

   useEffect(() => {
    const fetchSessionData = async () => {
        try {
            const response = await axios.get('/api/session', { withCredentials: true });
            setUserRole(response.data.userRole);
        } catch (error) {
            console.error('세션 정보 가져오기 실패:', error);
        }
    };
    fetchSessionData();
}, []);

const postData = async (item) => {
    if (!userRole) {
        setShowModal(true); // 모달을 표시
        return;
    }

    const confirmation = window.confirm("장바구니에 담으시겠습니까?");
    if (confirmation) {
        const data = {
            name: item.itemNm,
            price: item.price,
            category: item.category 
        };
        try {
            const response = await axios.post(`${API_SERVER_HOST}/api/addCart`, data, {
                withCredentials: true
            });
            console.log('POST response data:', response.data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    } else {
        console.log("삭제가 취소되었습니다.");
    }
};


    useEffect(() => {
        const fetchItem = async () => {
            console.log("fetchitem이 호출되었습니다");
            console.log("itemNm:", itemNm);
            try { 
                const response = await axios.get(`http://localhost:8080/api/sdm/item/${itemNm}`);
                if (response.data) {
                    console.log("response.data:", response.data);
                    setSdm(response.data);
                    setSelectedImage(response.data.uploadFileNames.length > 0 
                        ? `http://localhost:8080/api/sdm/view/${response.data.uploadFileNames[0]}` 
                        : sdmImg);
                } else {
                    console.log("No items found.");
                    setSdm(null);
                }
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        };

        if (itemNm) {
            fetchItem();
        }
    }, [itemNm]);

    if (!sdm) {
        return <p>Loading...</p>;
    }

    /* 보류
    const handleUpdate = (updatedSdm) => {
        // 업데이트된 정보를 처리하는 함수
        setSdm(updatedSdm);
        setIsEdit(false); // 수정 모드 종료
    };
*/
    const handleImageClick = (image) => {
        setSelectedImage(image); // 클릭한 이미지로 상태 업데이트
    };


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/sdm/delete/${sdm.id}`); // 서버에 삭제 요청
            // 삭제 후 목록으로 리다이렉트하거나 상태 업데이트
            // 예: history.push('/sdm'); (react-router-dom을 사용하는 경우)
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
        }
    };

    const handleModalClose = () => setShowModal(false); // 모달 닫기 핸들러

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${sdmImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% + 300px)`}}>
                    <p style={{marginTop:'140px', fontSize:'32pt', fontWeight:'bold', color:'#F8D3D3', textShadow:'2px 2px 2px rgba(0,0,0, 0.5)'}}>♥ 스/드/메 ♥</p>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'800px', display:'flex', justifyContent:'start', alignContent:'start',placeContent:'normal'}}>
                    
                    <div style={{width:'900px', height:'550px', margin:'70px', marginRight:'15px' ,placeContent:'normal'}}>
                        <img 
                            src={selectedImage} 
                            alt={sdm.itemNm} 
                            width={857}
                            height={550}
                            style={{ border: '1px solid black' }} 
                        />
                    </div>
                    <div style={{width:'350px', height:'480px', margin:'70px', marginLeft:'15px'}}>
                        <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                            <div style={{marginTop:'25px'}}>
                                <p style={{fontSize:'20pt'}}>Marry Us</p>
                            </div>
                        </div>

                        <hr/>

                        <div style={{display:'flex', justifyContent:'start', alignContent:'start'}}>
                            <div style={{marginLeft:'20px'}}>
                                <p style={{fontSize:'14pt', marginTop:'15px'}}>- 상세정보</p>
                                <p style={{color:'gray'}}>아름다운 사랑의 감정을 느낄 수 있습니다.</p>
                                <p style={{ color: 'gray' }}>{sdm.itemNm}</p>
                                <p style={{ color: 'gray' , whiteSpace: 'break-spaces'}}>{sdm.itemDetail}</p>
                                <p style={{ color: 'gray' }}>{sdm.totalLikes}</p>
                                <p style={{ color: 'gray' }}>{sdm.tag}</p>
                                <p style={{ color: 'gray' }}>{sdm.category}</p>
                                
                            </div>
                        </div>

                        <div style={{display:'flex', justifyContent:'start', alignContent:'start'}}>
                            <div style={{marginTop:'15px', border:'1px solid black', width:'350px', height:'350px'}}>
                                지도
                            </div>
                        </div>

                    </div>
                </div>
            </div>

          {/* <div className='sdmarticle'>
            <div className='sdmarticle-item' style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'-160px'}}>
                <div style={{width:'1260px', height:'160px', display:'flex', justifyContent:'start', alignContent:'center'}}>
                    <div style={{width:'900px', height:'120px', display:'flex', justifyContent:'center', alignContent:'center'}}>
                        <div style={{margin:'0px 20px', width:'750px', height:'120px', display:'flex', justifyContent:'space-between', alignContent:'center'}}>
                            <div style={{background:'red', width:'120px', height:'120px'}}>
                                <img src={`http://localhost:8080/api/sdm/view/${sdm.uploadFileNames[0]}`} alt={sdm.itemNm} width={120} height={120} />
                            </div>
                            <div style={{background:'red', width:'120px', height:'120px'}}>
                                <img src={`http://localhost:8080/api/sdm/view/${sdm.uploadFileNames[1]}`} alt={sdm.itemNm} width={120} height={120} />
                               
                            </div>
                            <div style={{background:'red', width:'120px', height:'120px'}}>
                                <img src={`http://localhost:8080/api/sdm/view/${sdm.uploadFileNames[2]}`} alt={sdm.itemNm} width={120} height={120} />
                            </div>
                            <div style={{background:'red', width:'120px', height:'120px'}}>
                                 <img src={`http://localhost:8080/api/sdm/view/${sdm.uploadFileNames[3]}`} alt={sdm.itemNm} width={120} height={120} />
                            </div>
                            <div style={{background:'red', width:'120px', height:'120px'}}>
                                <img src={`http://localhost:8080/api/sdm/view/${sdm.uploadFileNames[4]}`} alt={sdm.itemNm} width={120} height={120} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

<div>
            <div className='sdmarticle'>
                <div className='sdmarticle-item' style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '-160px' }}>
                    <div style={{ width: '1260px', height: '160px', display: 'flex', justifyContent: 'start', alignContent: 'center' }}>
                        <div style={{ width: '900px', height: '120px', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                            <div style={{ margin: '0px 20px', width: '750px', height: '120px', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                                {sdm.uploadFileNames.map((fileName, index) => (
                                    <div key={index} style={{ background: 'red', width: '120px', height: '120px' }}>
                                        <img 
                                            src={`http://localhost:8080/api/sdm/view/${fileName}`} 
                                            alt={sdm.itemNm} 
                                            width={120} 
                                            height={120} 
                                            onClick={() => handleImageClick(`http://localhost:8080/api/sdm/view/${fileName}`)} // 클릭 시 함수 호출
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                

                
            </div>


















            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width: '1260px',height: '140px',display: 'flex',placeContent: 'center', marginLeft: '472px',justifyContent: 'center'}}>
                    <div style={{marginTop:'20px', marginLeft:'200px'}}>
                        <Link to='/sdm'>
                            <button style={{fontSize:'22pt', padding:'20px 70px', background:'#32CD32', border:'none', color:'white', cursor:'pointer'}}>목록</button>
                        </Link>
                       
                    </div>
                    
                    {
                        showModal && (
                            <SdmModal message="로그인이 필요합니다." onClose={handleModalClose} />
                        )
                    }
                    
                    
                    <div>
                        <p onClick={() => postData(sdm)} className='byeBtna' style={{backgroundColor:'gray',border:'none', paddingLeft:'28px',cursor:'pointer'}}>장바구니</p>
                    </div>
                    
                    <div style={{width:'1260px', height:'140px',display:'flex', justifyContent:'right'}}>
                            {/* 상세페이지 수정 보류
                            <div style={{marginTop:'20px' }}>
                            <Link to="/sdmEdit">
                                    <div>
                                        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', }} onClick={()=> setIsEdit(true)}>
                                                수정하기
                                        </button>
                                        {isEdit && (<EditSdm current={sdm}
                                        handleUpdate={handleUpdate}
                                        setIsEdit={setIsEdit}/>
                                        )}
                                    </div>

                                </Link>
                                <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }} >
                                                삭제하기
                                </button>
                            </div> */}
                    </div>
                </div>
            </div>
            <RingReviewList item={sdm}/>
        </div>
    </div>
    );
};

export default SdmArticle;