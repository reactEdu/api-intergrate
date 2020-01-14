import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const response = await axios.get(url);
  return response.data;
}

const User = ({ id }) => {
  // useAsync의 첫번째 콜백함수 부분에 익명함수를 바로 대입
  const [state] = useAsync(() => getUser(id), [id]);
  const {loading, data: user, error } = state;

  // 로딩중일 때
  if(loading) return <div>로딩중</div>
  // 에러났을 때
  if(error) return <div>에러 발생</div>
  // 데이터가 없을때
  if(!user) return null;
  // 성공했을 때
  return (
    <div>
      <h2>{user.username}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default User;