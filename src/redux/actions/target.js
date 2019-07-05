import { getTarget } from '../../utils/storage';

export const FETCH_TARGET_ERROR = 'target/FETCH_TARGET_ERROR';
export const FETCH_TARGET_SUCCESS = 'target/FETCH_TARGET_SUCCESS';

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
  return function async (dispatch) {
    dispatch({ type: FETCH_TARGET });
    const request = await getTarget();
    return request.then(
      response => dispatch(fetchTargetSuccess(response)),
      err => dispatch(fetchTargetError(err))
    );
  };
}
