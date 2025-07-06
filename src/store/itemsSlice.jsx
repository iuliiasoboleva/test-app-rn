import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],           // список элементов (например, репозиториев)
  currentItem: null,   // выбранный элемент
  loading: false,      // индикатор загрузки
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
      state.loading = false;
    },
    setCurrentItem(state, action) {
      state.currentItem = action.payload;
    },
    clearCurrentItem(state) {
      state.currentItem = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setItems,
  setCurrentItem,
  clearCurrentItem,
  setLoading,
} = itemsSlice.actions;

export default itemsSlice.reducer;
