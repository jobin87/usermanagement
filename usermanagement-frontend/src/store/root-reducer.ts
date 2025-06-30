import { combineReducers } from '@reduxjs/toolkit';
import  flightReducer  from './flight/flightReducer';

export const rootReducer = combineReducers({
flight: flightReducer
});
