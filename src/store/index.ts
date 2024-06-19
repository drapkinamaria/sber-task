import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from 'redux-saga';
import { rootWatcher } from "../sagas/index";
import {planetsReducer} from "./planetsReducer";
import {charactersReducer} from "./charactersReducer";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    planets: planetsReducer,
    characters: charactersReducer
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof rootReducer>;
