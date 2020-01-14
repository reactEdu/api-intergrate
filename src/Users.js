import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState(null);      // 요청의 결과
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null);      // 에러 핸들링

  const fetchUsers = async () => {
    try {
      // 초기화
      setUsers(null);
      setError(null);
      setLoading(true);

      const url = 'https://jsonplaceholder.typicode.com/users';
      const response = await axios.get(url);
      setUsers(response.data);
    } catch (e) {
      console.dir(e.toJSON());
      setError(e);
    }
    setLoading(false); // 로딩이 끝난 것을 알림
  };

  useEffect(() => {
    // 초기 API 요청
    fetchUsers();
  }, []);

  if(loading) return <div>로딩중</div>
  if(error) {
    // 숫자가 아닌 문자열은 없애버리면 에러코드만 남음
    // const errCode = error.message.replace(/[^\d]/g, "");
    const errCode = error.response.status
    return (
      <>
      <h1>{errCode} {error.name}</h1>
      <p>{error.message}</p>
      <p>{error.config.method}: {error.config.url}</p>
      </>
    )
  }
  if(!users) return null;

  return (
    <>
    <ul>
      {users.map(user => <li key={user.id}>{user.username} {user.name}</li>)}
    </ul>
    <button onClick={fetchUsers}>API 재요청</button>
    </>
  );
};

export default Users;