import { ActionReducer, Action } from '@ngrx/store';
import ActionTypes from '../actions/actionTypes';
import { DateRangeTypes } from '../../demo/date-range/date-range.util';
import * as moment from 'moment';

let initialState = {
  rangeType: DateRangeTypes.THIRTY_DAYS,
  // non deterministic moment() function is only being called to create an initial state
  // to keep moment out of the reducer, this could be moved to an INITIALIZE action
  start: moment().subtract(30, 'days').valueOf(),
  end: moment().valueOf()
};

export function DateRangeReducer(state: any = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.DATE_RANGE:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
