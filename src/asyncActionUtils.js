export default function createAsyncDispatcher(type, promiseFn) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  // 나머지 파라미터를 rest 배열로 받는 함수 생성 actionHandler(fn, 1,2,3); -> rest = [1,2,3]
  async function actionHandler(dispatch, ...rest) {
    dispatch({ type });
    try {
      const data = await promiseFn(...rest);
      dispatch({ type: SUCCESS, data });
    } catch (e) {
      dispatch({ type: ERROR, e });
    }
  }

  return actionHandler;
}

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null,
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

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

export function createAsyncHandler(type, key) { // 액션타입, state내부의 키
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState,
        }
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        }
      case ERROR:
        return {
          ...state,
          [key]: error(action.error),
        }
      default:
        return state;
    }
  }

  return handler;
}