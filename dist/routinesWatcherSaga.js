'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.handlePromiseAction = handlePromiseAction;
exports.default = routinesWatcherSaga;

var _effects = require('redux-saga/effects');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [handlePromiseAction, routinesWatcherSaga].map(_regenerator2.default.mark);

var getPayload = function getPayload(data) {
  return data && data.payload || data;
};

function handlePromiseAction(action) {
  var _action$payload, data, params, _action$payload$defer, resolve, reject, reduxFormFallback, _ref, _ref2, _ref2$, success, failure;

  return _regenerator2.default.wrap(function handlePromiseAction$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _action$payload = action.payload, data = _action$payload.data, params = _action$payload.params, _action$payload$defer = _action$payload.defer, resolve = _action$payload$defer.resolve, reject = _action$payload$defer.reject, reduxFormFallback = _action$payload.reduxFormFallback;
          _context.next = 3;
          return (0, _effects.all)([(0, _effects.race)({
            success: (0, _effects.take)(params.SUCCESS),
            failure: (0, _effects.take)(params.FAILURE)
          }), (0, _effects.put)(params.trigger(data))]);

        case 3:
          _ref = _context.sent;
          _ref2 = (0, _slicedToArray3.default)(_ref, 1);
          _ref2$ = _ref2[0];
          success = _ref2$.success;
          failure = _ref2$.failure;

          if (!success) {
            _context.next = 13;
            break;
          }

          _context.next = 11;
          return reduxFormFallback ? (0, _effects.call)(resolve) : (0, _effects.call)(resolve, getPayload(success));

        case 11:
          _context.next = 15;
          break;

        case 13:
          _context.next = 15;
          return (0, _effects.call)(reject, getPayload(failure));

        case 15:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}

function routinesWatcherSaga() {
  return _regenerator2.default.wrap(function routinesWatcherSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)(_constants.PROMISE_ACTION, handlePromiseAction);

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}