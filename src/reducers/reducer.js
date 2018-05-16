import {GET_VACANCIES, GET_PAGE, API_CALL_FAILURE, API_CALL_SUCCESS} from '../actionTypes';

export default function reducer(state, action) {
  switch (action.type) {
    case GET_VACANCIES:
      return { ...state,
        loading: true,
        lastPage: false,
        page:0,
        vacs:[],
        q:action.payload.q,
        error:null };
    case GET_PAGE:
      return { ...state, loading: true, page: state.page+1 };
    case API_CALL_FAILURE:
      return { ...state, loading: false, error:true };
    case API_CALL_SUCCESS:

      if(action.payload.data.length === 0) {
        return { ...state,
          loading: false,
          lastPage: true
        };
      }
      return { ...state,
        loading: false,
        vacs: state.vacs.concat(action.payload.data),
        count: action.payload.count };
    default:
      return state;
  }
}
