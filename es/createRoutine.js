import _Promise from 'babel-runtime/core-js/promise';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import stages from './routineStages';
import { PROMISE_ACTION } from './constants';

var identity = function identity(i) {
  return i;
};

export default function createRoutine() {
  var routineName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var payloadCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var reduxFormFallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (typeof routineName !== 'string') {
    throw new Error('Invalid routine name, it should be a string');
  }

  var routineParams = stages.reduce(function (result, stage) {
    var _Object$assign2;

    var stageActionType = routineName + '_' + stage;
    var stageActionCreator = function stageActionCreator(payload) {
      return {
        type: stageActionType,
        payload: payloadCreator(payload)
      };
    };
    stageActionCreator.ACTION_TYPE = stageActionType;

    return _Object$assign(result, (_Object$assign2 = {}, _Object$assign2[stage] = stageActionType, _Object$assign2[stage.toLowerCase()] = stageActionCreator, _Object$assign2));
  }, {});

  var routine = function routine(data, dispatch) {
    return new _Promise(function (resolve, reject) {
      return dispatch({
        type: PROMISE_ACTION,
        payload: {
          data: data,
          params: routineParams,
          defer: { resolve: resolve, reject: reject },
          reduxFormFallback: reduxFormFallback
        }
      });
    });
  };

  return _Object$assign(routine, routineParams);
}