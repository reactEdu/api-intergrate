import React, {useState} from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

async function getUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await axios.get(url);
  return response.data;
}

const Users = () => {
  const [state, refetch] = useAsync(getUsers, [], true); // true: 처음 렌더링 요청 생략
  const [userId, setUserId] = useState(null);
  const {loading, data: users, error} = state;
  // 로딩중일 때
  if(loading) return <div>로딩중</div>
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
  if(!users) return <button onClick={refetch}>API 요청</button>;
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
    <button onClick={refetch}>API 재요청</button>
    {userId && <User id={userId} />}
    </>
  );
};

export default Users;