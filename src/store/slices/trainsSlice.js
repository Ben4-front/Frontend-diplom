import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTrains = createAsyncThunk(
  'trains/fetchTrains',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().trains;
      const params = new URLSearchParams();

      if (filters.from_city_id) params.append('from_city_id', filters.from_city_id);
      if (filters.to_city_id) params.append('to_city_id', filters.to_city_id);
      if (filters.date_start) params.append('date_start', filters.date_start);
      if (filters.date_end) params.append('date_end', filters.date_end);

      if (filters.have_first_class) params.append('have_first_class', true);
      if (filters.have_second_class) params.append('have_second_class', true);
      if (filters.have_third_class) params.append('have_third_class', true);
      if (filters.have_fourth_class) params.append('have_fourth_class', true);
      if (filters.have_wifi) params.append('have_wifi', true);
      if (filters.have_express) params.append('is_express', true);
      
      params.append('price_from', filters.price_from);
      params.append('price_to', filters.price_to);
      params.append('sort', filters.sort);
      params.append('limit', filters.limit);
      params.append('offset', filters.offset);

      const response = await axios.get('https://students.netoservices.ru/fe-diplom/routes', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const trainsSlice = createSlice({
  name: 'trains',
  initialState: {
    items: [],
    totalCount: 0,
    loading: false,
    error: null,
    selectedTrain: null,
    filters: {
      from_city_id: '',
      to_city_id: '',
      date_start: '',
      date_end: '',
      have_first_class: false,
      have_second_class: false,
      have_third_class: false,
      have_fourth_class: false,
      have_wifi: false,
      have_express: false,
      price_from: 0,
      price_to: 10000,
      sort: 'date', 
      limit: 5,     
      offset: 0,
    }
  },
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSelectedTrain: (state, action) => {
      state.selectedTrain = action.payload; 
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrains.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.totalCount = action.payload.total_count || 0;
      })
      .addCase(fetchTrains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilter, setSelectedTrain } = trainsSlice.actions; 
export default trainsSlice.reducer;