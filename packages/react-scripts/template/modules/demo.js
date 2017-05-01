import { createAction, handleActions } from 'redux-actions';

//region Action Constants

const INCREMENT = 'demoapp/demo/INCREMENT';

//endregion


//region Action Creators

export const increment = createAction(INCREMENT);

//endregion


//region Action Handlers

const incrementHandler = (state) => ({
    ...state,
    count: state.count + 1
});

//endregion

// Default State
const defaultState = {
    count: 0
};

// Reducer
export default handleActions({
    [INCREMENT]: incrementHandler,
}, defaultState);
