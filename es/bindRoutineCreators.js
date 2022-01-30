import _Object$keys from 'babel-runtime/core-js/object/keys';
import _typeof from 'babel-runtime/helpers/typeof';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import stages from './routineStages';

function bindRoutineCreator(routineCreator, dispatch) {
  return stages.reduce(function (result, stage) {
    var _Object$assign2;

    var key = stage.toLowerCase();

    return _Object$assign(result, (_Object$assign2 = {}, _Object$assign2[key] = function (payload) {
      return dispatch(routineCreator[key](payload));
    }, _Object$assign2));
  }, function (payload) {
    return routineCreator(payload, dispatch);
  });
}

export default function bindRoutineCreators(routineCreators, dispatch) {
  if (typeof routineCreators === 'function') {
    return bindRoutineCreator(routineCreators, dispatch);
  }

  if ((typeof routineCreators === 'undefined' ? 'undefined' : _typeof(routineCreators)) !== 'object' || routineCreators === null) {
    throw new Error('bindRoutineCreators expected an object or a function, instead received ' + (bindRoutineCreators === null ? 'null' : typeof bindRoutineCreators === 'undefined' ? 'undefined' : _typeof(bindRoutineCreators)) + '. Did you write "import routineCreators from" instead of "import * as routineCreators from"?');
  }

  var keys = _Object$keys(routineCreators);
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