'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = bindRoutineCreators;

var _routineStages = require('./routineStages');

var _routineStages2 = _interopRequireDefault(_routineStages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bindRoutineCreator(routineCreator, dispatch) {
  return _routineStages2.default.reduce(function (result, stage) {
    var key = stage.toLowerCase();

    return (0, _assign2.default)(result, (0, _defineProperty3.default)({}, key, function (payload) {
      return dispatch(routineCreator[key](payload));
    }));
  }, function (payload) {
    return routineCreator(payload, dispatch);
  });
}

function bindRoutineCreators(routineCreators, dispatch) {
  if (typeof routineCreators === 'function') {
    return bindRoutineCreator(routineCreators, dispatch);
  }

  if ((typeof routineCreators === 'undefined' ? 'undefined' : (0, _typeof3.default)(routineCreators)) !== 'object' || routineCreators === null) {
    throw new Error('bindRoutineCreators expected an object or a function, instead received ' + (bindRoutineCreators === null ? 'null' : typeof bindRoutineCreators === 'undefined' ? 'undefined' : (0, _typeof3.default)(bindRoutineCreators)) + '. Did you write "import routineCreators from" instead of "import * as routineCreators from"?');
  }

  var keys = (0, _keys2.default)(routineCreators);
  var boundRoutineCreators = {};
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    var routineCreator = routineCreators[key];
    if (typeof routineCreator === 'function') {
      boundRoutineCreators[key] = bindRoutineCreators(routineCreator, dispatch);
    }
  }
  return boundRoutineCreators;
}