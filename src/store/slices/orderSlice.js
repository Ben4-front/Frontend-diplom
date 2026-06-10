import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      
      const orderData = {
        user: {
          first_name: state.order.user.firstName,
          last_name: state.order.user.lastName,
          patronymic: state.order.user.patronymic,
          phone: state.order.user.phone,
          email: state.order.user.email,
          payment_method: state.order.payment.method,
        },
        departure: {
          route_direction_id: state.trains.items[0]?.departure._id,
          seats: state.seats.selectedSeats.map(seat => ({
            coach_id: seat.coachId,
            person_info: {
              is_adult: true,
              first_name: state.passengers.passengers[0]?.firstName || 'Test',
              last_name: state.passengers.passengers[0]?.lastName || 'Test',
              patronymic: state.passengers.passengers[0]?.patronymic || 'Test',
              gender: state.passengers.passengers[0]?.gender === 'M',
              birthday: state.passengers.passengers[0]?.birthDate || '1990-01-01',
              document_type: 'паспорт',
              document_data: state.passengers.passengers[0]?.documentNumber || '1234567890'
            },
            seat_number: seat.seatNumber,
            is_child: false,
            include_children_seat: false
          }))
        }
      };

      const response = await api.post('order', orderData);
      return response.data;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    patronymic: '',
    phone: '',
    email: '',
  },
  payment: {
    method: 'online', 
  },
  isValid: false,
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateUserField(state, action) {
      const { field, value } = action.payload;
      state.user[field] = value;
    },
    setPaymentMethod(state, action) {
      state.payment.method = action.payload;
    },
    validateOrderForm(state) {
      const u = state.user;
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.email);
      state.isValid = !!(u.firstName && u.lastName && u.phone && isEmailValid);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export const { updateUserField, setPaymentMethod, validateOrderForm } = orderSlice.actions;
export default orderSlice.reducer;