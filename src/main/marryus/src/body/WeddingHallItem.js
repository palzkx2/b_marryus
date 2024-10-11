import React from 'react';
import './WeddingHallItem.css';
import image from '../s_images/weddingHall/1.jpg'
import Numeral from 'numeral';
import { BsBookmarkHeart, BsBookmarkHeartFill, BsCartPlus, BsCartPlusFill } from 'react-icons/bs';

const WeddingHallItem = ({item}) => {

    const {name,addr,tag,menu,price} = item

    return (
        <>      
                <img className='wdImage' src={image} alt='이미지'/>
                <div className='wdSub title'>{name}</div>
                <div className='wdSub'>평점: 5.5 </div>
                <div className='wdSub'>{addr}</div>
                <div className='wdSub' style={{fontSize:'14px'}}>{tag}</div>
                <div className='wdSub' style={{fontSize:'15px'}}>{menu}</div>

                <div className='wdSub' style={{fontWeight:'bold',fontSize:'15px',marginBottom:'5px'}}>
                    {Numeral(price).format('0,0')}
                    <div className='addIconLocation'>
                        <BsCartPlus className='addIcon' />
                        <BsCartPlusFill className='addIcon'/>
                        <BsBookmarkHeart className='addIcon'/>
                        <BsBookmarkHeartFill className='addIcon'/>
                    </div>
                </div>   
        </>
    );
};

export default WeddingHallItem;