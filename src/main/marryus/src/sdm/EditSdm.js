import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditSdm = () => {
  const { id } = useParams();
  const history = useHistory();

  const [sdm, setSdm] = useState({
    id: 0,
    itemNm: '',
    addr: '',
    totalLikes: 0,
    itemDetail: '',
    stockNumber: 0,
    price: 0,
    rating: 0,
    tag: '',
    category: '',
    itemsellstatus: '',
    delFlag: false,
  });

  const [image, setImage] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.16.23:8080/api/sdm/${id}`);
      setSdm(response.data);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const changeInput = (evt) => {
    const { value, name } = evt.target;
    setSdm({
      ...sdm,
      [name]: ['totalLikes', 'stockNumber', 'price', 'rating'].includes(name)
        ? parseInt(value) || 0
        : value,
    });
  };

  const changeImage = (evt) => {
    const files = evt.target.files;
    const fileArray = Array.from(files);
    setImage(fileArray);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    if (!sdm.itemNm || !sdm.addr || !sdm.tag) {
      console.log("필수 입력 필드가 누락되었습니다.");
      return;
    }
    const formData = new FormData();
    formData.append('sdm', JSON.stringify(sdm));
    if (image && image.length > 0) {
      image.forEach((file) => {
        formData.append('files', file);
      });
    }
    try {
      const response = await axios.patch(`http://192.168.16.23:8080/api/modify/${id}`, formData);
      if (response.data.RESULT === 'SUCCESS') {
        alert('수정되었습니다.');
        history.push(`/sdm/${id}`);
      }
    } catch (error) {
      console.error("수정 중 오류 발생:", error);
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/api/delete/${id}`);
  //     if (response.data.RESULT === 'SUCCESS') {
  //       alert('삭제되었습니다.');
  //       history.push('/sdm'); // Redirect after deletion
  //     }
  //   } catch (error) {
  //     console.error("삭제 중 오류 발생:", error);
  //   }
  // };

  if (!sdm) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <h2>상품 수정</h2>
        <p>
          <label>상호명</label>
          <input type="text" name="itemNm" value={sdm.itemNm} onChange={changeInput} required />
        </p>
        <p>
          <label>주소</label>
          <input type="text" name="addr" value={sdm.addr} onChange={changeInput} required />
        </p>
        <p>
          <label>상품 세부 설명</label>
          <input type="text" name="itemDetail" value={sdm.itemDetail} onChange={changeInput} />
        </p>
        <p>
          <label>가격</label>
          <input type="number" name="price" value={sdm.price} onChange={changeInput} />
        </p>
        <p>
          <label>태그</label>
          <select name="tag" value={sdm.tag} onChange={changeInput}>
            <option value="인물 위주">인물 위주</option>
            <option value="배경 위주">배경 위주</option>
            <option value="사랑스러움">사랑스러움</option>
          </select>
        </p>
        <p>
          <label>사진</label>
          <input type="file" onChange={changeImage} accept="image/*" multiple />
        </p>
        <p>
          <button type="submit">저장</button>
          {/* <button type="button" onClick={handleDelete}>삭제</button> */}
        </p>
      </div>
    </form>
  );
};

export default EditSdm;
