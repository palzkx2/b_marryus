import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './serviceCenterArticle.css';

const ServiceCenterArticle = () => {
    const { id } = useParams(); // URL에서 id를 가져옴
    const history = useHistory();
    const [article, setArticle] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ subject: '', content: '' });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`/api/help/${id}`);
                setArticle(response.data);
                setFormData({ subject: response.data.subject, content: response.data.content });
                setLoading(false);
            } catch (error) {
                setError('게시글을 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`/api/help/${id}`, formData);
            setArticle({ ...article, ...formData });
            setIsEditing(false);
        } catch (error) {
            setError('수정하는 데 실패했습니다.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('이 게시글을 삭제하시겠습니까?')) {
            try {
                await axios.delete(`/api/help/${id}`);
                history.push('/ServiceCenter'); // 삭제 후 홈으로 리다이렉트
            } catch (error) {
                setError('삭제하는 데 실패했습니다.');
            }
        }
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="article-container">
            {isEditing ? (
                <div>
                    <input className='tea1'
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                    <br/>
                    <textarea className='tea2'
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                    />
                    <br/>
                    <button onClick={handleSave} className='cbtnHover'>저장</button>
                    <button onClick={() => setIsEditing(false)} className='cbtnHover'>취소</button>
                </div>
            ) : (
                <div>
                    <h2>{article.subject}</h2>
                    <p><strong>작성자:</strong> {article.name}</p>
                    <p><strong>작성일:</strong> {article.created}</p>
                    <p><strong>조회수:</strong> {article.hitCount}</p>
                    <div className="article-content">
                        <p style={{whiteSpace:'pre-wrap', wordWrap:'break-word', overflowWrap:'break-word'}}>{article.content}</p>
                            {/* whiteSpace:'pre-wrap' 공백과 줄바꿈을 유지하면서 자동 줄바꿈 */}
                            {/* wordWrap:'break-word' 긴 단어가 줄바꿈 */}
                            {/* overflowWrap:'break-word' 단어가 길어지면 줄바꿈 */}
                    </div>
                    <button onClick={handleEdit} className='cbtnHover'>수정</button>
                    <button onClick={handleDelete} className='cbtnHover'>삭제</button>
                </div>
            )}
        </div>
    );
};

export default ServiceCenterArticle;