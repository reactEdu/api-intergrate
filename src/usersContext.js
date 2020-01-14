import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const initialState = {
  users: {
    loading: false,
    data: null,
    error: null,
  },
  user: {
    loading: false,
    data: null,
    error: null,
  }
}

// 두번씩 사용되는 상태들이므로 변수로 뺌
const loadingState = {
  loading: true,
  data: null,
  error: null,
}

const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (e) => ({
  loading: false,
  data: null,
  error: e,
});

const GET_USERS = 'GET_USERS';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_ERROR = 'GET_USERS_ERROR';
const GET_USER = 'GET_USER';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_ERROR = 'GET_USER_ERROR';

function usersReducer(state, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: loadingState,
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: success(action.data),
      }
    case GET_USERS_ERROR:
      return {
        ...state,
        users: error(action.error),
      }
    case GET_USER:
      return {
        ...state,
        user: loadingState,
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: success(action.data),
      }
    case GET_USER_ERROR:
      return {
        ...state,
        user: error(action.error),
      }

    default:
      throw new Error(`Unhandled Action Type: ${action.type}`);
  }
}

// 상태나 디스패치를 골라 쓰기 위해 state용 context와 dispatch용 context를 분리
const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

// Provider
export function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

export function useUsersState() {
  const state = useContext(UserStateContext);
  if(!state) {
    throw new Error('Cannot find UsersProvider');
  }
  return state;
}

export function useUsersDispatch() {
  const dispatch = useContext(UserDispatchContext)
  if(!dispatch) {
    throw new Error('Cannot find UsersDispatch');
  }
  return dispatch;
}

export async function getUsers(dispatch){
  dispatch({type: GET_USERS}); // API 요청 시작을 알림
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/`);
    dispatch({type: GET_USERS_SUCCESS, data: response.data}); // 성공
  } catch (e) {
    dispatch({type: GET_USERS_ERROR, error: e}); // 에러
  }
}

export async function getUser(dispatch, id){
  dispatch({type: GET_USER});
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({type: GET_USER_SUCCESS, data: response.data});
  } catch (e) {
    dispatch({type: GET_USER_ERROR, error: e});
  }
}