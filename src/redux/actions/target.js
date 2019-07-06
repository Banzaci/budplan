import { saveTarget, getTarget } from '../../utils/storage';
import { getCurrentDate } from '../../utils/dates';
import Target from '../../utils/target';

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
    const { currentMonth } = getCurrentDate();
    return getTarget(currentMonth)
      .then(
        response => dispatch(fetchTargetSuccess(
          new Target(response)
            .average()
        )),
        err => dispatch(fetchTargetError(err))
      );
  };
}

export function saveTargetData(target) {
  return function (dispatch) {
    dispatch({ type: SAVING_TARGET });
    const { currentMonth } = getCurrentDate();
    const request = saveTarget({ ...target, currentMonth });
    return request.then(
      response => dispatch(fetchTargetSuccess(
        new Target(response)
          .average()
      )),
      err => dispatch(fetchTargetError(err))
    );
  };
}
