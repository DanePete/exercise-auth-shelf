import axios from "axios";

const { takeLatest, put } = require("redux-saga/effects");

/**
 * Fetch Shelf
 * TODO: Description of function
 */
function* fetchShelf() {
  try {
    const res = yield axios.get('/api/shelf');
    yield put({
      type: 'SET_SHELF_LIST',
      payload: res.data
    })
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * Saga Shelf
 * TODO: description of function
 */
function* shelfSaga() {
  yield takeLatest('FETCH_SHELF', fetchShelf);
}

export default shelfSaga;