import { IMAGE_OF_THE_DAY } from '../actions';

export const reducerAPOD = (state = {}, action) => {
  switch (action.type) {
    case IMAGE_OF_THE_DAY:
      console.log(action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
}