import { takeLatest, call, put, fork, take } from "redux-saga/effects";
import axios from "axios";
import {GET_VACANCIES, GET_PAGE, API_CALL_SUCCESS, API_CALL_FAILURE} from './reducers/reducer';

const PAGE_SIZE = 25;

//получить страницу данных
function fetchApi(q, offset) {
  let params = `offset=${offset}&limit=${PAGE_SIZE}${ q? '&q='+q : ''}`;
  console.log('params: ', params);

  return axios({
    method: "get",
    url: `https://api.zp.ru/v1/vacancies?${params}`
  });
}

// при каждом новом поиске предыдущая задача pagerSaga завершается
export function* root_saga() {
  yield takeLatest(GET_VACANCIES, pagerSaga);
}

// получить перую страницу и ожидать запроса на следующую.
export function* pagerSaga(action) {
  let page = 0;
  let q = action && action.payload.q;
  while(true) {
    try {
      const {data:{metadata, vacancies}} = yield call(fetchApi, q, page*PAGE_SIZE);
      yield put({ type: API_CALL_SUCCESS, payload:{
        count:metadata.resultset.count,
        page: vacancies
      } });

      yield take(GET_PAGE);
      page += 1;
    } catch (error) {
      yield put({ type: API_CALL_FAILURE, error });
    }
  }
}
