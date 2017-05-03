import ActionTypes from './actionTypes';

export function dateAggregate(aggregateType) {
  return {
    type: ActionTypes.DATE_AGGREGATE,
    payload: {
      aggregateType
    }
  };
};
