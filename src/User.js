import React, {useEffect} from 'react';
import { useUsersState, useUsersDispatch, getUser } from './usersContext';

const User = ({ id }) => {
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

  const { loading, data: user, error } = state.user;

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