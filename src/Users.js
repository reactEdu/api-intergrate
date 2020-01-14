import React, {useState} from 'react';
import User from './User';
import { useUsersState, useUsersDispatch, getUsers } from './usersContext';

const Users = () => {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { loading, data: users, error } = state.users;

  const fetchData = () => {
    getUsers(dispatch);
  }

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
  if(!users) return <button onClick={fetchData}>API 요청</button>;
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
    <button onClick={fetchData}>API 재요청</button>
    {userId && <User id={userId} />}
    </>
  );
};

export default Users;