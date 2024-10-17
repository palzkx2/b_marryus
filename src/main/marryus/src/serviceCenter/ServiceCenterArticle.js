import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';

const ServiceCenter = () => {

    const {id} = useParams()

    const [name,setName] = useState('관리자')
    const [content,setContent] = useState('abc')
    const [create,setCreate] = useState('2024-10-15')
    const [subject,setSubject] = useState('')
    const [hit,setHit] = useState(0)

    const [help,setHelp] = useState()

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