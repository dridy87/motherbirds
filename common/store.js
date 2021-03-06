import { createStore } from "redux";
import createReducer from "./createReducer";

//timeLine

const ADD = 'timeLine/ADD'

export const addTimeline = timeLine => ({type : ADD, timeLine});


const reducer = createReducer(
    { timeLine: []},
    {
        [ADD] : (state, action) => state.timeLine.push(action.timeLine)
    }
)

const store = createStore(reducer);

store.subscribe(() => {
    const state = store.getState();

    console.log(state);
});

export default store;