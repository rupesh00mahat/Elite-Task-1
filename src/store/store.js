import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { taskFormReducer } from "../reducer/taskFormReducer";



export const newStore = createStore(taskFormReducer, applyMiddleware(thunk));

