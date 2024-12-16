import { applyMiddleware, createStore } from "redux"
import { submitData } from "../utils/submitdata"
import thunk from "redux-thunk"

export const ACTIONTYPE = { 
    CHANGE_STEPPER: 'CHANGE_STEPPER', 
    SUBMIT_DATA_ONE_REQUEST: 'SUBMIT_FORM_ONE_REQUEST',
    SUBMIT_DATA_ONE_SUCCESS: 'SUBMIT_FORM_ONE_SUCCESS',
    SUBMIT_DATA_ONE_FAILURE: 'SUBMIT_FORM_ONE_FAILURE',
    SUBMIT_DATA_TWO: 'SUBMIT_FORM_TWO'
}



const taskFormReducer = (state = { stepperValue: 1, response: '' }, action) => {
    if (action.type == ACTIONTYPE.CHANGE_STEPPER) {
            return {...state, stepperValue: action.payload}
    }
    if (action.type == ACTIONTYPE.SUBMIT_DATA_ONE_SUCCESS){
        console.log(action.payload);
        return {...state, response: action.payload}

    }
    else if (action.type == ACTIONTYPE.SUBMIT_DATA_ONE_FAILURE) {
        return { ...state, response: action.payload } 
      }
    else if (action.type == ACTIONTYPE.SUBMIT_DATA_TWO){
        return {...state,  }
    }
    return state;
}


export const submitDataOne = (data) => {
    return async (dispatch) => {
        dispatch({type: ACTIONTYPE.SUBMIT_DATA_ONE_REQUEST});
        try{
            const response = await submitData('key', {data});
            console.log('Hello');
            dispatch({type: ACTIONTYPE.SUBMIT_DATA_ONE_SUCCESS, payload: response});
        }catch(error){
            dispatch({type: ACTIONTYPE.SUBMIT_DATA_ONE_FAILURE, payload: error.message})
        }
    }
}

export const newStore = createStore(taskFormReducer, applyMiddleware(thunk));

