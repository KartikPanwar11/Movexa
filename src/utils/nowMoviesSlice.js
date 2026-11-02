import { createSlice } from "@reduxjs/toolkit";

const nowMoviesSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload
        }
    }
})

export const {addNowPlayingMovies} = nowMoviesSlice.actions

export default nowMoviesSlice.reducer;