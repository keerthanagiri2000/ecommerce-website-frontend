import {configureStore} from "@reduxjs/toolkit";
import product from "./features/product";
import user from './features/user';
import appApi from './services/appApi';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

// reducers

 const reducer = combineReducers ({
    users: user,
    products: product,
    [appApi.reducerPath]: appApi.reducer,
 });

 const  persistConfig = {
    key: 'root',
    storage,
    blackList: [appApi.reducerPath, "products"],
 };

 // persist our store
 const persistedReducer = persistReducer(persistConfig, reducer);

 // create the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware],
});

export default store;
