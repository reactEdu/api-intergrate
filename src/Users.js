import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERRPR = 'ERRPR';

const initialState = {
  loading: false,
  data: null,
  error: null,
}

function reducer(state, action) {
  console.log({...state})
  switch (action.type) {
    case LOADING: // 로딩중 켜고 나머지는 상태 그대로
      return {
        ...state, // data: null, error: null,
        loading: true,
      }
    case SUCCESS: // 로딩중 끄고, 결과 데이터를 data에 할당.
      return { 
        ...state, // error: null,
        loading: false,
        data: action.data,
      };
    case ERRPR: // 로딩중 끄고, error객체 할당
      return {
        ...state, // data: null,
        loading: false,
        error: action.error,
      };
    default:
      // return state; 보통 state를 반환하게 하는데, 액션 타입 맞는게 없다는 것이니 Error를 반환하는 것이 로직상 맞다.
      throw new Error(`Unhandled Action Type: ${action.type}`);
  }
}

const Users = () => {
  // 사용할 reducer와 초기상태를 대입해서 관리한다.
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchUsers = async () => {
    dispatch({type: LOADING});
    try {
      const url = 'https://jsonplaceholder.typicode.com/users';
      const response = await axios.get(url);
      dispatch({type: SUCCESS, data: response.data}); 
    } catch (e) {
      console.dir(e.toJSON());
      dispatch({type: ERRPR, error: e})
    }
  };

  useEffect(() => {
    // 초기 API 요청
    fetchUsers();
  }, []);

  const {loading, data: users, error} = state;
  // 로딩중일 때
  if(loading) return <div>로딩중</div>
  // 에러났을 때
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
  // 데이터가 없을때
  if(!users) return null;
  // 성공했을 때
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