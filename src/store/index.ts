import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';
import { appDefaultSlice } from "./modules/appDefaults";
import  productsSlice  from "./modules/products";

const makeStore = () => configureStore({
    reducer: {
      appDefaults: appDefaultSlice?.reducer,
      product: productsSlice
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, 
unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);