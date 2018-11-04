import _ from 'lodash';
import { FETCH_POSTS } from '../actions'; 

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_POSTS:
    // (_.mapKeys()) - method used to transform an array of objects into object of objects
    return _.mapKeys(action.payload.data, 'id');
  default:
    return state;
  }
}
