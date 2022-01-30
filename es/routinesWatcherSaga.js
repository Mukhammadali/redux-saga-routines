import _regeneratorRuntime from 'babel-runtime/regenerator';

var _marked = [handlePromiseAction, routinesWatcherSaga].map(_regeneratorRuntime.mark);

import { takeEvery, take, race, put, call, all } from 'redux-saga/effects';
import { PROMISE_ACTION } from './constants';

var getPayload = function getPayload(data) {
  return data && data.payload || data;
};

export function handlePromiseAction(action) {
  var _action$payload, data, params, _action$payload$defer, resolve, reject, reduxFormFallback, _ref, _ref$, success, failure;

  return _regeneratorRuntime.wrap(function handlePromiseAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _action$payload = action.payload, data = _action$payload.data, params = _action$payload.params, _action$payload$defer = _action$payload.defer, resolve = _action$payload$defer.resolve, reject = _action$payload$defer.reject, reduxFormFallback = _action$payload.reduxFormFallback;
          _context.next = 3;
          return all([race({
            success: take(params.SUCCESS),
            failure: take(params.FAILURE)
          }), put(params.trigger(data))]);

        case 3:
          _ref = _context.sent;
          _ref$ = _ref[0];
          success = _ref$.success;
          failure = _ref$.failure;

          if (!success) {
            _context.next = 12;
            break;
          }

          _context.next = 10;
          return reduxFormFallback ? call(resolve) : call(resolve, getPayload(success));

        case 10:
          _context.next = 14;
          break;

        case 12:
          _context.next = 14;
          return call(reject, getPayload(failure));

        case 14:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

export default function routinesWatcherSaga() {
  return _regeneratorRuntime.wrap(function routinesWatcherSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return takeEvery(PROMISE_ACTION, handlePromiseAction);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}