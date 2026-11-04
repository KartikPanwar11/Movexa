import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcommingMovies } from "../utils/nowMoviesSlice";

const useUpcommingMovies = () => {
    const dispatch = useDispatch();

    const getUpcommingMovies = async()=>{
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
        const jsonData = await data.json();
        console.log(jsonData);
        dispatch(addUpcommingMovies(jsonData.results))
  }

    useEffect(()=>{
        getUpcommingMovies();
    },[])
}

export default useUpcommingMovies;
