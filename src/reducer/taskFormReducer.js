import {changeStepper} from "../actions/change-stepper";
import { dataSubmitSuccess } from "../actions/data-submit-success";
import {dataSubmitFailure} from "../actions/data-submit-failure";
import {ACTIONTYPE} from '../utils/actiontype';

const INITIAL_VALUES = { stepperValue: 1, response: '' };

export const taskFormReducer = (state = INITIAL_VALUES, action) => {
    if (action.type == ACTIONTYPE.CHANGE_STEPPER) {
       return changeStepper(state, action.payload);
    }
    if (action.type == ACTIONTYPE.SUBMIT_DATA_ONE_SUCCESS) {
        return dataSubmitSuccess(state, action.payload);
    }
    else if (action.type == ACTIONTYPE.SUBMIT_DATA_ONE_FAILURE) {
        return dataSubmitFailure(state, action.payload);
    }
    return state;
}