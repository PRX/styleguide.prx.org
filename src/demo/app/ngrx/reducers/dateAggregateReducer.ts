import { ActionReducer, Action } from '@ngrx/store';
import ActionTypes from '../actions/actionTypes';
import DateAggregateTypes from '../actions/dateAggregateTypes';

let initialState = {
  aggregateType: DateAggregateTypes.DAY
};

export function DateAggregateReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.DATE_AGGREGATE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
