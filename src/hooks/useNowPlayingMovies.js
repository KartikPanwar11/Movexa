import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/nowMoviesSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlaying = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
        const jsonData = await data.json();
        // console.log(jsonData);
        dispatch(addNowPlayingMovies(jsonData.results))
  }

    useEffect(()=>{
        getNowPlaying();
    },[])
}

export default useNowPlayingMovies;
