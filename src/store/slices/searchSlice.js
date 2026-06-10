import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const fetchCities = createAsyncThunk(
  'search/fetchCities',
  async (name, { rejectWithValue }) => {
    try {
      const response = await api.get(`routes/cities?name=${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  form: {
    fromCity: { id: '', name: '' },
    toCity: { id: '', name: '' },
    dateStart: '',
    dateEnd: '',
  },
  cityOptions: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFormValue(state, action) {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    swapCities(state) {
      const temp = state.form.fromCity;
      state.form.fromCity = state.form.toCity;
      state.form.toCity = temp;
    },
    clearCityOptions(state) {
      state.cityOptions = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cityOptions = action.payload;
    });
  },
});

export const { setFormValue, swapCities, clearCityOptions } = searchSlice.actions;
export default searchSlice.reducer;