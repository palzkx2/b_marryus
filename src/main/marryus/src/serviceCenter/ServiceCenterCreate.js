import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './serviceCenterCreate.css';

const ServiceCenterCreate = () => {
    const [num, setNum] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [pwd, setPwd] = useState();
    const [subject, setSubject] = useState();
    const [content, setContent] = useState();
    const [create] = useState(new Date());
    const [hit, setHit] = useState(0);

    const history = useHistory();

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지 (페이지 리로드 방지)

        try {
            await axios.post('/api/help', {
                num, name, email, pwd, subject, content, create
            });
            history.push('/ServiceCenter');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="article-container">
            <h2>1:1 문의하기</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="tea1"
                        type="text"
                        placeholder="제목"
                        onChange={e => setSubject(e.target.value)}
                        required
                        maxLength="100"
                    />
                </div>

                <div>
                    <input
                        type="text" className="tea1"
                        placeholder="이름"
                        onChange={e => setName(e.target.value)}
                        required
                        maxLength="20"
                    />
                </div>

                <div>
                    <input
                        type="text"className="tea1"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        maxLength="50"
                    />
                </div>

                <div>
                    <input className="pa"
                        type='password'
                        placeholder="비밀번호 (문의 내용 수정/삭제시 필요)"
                        onChange={e => setPwd(e.target.value)}
                        required
                        maxLength="7"
                    />
                </div>

                <div>
                    <textarea className="tea2"
                        rows="12"
                        placeholder="문의 내용"
                        onChange={e => setContent(e.target.value)}
                        required
                        style={{ resize: 'none', backgroundColor: '#ffffff' }}
                    />
                </div>

                <div>
                    <button type="submit" className="cbtnHover">문의접수</button>
                    <Link to='/ServiceCenter'>
                        <button type="button" className="cbtnHover">취소</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ServiceCenterCreate;
