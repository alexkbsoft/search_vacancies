import {GET_VACANCIES, GET_PAGE, API_CALL_FAILURE, API_CALL_SUCCESS} from '../../actionTypes';
import Pager from "../utils/pager";
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
  Pager.makeNew();
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
  Pager.instance().getNext(q, PAGE_SIZE, page*PAGE_SIZE)
    .then( result=> result.json())
    .then( result => {
      const {metadata, vacancies} = result;
      dispatch( apiSuccess(metadata.resultset.count, vacancies, page+1) );
    })
    .catch( error => {
      dispatch( apiFailure(error) );
    });
}

