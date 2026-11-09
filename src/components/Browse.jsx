import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatatedMovies";
import useUpcommingMovies from "../hooks/useUpcommingMovies";
import AiSearchPage from "./AiSearchPage";
import { useSelector } from "react-redux";

const Browse = () => {

  const showAiSearch = useSelector(store=>store.ai.showAiSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcommingMovies();

  return (
    <div className="min-h-screen bg-[#08090b] text-white">
      <Header/>
      {
        showAiSearch ? <AiSearchPage/> : <> 
                                        <MainContainer/>
                                        <SecondaryContainer/> 
                                      </>
      }
      
    </div>
  )
}

export default Browse