import CellsReducer from './cellsReducer';
import bundlesReducer from './bundleReducer';
import {combineReducers} from 'redux'

const reducers = combineReducers({
    cells:CellsReducer,
    bundles:bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;