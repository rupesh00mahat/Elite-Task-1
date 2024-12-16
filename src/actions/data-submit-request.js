import { ACTIONTYPE } from "../utils/actiontype";
import {submitData} from "../api/submitdata";

export const updateClientId = (data) => {
    return async (dispatch) => {
        try {
            const response = await submitData('key', { data });
            dispatch({ type: ACTIONTYPE.SUBMIT_DATA_ONE_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: ACTIONTYPE.SUBMIT_DATA_ONE_FAILURE, payload: error })
        }
    }
}