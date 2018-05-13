export const GET_VACANCIES = 'search_vacancies/load';
export const GET_PAGE = 'search_vacancies/get_page';
export const API_CALL_SUCCESS = 'search_vacancies/api_success';
export const API_CALL_FAILURE = 'search_vacancies/api_failure';

export default function reducer(state = { vacs: [], loading:false, q:null }, action) {
  switch (action.type) {
    case GET_VACANCIES:
      return { ...state,
        loading: true,
        vacs:[],
        q:action.payload.q,
        error:null };
    case GET_PAGE:
      return { ...state, loading: true };
    case API_CALL_FAILURE:
      return { ...state, loading: false, error:true };
    case API_CALL_SUCCESS:
      return { ...state,
        loading: false,
        vacs:[ ...state.vacs, ...action.payload.page],
        count: action.payload.count };
    default:
      return state;
  }
}

export function loadVacancies(q) {
  return {
    type: GET_VACANCIES,
    payload: {q}
  };
}

export function loadNext() {
  return {
    type: GET_PAGE
  };
}
