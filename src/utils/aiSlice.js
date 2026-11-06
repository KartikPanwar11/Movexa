import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
    name:"ai",
    initialState:{
        showAiSearch:false,
    },
    reducers:{
        toggleAiSearch:(state)=>{
            state.showAiSearch = !state.showAiSearch;
        }
    }
})

export const {toggleAiSearch} = aiSlice.actions;

export default aiSlice.reducer; 