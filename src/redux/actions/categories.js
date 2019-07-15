import Category from '../../utils/category';

export const FETCH_CATEGORY_ERROR = 'category/FETCH_CATEGORY_ERROR';
export const FETCH_SUCCESS = 'category/FETCH_SUCCESS';
export const FETCH_CATEGORY = 'category/FETCH_CATEGORY';
export const SAVING_CATEGORY = 'category/SAVING_CATEGORY';

function fetchCategoryError(error) {
  return {
    type: FETCH_CATEGORY_ERROR,
    error
  };
}

const fetchCategorySuccess = categories => {
  return {
    ...categories,
    type: FETCH_SUCCESS
  };
};

export function getCategoryData() {
  return function (dispatch) {
    dispatch({ type: FETCH_CATEGORY });
    return getCategories()
      .then(
        response => dispatch(fetchCategorySuccess(
          new Category(response)
            .average()
        )),
        err => dispatch(fetchCategoryError(err))
      );
  };
}

export function saveCategoryData(category) {
  return function (dispatch) {
    dispatch({ type: SAVING_CATEGORY });
    const request = saveCategory(category);
    return request.then(
      response => dispatch(fetchCategorySuccess(
        new Category(response)
          .average()
      )),
      err => dispatch(fetchCategoryError(err))
    );
  };
}
