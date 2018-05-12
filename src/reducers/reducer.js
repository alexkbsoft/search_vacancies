export const GET_VACANCIES = 'search_vacancies/load';

export default function reducer(state = { vacs: [] }, action) {
  switch (action.type) {
    case GET_VACANCIES:
      return { ...state, loading: true };
    default:
      return state;
  }
}

export function loadVacancies() {
  return {
    type: GET_VACANCIES,
    payload: {
    }
  };
}
