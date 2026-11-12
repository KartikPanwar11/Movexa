import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/nowMoviesSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();

    const getPopularMovies = async()=>{
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
            if (!data.ok) throw new Error("TMDB error " + data.status);
            const jsonData = await data.json();
            dispatch(addPopularMovies(jsonData.results))
        } catch (error) {
            console.error("Popular movies failed:", error);
        }
  }

    useEffect(()=>{
        getPopularMovies();
    },[])
}

export default usePopularMovies;
