import React, { useEffect } from 'react';
import './sdm.css'
const MessageSdm = ({msg,isShow,setIsShow}) => {

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setIsShow(false)
        },2000)
        return()=>{
            clearTimeout(timer) //setTimeout(()=>{이면 맞추어서
        }
    },[isShow])

    return (
        <div className={`sdmMessage ${isShow?'on':''}`}>
            메시지:{msg}
        </div>
    );
};

export default MessageSdm;