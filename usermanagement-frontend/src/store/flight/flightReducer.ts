import { createSlice } from '@reduxjs/toolkit';
import { basicInitialArrayState } from '../types';
import {  getSearchFlights, requestAddFlights } from './flightThunk';

const initialState = {
  flightlist:basicInitialArrayState,
  flightSearchPage: basicInitialArrayState,
   departureCity: null,
  arrivalCity: null,
   flightSearched: false,
   loading: false,
};

export const flightReducer = createSlice({
  name: 'flight',
  initialState,
  
  reducers: {
    setFlightList: (state, action) => {
      state.flightlist = action.payload;
    },
     setFlightSearchList: (state, action) => {
      state.flightSearchPage = action.payload;
    },
    setSearchParams: (state, action) => {
      state.departureCity = action.payload.from;
      state.arrivalCity = action.payload.to;
    },
    setFlightSearched: (state, action) => {
    state.flightSearched = action.payload;
  },
  },
  extraReducers(builder) {
    builder

      .addCase(requestAddFlights.fulfilled, (state, action) => {
        state.flightlist.loading = false;
        state.flightlist.data = action.payload;
      })
      .addCase(requestAddFlights.pending, (state) => {
        state.flightlist.loading = true;
      })
      .addCase(requestAddFlights.rejected, (state, action) => {
        state.flightlist.loading = false;
        state.flightlist.error = action.error;
      })

       .addCase(getSearchFlights.fulfilled, (state, action) => {
        state.flightSearchPage.loading = false;
        state.flightSearchPage.data = action.payload;
      })
      .addCase(getSearchFlights.pending, (state) => {
        state.flightSearchPage.loading = true;
      })
      .addCase(getSearchFlights.rejected, (state, action) => {
        state.flightSearchPage.loading = false;
        state.flightSearchPage.error = action.error;
      })


     

     
  },
});

export const { setSearchParams,setFlightList,setFlightSearched } =
  flightReducer.actions;

export default flightReducer.reducer;
