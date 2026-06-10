import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  passengers: [],
};

const passengersSlice = createSlice({
  name: 'passengers',
  initialState,
  reducers: {
    initPassengers(state, action) {
      const seatsCount = action.payload;
      if (state.passengers.length !== seatsCount) {
        state.passengers = Array.from({ length: seatsCount }, (_, index) => ({
          id: index + 1,
          type: 'adult',
          lastName: '',
          firstName: '',
          patronymic: '',
          gender: 'M',
          birthDate: '',
          documentType: 'passport',
          documentNumber: '',
          isValid: false,
        }));
      }
    },
    addPassenger(state) {
      const maxId = state.passengers.length > 0 
        ? Math.max(...state.passengers.map(p => p.id)) 
        : 0;

      state.passengers.push({
        id: maxId + 1,
        type: 'adult', 
        lastName: '',
        firstName: '',
        patronymic: '',
        gender: 'M',
        birthDate: '',
        documentType: 'passport',
        documentNumber: '',
        isValid: false,
      });
    },
    updatePassenger(state, action) {
      const { id, field, value, isValid } = action.payload;
      const passenger = state.passengers.find((p) => p.id === id);
      if (passenger) {
        if (field) {
          passenger[field] = value;
        }
        if (isValid !== undefined) {
          passenger.isValid = isValid;
        }
      }
    },
    removePassenger(state, action) {
      state.passengers = state.passengers.filter((p) => p.id !== action.payload);
    },
  },
});

export const { 
  initPassengers, 
  addPassenger, 
  updatePassenger, 
  removePassenger 
} = passengersSlice.actions;

export default passengersSlice.reducer;