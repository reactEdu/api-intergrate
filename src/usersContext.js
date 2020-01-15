import React, { createContext, useReducer, useContext } from 'react';
import * as api from './api'; // api.js의 함수들 모두 객체로 가져옴
import createAsyncDispatcher, { initialAsyncState, createAsyncHandler } from './asyncActionUtils';

const initialState = {
  users: initialAsyncState,
  user: initialAsyncState
}

const GET_USERS = 'GET_USERS';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_USERS_ERROR = 'GET_USERS_ERROR';
const GET_USER = 'GET_USER';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_ERROR = 'GET_USER_ERROR';

const usersHandler = createAsyncHandler(GET_USERS, 'users');
const userHandler = createAsyncHandler(GET_USER, 'user');

function usersReducer(state, action) {
  switch (action.type) {
    case GET_USERS:
    case GET_USERS_SUCCESS:
    case GET_USERS_ERROR:
      return usersHandler(state, action)

    case GET_USER:
    case GET_USER_SUCCESS:
    case GET_USER_ERROR:
      return userHandler(state, action)

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

export const getUsers = createAsyncDispatcher(GET_USERS, api.getUsers);
export const getUser = createAsyncDispatcher(GET_USER, api.getUser);