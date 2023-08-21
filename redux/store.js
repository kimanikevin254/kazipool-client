import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/user/authSlice'
import jobReducer from "./slice/job/jobSlice";
import { apiSlice } from "./slice/apiSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        job: jobReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})