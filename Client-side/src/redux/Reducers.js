const { combineReducers } = require("redux");

const appReducer = combineReducers({
    // add all the reducer from project  

})

const rootReducer = (state, action) => {
    return appReducer(state, action)

}
export default rootReducer