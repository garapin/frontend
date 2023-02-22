import { createSlice } from "@reduxjs/toolkit";

export const appDefaultSlice = createSlice({
    name: 'appDefaults',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {}

});

export const {} = appDefaultSlice.actions;

export default appDefaultSlice.reducer;
