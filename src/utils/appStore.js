import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import moviesReducer from "./nowMoviesSlice";
import aiReducer from "./aiSlice"

const appStore = configureStore(
    {
        reducer:{
            user: userReducer,
            movies: moviesReducer,
            ai: aiReducer,
        },
    },
)

export default appStore;