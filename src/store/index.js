import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import trainsReducer from './slices/trainsSlice';
import seatsReducer from './slices/seatsSlice';
import passengersReducer from './slices/passengersSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    trains: trainsReducer,
    seats: seatsReducer,
    passengers: passengersReducer,
    order: orderReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});