import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const deleteEmployee = createAsyncThunk(
    'employee/deleteEmployee',
    async(id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async(employee, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, product);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateEmployee = createAsyncThunk(
    'employee/updateEmployee',
    async(employee, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${product.id}`, product);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const API_URL = 'http://localhost:3000/employee';


export const fetchEmployee = createAsyncThunk(
    'products/fetchAll',
    async(_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Axios Error:', error.message);
            }
            return rejectWithValue(error.message);
        }
    }
);

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employee: [],
        loading: false,
        error: null,
        searchTerm: '',
        selectedCategory: '',
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch products';
            })

        .addCase(addEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add employee';
            })

        .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                const idx = state.items.findIndex(p => p.id === action.payload.id);
                if (idx !== -1) {
                    state.items[idx] = action.payload;
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update employee';
            })

        .addCase(deletEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(p => p.id !== action.payload);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete employee';
            });
    },
});

export const { setSearchTerm, setSelectedCategory, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;