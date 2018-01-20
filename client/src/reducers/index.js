import { combineReducers } from 'redux';
import { reducerAPOD } from './reducer-apod';

const rootReducer = combineReducers({
  APODData: reducerAPOD
});

export default rootReducer;
