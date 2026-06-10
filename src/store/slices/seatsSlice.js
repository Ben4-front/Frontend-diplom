import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const fetchCarriages = createAsyncThunk(
  'seats/fetchCarriages',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`routes/${id}/seats`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  carriages: [],
  selectedSeats: [],
  error: null,
};

const seatsSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    toggleSeat(state, action) {
      const { coachId, seatNumber, price, trainType } = action.payload;
      
      const existingSeatIndex = state.selectedSeats.findIndex(
        (seat) => seat.coachId === coachId && seat.seatNumber === seatNumber && seat.trainType === trainType
      );

      if (existingSeatIndex >= 0) {
        state.selectedSeats.splice(existingSeatIndex, 1);
      } else {
        state.selectedSeats.push({ coachId, seatNumber, price, trainType });
      }
    },
    clearSeats(state) {
      state.selectedSeats = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarriages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCarriages.fulfilled, (state, action) => {
        state.status = 'success';
        state.carriages = action.payload;
      })
      .addCase(fetchCarriages.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { toggleSeat, clearSeats } = seatsSlice.actions;
export default seatsSlice.reducer;