import React, {useState} from 'react';
import axios from 'axios';
// import useAsync from './useAsync';
import { useAsync } from 'react-async'; // 라이브러리 사용
import User from './User';

async function getUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await axios.get(url);
  return response.data;
}

const Users = () => {
  const { data:users, error, isLoading,  run } = useAsync({
    deferFn: getUsers
  });
  
  const [userId, setUserId] = useState(null);
  // 로딩중일 때
  if(isLoading) return <div>로딩중</div>
  // 에러났을 때
  if(error) {
    const errCode = error.response.status
    return (
      <>
      <h1>{errCode} {error.name}</h1>
      <p>{error.message}</p>
      <p>{error.config.method}: {error.config.url}</p>
      </>
    )
  }
  // 데이터가 없을때
  if(!users) return <button onClick={run}>API 요청</button>;
  // 성공했을 때
  return (
    <>
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => setUserId(user.id)}>
          {user.username} {user.name}
        </li>
      ))}
    </ul>
    <button onClick={run}>API 재요청</button>
    {userId && <User id={userId} />}
    </>
  );
};

export default Users;