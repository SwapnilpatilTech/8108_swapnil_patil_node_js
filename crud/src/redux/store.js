import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../store/employeeslice';

export const store = configureStore({
    reducer: {
        employee: employeeReducer,
    },
});