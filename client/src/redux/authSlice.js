import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../services/ApiEndPoints";
export const updateUser = createAsyncThunk('updateUser', async()=>{
    try {
        const request = await get('/api/auth/checkUser');
        const response = request.data;
        return response;
    } catch (error) {
        console.log(error);
        // throw error;
        
    }
})
const authSlice = createSlice({
    name: "authslice",
    initialState: {
        loading: null,
        error: null,
        user: null,
    },
    reducers: {
        SetUser:(state,action)=>{
            state.user = action.payload;
        },
        logout:(state)=>{
            state.user = null,
            state.loading = null,
            state.error = null
        }
    },
    extraReducers:(builder)=> {
        builder
           .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
           .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
           .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const {SetUser, logout} = authSlice.actions;
export default authSlice.reducer