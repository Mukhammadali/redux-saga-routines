'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = createRoutine;

var _routineStages = require('./routineStages');

var _routineStages2 = _interopRequireDefault(_routineStages);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var identity = function identity(i) {
  return i;
};

function createRoutine() {
  var routineName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var payloadCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var reduxFormFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (typeof routineName !== 'string') {
    throw new Error('Invalid routine name, it should be a string');
  }

  var routineParams = _routineStages2.default.reduce(function (result, stage) {
    var _Object$assign2;

    var stageActionType = routineName + '_' + stage;
    var stageActionCreator = function stageActionCreator(payload) {
      return {
        type: stageActionType,
        payload: payloadCreator(payload)
      };
    };
    stageActionCreator.ACTION_TYPE = stageActionType;

    return (0, _assign2.default)(result, (_Object$assign2 = {}, (0, _defineProperty3.default)(_Object$assign2, stage, stageActionType), (0, _defineProperty3.default)(_Object$assign2, stage.toLowerCase(), stageActionCreator), _Object$assign2));
  }, {});

  var routine = function routine(data, dispatch) {
    return new _promise2.default(function (resolve, reject) {
      return dispatch({
        type: _constants.PROMISE_ACTION,
        payload: {
          data: data,
          params: routineParams,
          defer: { resolve: resolve, reject: reject },
          reduxFormFallback: reduxFormFallback
        }
      });
    });
  };

  return (0, _assign2.default)(routine, routineParams);
}