import React, { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const ServiceCenter = () => {

    const [num,setNum] = useState(1)
    const [name,setName] = useState('관리자')
    const [subject,setSubject] = useState('MarryUs 공지사항')
    const [content,setContent] = useState('abc')
    const [create,setCreate] = useState('2024-10-15')
    const [hit,setHit] = useState(0)

    

    return (
        <div>
            <div>
                1:1 문의
            </div>

            <div>
                <div>
                    <p text={subject}></p>
                </div>
                <div>
                    <dl>
                        <dt>작성자</dt>
                        <dd text={name}>{name}</dd>
                    </dl>
                </div>

                <div>
                    <dl>
                        <dt>등록일</dt>
                        <dd text={create}>{create}</dd>
                        <dt>조회수</dt>
                        <dd text={hit}>{hit}</dd>
                    </dl>
                </div>

                <div>
                    <table width="600" border="0">
                        <tr>
                            <td style={{padding:'20px 80px 20px 62px', valign:'top', height:200}} text={content}>
                                {content}
                            </td>
                        </tr>
                    </table>
                </div>                   
            </div>

            <div>
                <div>
                    <button>수정</button>
                    <button>삭제</button>
                <Link to='/ServiceCenter'>
                    <button>목록</button>
                </Link>
                </div>                
            </div>
        </div>
    );
};

export default ServiceCenter;