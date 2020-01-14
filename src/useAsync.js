import React, { useEffect, useReducer, useCallback } from 'react';

const initialState = {
  loading: false,
  data: null,
  error: null,
}

const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERRPR = 'ERRPR';

function reducer(state, action) {
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

// callback: API호출함수, deps: useEffect 두번째 파라미터로 사용하는 []
function useAsync(callback, deps=[], skip=false) {
  // 사용할 reducer와 초기상태를 대입해서 관리한다.
  const [state, dispatch] = useReducer(reducer, initialState);

  // callback 함수가 바뀔 경우만 새로 생성해서 실행
  const fetchData = useCallback(async () => {
    dispatch({ type: 'LOADING'});
    try {
      const data = await callback();
      dispatch({ type: SUCCESS, data });
    } catch (e) {
      dispatch({ type: ERRPR, error: e });
    }
  }, [callback]);

  useEffect(() => {
    if(skip) return;
    
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData]; // 상태, API요청함수 반환
}

export default useAsync;