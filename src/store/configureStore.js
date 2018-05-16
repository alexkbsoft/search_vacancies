import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer';

const INITIAL_STATE = {
  vacs: [],
  loading:false,
  q:null,
  page:0,
  lastPage:false
};

export default function configureStore(initialState=INITIAL_STATE){
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
