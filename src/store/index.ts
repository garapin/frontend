import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appDefaultSlice } from "./modules/appDefaults";
import  productsSlice  from "./modules/products";

export const store = configureStore({
    reducer: {
        appDefaults: appDefaultSlice.reducer,
        products: productsSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>