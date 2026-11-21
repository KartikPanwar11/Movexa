import Browse from "./Browse";
import Login from "./Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./Error";
import MovieDetail from "./MovieDetail";


const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/browse",
      element: <Browse />,
      errorElement: <Error />,
    },
    {
      path: "/movie/:movieId",
      element: <MovieDetail />,
      errorElement: <Error />,
    },
    {
      path: "*",
      element: <Error />,
    }
  ]);

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body