import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        id: null,
        token: null
    },
    reducers:{
        setInfo: (state,action)=>{
            state.id = action.payload.id;
            state.token = action.payload.token;

            window.sessionStorage.setItem("id",state.id);
            window.sessionStorage.setItem("token",state.token);
        }
    }
});

export const {setInfo} = userSlice.actions;

export default userSlice.reducer;