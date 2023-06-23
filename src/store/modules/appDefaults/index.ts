import { Category } from "@/types/category";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from 'next-redux-wrapper';
import { AppState, AppThunk } from '../../index';

const initialState: {
    datatest: String
    categories: Category[]
    isLoading: boolean
} = {
    categories: [],
    datatest: '',
    isLoading: false,
}

export const appDefaultSlice = createSlice({
    name: 'appDefaults',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
            state.isLoading= false;
        },
        setTest: (state, action) => {
          state.datatest = action.payload;
          state.isLoading= false;
      },
        setLoading: (state) => {
            state.isLoading = true;
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {  // IMPORTANT - for server side hydration
          if (!action.payload.appDefaults.categories) {  // IMPORTANT - for not overriding data on client side
            return state;
          }

          if (!action.payload.appDefaults.isLoading) {  // IMPORTANT - for not overriding data on client side
            return state;
          }

          if (!action.payload.appDefaults.datatest) {  // IMPORTANT - for not overriding data on client side
            return state;
          }
    
          state.categories = action.payload.appDefaults.categories;
          state.isLoading = action.payload.appDefaults.isLoading;
          state.datatest = action.payload.appDefaults.datatest;
        }
      }
});

export const {setCategories, setLoading, setTest} = appDefaultSlice.actions;

export const selectAppDefaults = (state: AppState) => state.appDefaults;

export default appDefaultSlice.reducer;
