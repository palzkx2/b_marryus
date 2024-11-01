import React, { useEffect, useState } from 'react';
import serviceCenterImg from '../s_images/serviceCenterImage.jpg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './serviceCenter.css'
import axios from 'axios';

const ServiceCenter = () => {

    const [expandedIndex, setExpandedIndex] = useState();

    const faqs = [
        {
            question: "웨딩 하객에게 주차권은 무료로 제공되나요?",
            answer: "모든 하객들에게 4시간 무료 주차권이 제공되며, 접수대에 준비되어 있습니다. "
        },
        {
            question: "중식, 한식메뉴도 웨딩 때 가능한가요?",
            answer: "양식 뿐만 아니라 중식과 한식 메뉴 모두 인원 제한없이 가능합니다."
        },
        {
            question: "연회 행사 확인은 어떻게 하면 되나요?",
            answer: (
                <>
                연회 행사명 또는 주최자나 주최 회사명으로 확인이 가능합니다. 당일 행사는 Instant Service Center로 바로 확인이 가능합니다만 ,<br/> 이후 날짜의 행사 확인은 연회세일즈(558-7778)에서 가능합니다.
                </>
            )
        },
        {
            question: "호텔 내에 행사장 안내판은 어디에 있나요?",
            answer: "지상 1층에 2개, 2층에 3개, 5층에 3개 그리고 각 행사장 앞에 설치 되어 있습니다. "
        },
        {
            question: "계약금 부분은 어떻게 진행되나요? (지불방법)",
            answer: "계약 시 총 예상 비용의 20% 해당하는 금액을 신용카드 또는 계좌이체로 예치하셔야 행사 확정이 됩니다.  "
        },
        {
            question: "봉사료와 세금이 추가되나요?",
            answer: (
                <>
                식 음료 부분에 대해서 봉사료 10%와 세금 10%가 포함되어 있습니다. 기타 식음료 부분을 제외한 대관료, A/V장비, 꽃장식 등에 대한 사용은<br/> 10% 세금만 포함됩니다.
                </>
            )
        },
        {
            question: "저녁행사 시 행사종료는 몇 시까지 해야하나요?",
            answer: "연회 행사는 22시 종료를 기준으로 합니다"
        },
        {
            question: "연회장에서 흡연이 가능한가요?",
            answer: "정부 시책에 의해 실내에서의 흡연은 금지하고 있습니다."
        }
    ];


    const [help,setHelp] = useState([])

    const [sortType, setSortType] = useState('date');

    //페이징
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    

    useEffect(() => {
        const helpList = async () => {
            try {
                const response = await axios.get('/api/help');
                setHelp(response.data)
            }catch(error){
                console.error(error)
            }
        };

        helpList();
    },[]);

    const incrementHit = async (id) => {
        try {
            await axios.post(`/api/help/increment-hit/${id}`);
            // 조회수를 성공적으로 증가시킨 후, 목록을 다시 가져올 수도 있습니다.
            const response = await axios.get('/api/help');
            setHelp(response.data);
        } catch (error) {
            console.error('조회수 증가 실패:', error);
        }
    };

    const fetchHelpData = async (sortType) => {
        try {
            const endpoint = sortType === 'date' ? '/api/help/sort/date' : '/api/help/sort/hitCount';
            const response = await axios.get(endpoint);
            
            setHelp(response.data);
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchHelpData(sortType); //고객센터에 처음들어오면 무작위로 나와서 최신순으로 정렬
    },[]);

    useEffect(() => {
            fetchHelpData(sortType); // sortType에 따라 데이터 가져오기
        }, [sortType]);

    const toggleAnswer = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    
    //페이징
    const totalPages = Math.ceil(help.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = help.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {/* =====================================고객센터 이미지============================================ */}
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${serviceCenterImg})`, backgroundSize:'cover', backgroundPosition:`center calc(100% - -220px)`}}>
                </div>
            </div>
            {/* ========================================고객센터=============================================== */}
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{background:'#fff', width:'1400px', height:'900px', display:'flex', justifyContent:'center',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '50px', border:'#C2A67E 2px solid',borderTop:'none'}}>
                    <p style={{fontSize:'18pt', fontWeight:'bold', textAlign:'center', marginTop: '20px'}}>고객센터</p>
                <div style={{width:'1200px', margin:'50px 0'}}>
                    <p style={{fontSize:'18pt'}}>자주 묻는 질문</p>
                </div>                    
                    <div className="faq-container">
                        {faqs.map((faq, index) => (
                            <div key={index} className="faq-item">
                                <h3 onClick={() => toggleAnswer(index)} className="faq-question">
                                    {faq.question}
                                </h3>
                                {expandedIndex === index && <p className="faq-answer">{faq.answer}</p>}
                            </div>
                        ))}
                    </div>
    {/* ========================================1:1문의================================================= */}
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{background:'#fff', width:'1400px', height:'500px', display:'flex', justifyContent:'center', alignContent:'center', marginBottom:'50px', border:'#C2A67E 2px solid'}}>
                    <div style={{width:'1200px', height:'400px', margin:'50px 0'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                            <td style={{fontSize:'18pt'}}>1:1 문의</td>
                                
                            <a href="/ServiceCenterCreate" style={{textDecoration: 'none', color: 'black'}}>
                                <p style={{fontSize:'12pt'}}>1:1 문의하기</p>
                            </a>
                        </div>
                        
                            <label htmlFor="sort">정렬 기준:</label>
                                <select
                                    id="sort"
                                    value={sortType}
                                    onChange={(e) => setSortType(e.target.value)}
                                >
                                    <option value="date">최신순</option>
                                    <option value="hitCount">조회수순</option>
                                </select>

                        <div style={{background:'#C2A67E', width:'100%', height:'60px', display:'flex', justifyContent:'start', alignContent:'start', marginTop:'10px'}}>
                            <p style={{marginLeft:'30px', fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>순번</p>
                            <p style={{margin:'0 400px', fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>제목</p>
                            <p style={{marginRight:'70px', fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>작성자</p>
                            <p style={{marginRight:'70px', fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>작성일</p>
                            <p style={{fontSize:'12pt', padding:'20px 0', fontWeight:'bold', color:'white'}}>조회수</p>
                        </div>
                        {/* ==================================================== */}
                        {currentItems.map((help,index) => (
                        <div style={{width:'100%', height:'50px', display:'flex', justifyContent:'start', alignContent:'start', borderBottom:'1px solid rgba(0,0,0,0.2)'}} key={help.id}>
                            <p style={{ marginLeft: '25px', fontSize: '12pt', padding: '20px 0' }}>{index + 1}</p> {/* 순번 출력 */}
                            <div style={{marginLeft:'50px', margin:'auto'}}>
                                <a 
                                        href={`/ServiceCenterArticle/${help.id}`} 
                                        style={{ fontSize: '12pt', padding: '20px 0', textDecoration: 'none', color: 'black' }}
                                        onClick={() => incrementHit(help.id)} // 클릭 시 조회수 증가 함수 호출
                                    >
                                        {help.subject}
                                </a>
                            </div>
                            <p style={{marginRight:'50px', fontSize:'12pt', padding:'20px 0'}}>{help.name}</p>
                            <p style={{marginRight:'50px', fontSize:'12pt', padding:'20px 0'}}>{help.created}</p>
                            <p style={{fontSize:'12pt', padding:'20px 0', marginRight:'40px'}}>{help.hitCount}</p>
                        </div>
                        ))}
                        {/* =================페이징============================== */}
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    style={{ margin: '0 5px', padding: '5px 10px', border:'0', backgroundColor: currentPage === index + 1 ? '#C2A67E' : '#fff' }}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
                <div style={{marginBottom:'50px'}}>
                    <Link to='/'>
                        <button className='btnHover'>메인으로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCenter;