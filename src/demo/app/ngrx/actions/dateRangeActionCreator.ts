import ActionTypes from './actionTypes';
import { DateRangeTypes } from '../../demo/date-range/date-range.util';
import * as moment from 'moment';

let DAY_MILLISECONDS = 24 * 60 * 60 * 1000;

export function dateRange(rangeType, custom = {}) {
  let start, end;
  switch (rangeType) {
    case DateRangeTypes.SEVEN_DAYS:
      end = moment().valueOf();
      start = moment().subtract(7, 'days').valueOf();
      end = end + (DAY_MILLISECONDS - end % DAY_MILLISECONDS - 1);
      start = start - (start % DAY_MILLISECONDS);
      break;
    case DateRangeTypes.FOURTEEN_DAYS:
      end = moment().valueOf();
      start = moment().subtract(14, 'days').valueOf();
      end = end + (DAY_MILLISECONDS - end % DAY_MILLISECONDS - 1);
      start = start - (start % DAY_MILLISECONDS);
      break;
    case DateRangeTypes.THIRTY_DAYS:
      end = moment().valueOf();
      start = moment().subtract(30, 'days').valueOf();
      end = end + (DAY_MILLISECONDS - end % DAY_MILLISECONDS - 1);
      start = start - (start % DAY_MILLISECONDS);
      break;
    case DateRangeTypes.NINETY_DAYS:
      end = moment().valueOf();
      start = moment().subtract(90, 'days').valueOf();
      end = end + (DAY_MILLISECONDS - end % DAY_MILLISECONDS - 1);
      start = start - (start % DAY_MILLISECONDS);
      break;
    case DateRangeTypes.ONE_YEAR:
      end = moment().valueOf();
      start = moment().subtract(1, 'years').valueOf();
      end = end + (DAY_MILLISECONDS - end % DAY_MILLISECONDS - 1);
      start = start - (start % DAY_MILLISECONDS);
      break;
    case DateRangeTypes.ALL_TIME:
      end = moment().valueOf();
      end = end + (DAY_MILLISECONDS - end % DAY_MILLISECONDS - 1);
      start = 0;
      break;
    case DateRangeTypes.CUSTOM:
      end = custom['end'];
      start = custom['start'];
      break;
    default:
      console.error('Invalid date range type:', rangeType);
      break;
  }
  return {
    type: ActionTypes.DATE_RANGE,
    payload: {
      rangeType,
      start,
      end
    }
  };
};
