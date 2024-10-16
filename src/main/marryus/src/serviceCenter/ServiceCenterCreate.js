import axios from "axios";
import { useState } from "react";
import { Link,useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ServiceCenterCreate = () => {

    const [num,setNum] = useState()
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [pwd,setPwd] = useState()
    const [subject,setSubject] = useState()
    const [content,setContent] = useState()
    const [create] = useState(new Date())
    const [hit,setHit] = useState(0)

    const history = useHistory();

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지 (페이지 리로드 방지)

        try {
            await axios.post('/api/help',{
                num,name,email,pwd,subject,content,create});
            history.push('/ServiceCenter');
        }catch(error){
            console.log(error);
        }
    };

    return (
        <div>
            <div>
                1:1 문의하기
            </div>
            <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <dl>
                        <dd>
                            <input type="text" placeholder="제목" onChange={e => setSubject(e.target.value)} required size="35" maxlength="100"/>
                        </dd>
                    </dl>
                </div>
     
                <div>
                    <dl>
                        <dd>
                            <input type="text" placeholder="이름" onChange={e => setName(e.target.value)} required size="35" maxlength="20"/>
                        </dd>
                    </dl>
                </div>
                
                <div>
                    <dl>
                        <dd>
                            <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} required size="35" maxlength="50"/>
                        </dd>
                    </dl>
                </div>

                <div>
                    <dl>
                        <dd>
                            <input type="password" placeholder="비밀번호    (문의 내용 수정/삭제시 필요)" onChange={e => setPwd(e.target.value)} required size="35" maxlength="7"/>&nbsp;
                        </dd>
                    </dl>
                </div>
                
                <div>
                    <dl>
                        <dd>
                            <textarea rows="12" cols="63" placeholder="문의 내용" onChange={e => setContent(e.target.value)} required
                        style={{resize: 'none', backgroundColor: '#ffffff'}}></textarea>
                        </dd>
                    </dl>
                </div>
            </div>
                <div>
                    <button type="submit">문의접수</button>
                    <Link to='/ServiceCenter'>
                        <button>취소</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ServiceCenterCreate;