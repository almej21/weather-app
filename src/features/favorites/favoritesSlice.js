import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cities: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      state.cities = [...state.cities, action.payload];
    },
    removeFromFavorites: (state, action) => {
      state.cities = state.cities.filter(
        (item) => item.locationKey !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
