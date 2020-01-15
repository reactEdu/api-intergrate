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
