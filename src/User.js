import React from 'react';
import axios from 'axios';
// import useAsync from './useAsync';
import { useAsync } from 'react-async'; // 라이브러리 사용

async function getUser({id}) {
  const url = `https://jsonplaceholder.typicode.com/users/${id}`;
  const response = await axios.get(url);
  return response.data;
}

const User = ({ id }) => {
  const { 
    data: user, error, isLoading 
  } = useAsync({
    promiseFn: getUser,
    id,
    watch: id,
  });

  // 로딩중일 때
  if(isLoading) return <div>로딩중</div>
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