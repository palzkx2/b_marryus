import axios from 'axios';
import React, { useState } from 'react';
import loginImg from '../../s_images/admin/locker.jpg'
import AddSukso from './AddSukso';
import AddAgency from './AddAgency';
import AddPlace from './AddPlace';
import GeocodingComponent from './GeocodingComponent ';

const InsertTravle = () => {

    
    const [searchType, setSearchType] = useState('');

   


    return (
        <div>
            <div className='alignGood'>
                <div style={{margin:'auto',width:'1400px', height:'350px', display:'flex', justifyContent:'center', alignContent:'center', backgroundImage:`url(${loginImg})`, backgroundSize:'contain', backgroundPosition:`center calc(0% - 0px)`}}>
                <h1 style={{marginTop:'50px',color:'green'}}>데이터 추가</h1>
                </div>
            </div>


            <div className='alignGood'>
                <div className='mainContainer' style={{backgroundColor:'#F6F6F6'}}>
                    <div className='alignGood'>
                       
                        <div style={{margin:'10px',padding:'10px'}}>
                            <h2>추가할 자료 유형</h2>
                            <select className="search-type-select"  onChange={(e) => setSearchType(e.target.value)}>
                                <option value="">선택하세요</option>
                                {/* <option value="location">지역</option> */}
                                {/* <option value="agency">여행사</option> */}
                                <option value="sukso">숙소</option>
                            </select>
                            <div style={{margin:'10px',padding:'10px'}}>
                                {
                                    searchType==='sukso' && <AddSukso/>
                                }
                                {
                                    searchType==='agency' && <AddAgency/>
                                }
                                {
                                    searchType==='location' && <AddPlace/>
                                }
                               
                            </div>
                        </div>
                        


                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsertTravle;