import {GET_VACANCIES, GET_PAGE, API_CALL_FAILURE, API_CALL_SUCCESS} from '../../actionTypes';
const PAGE_SIZE = 25;

export function loadVacancies(q) {
  return {
    type: GET_VACANCIES,
    payload: {q}
  };
}

function loadNext() {
  return {
    type: GET_PAGE
  };
}

function apiFailure(error){
  return {
    type: API_CALL_FAILURE,
    payload:{error}
  };
}

function apiSuccess(count, data){
  return {
    type: API_CALL_SUCCESS,
    payload: {
      count,
      data
    }
  };
}

export function startLoading(q){
  console.log('start load');
  return function(dispatch, getState){
    dispatch( loadVacancies(q) );

    let {page} = getState();
    fetchPage(q, page, dispatch);
  }
}

export function loadPage() {
  return function(dispatch, getState){
    dispatch( loadNext() );

    let {q, page} = getState();
    fetchPage(q, page, dispatch);
  }
}

function fetchPage(q,page,dispatch){
  fetchApi( q, page*PAGE_SIZE )
    .then( result=> result.json())
    .then( result => {
      console.log('result: ', result);
      const {metadata, vacancies} = result;
      dispatch( apiSuccess(metadata.resultset.count, vacancies, page+1) );
    })
    .catch( error => {
      console.log('error:', error);
      dispatch( apiFailure(error) );
    });
}

//получить страницу данных
function fetchApi(q, offset) {
  let params = `offset=${encodeURIComponent(offset)}&limit=${PAGE_SIZE}`+
    `${ q? '&q=' + encodeURIComponent(q) : ''}`;

  return fetch(`https://api.zp.ru/v1/vacancies?${params}`);
}
