import { Category } from "@/types/category";
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    categories: Category[]
    isLoading: boolean
} = {
    categories: [],
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
        setLoading: (state) => {
            state.isLoading = true;
        }
    },
    extraReducers: (builder) => {}

});

export const {setCategories, setLoading} = appDefaultSlice.actions;

export default appDefaultSlice.reducer;
