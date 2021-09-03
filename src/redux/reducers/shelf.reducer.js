
/**
 * Shelf Reducer
 * TODO: add description of this reducer
 */
const shelfReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_SHELF_LIST' :
      return action.payload;
    default:
      return state;
  }
}

export default shelfReducer;