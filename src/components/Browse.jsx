import Header from "./Header";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";


const Browse = () => {

  const getNowPlaying = async()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);

    const jsonData = await data.json();
    console.log(jsonData);
  }

  useEffect(()=>{
    getNowPlaying();
  },[])

  return (
    <>
      <Header/>
    </>
  )
}

export default Browse