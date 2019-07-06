import { saveTarget, getTarget } from '../../utils/storage';

export const FETCH_TARGET_ERROR = 'target/FETCH_TARGET_ERROR';
export const FETCH_TARGET_SUCCESS = 'target/FETCH_TARGET_SUCCESS';
export const FETCH_TARGET = 'target/FETCH_TARGET';
export const SAVING_TARGET = 'target/SAVING_TARGET';

function fetchTargetError(error) {
  return {
    type: FETCH_TARGET_ERROR,
    error
  };
}

const fetchTargetSuccess = target => {
  return {
    ...target,
    type: FETCH_TARGET_SUCCESS
  };
};

export function getTargetData() {
  return function (dispatch) {
    dispatch({ type: FETCH_TARGET });
    const request = getTarget();
    return request.then(
      response => dispatch(fetchTargetSuccess(response)),
      err => dispatch(fetchTargetError(err))
    );
  };
}

export function saveTargetData(target) {
  return function (dispatch) {
    dispatch({ type: SAVING_TARGET });
    const request = saveTarget(target);
    return request.then(
      response => dispatch(fetchTargetSuccess(response)),
      err => dispatch(fetchTargetError(err))
    );
  };
}
