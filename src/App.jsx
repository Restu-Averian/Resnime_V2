import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Suspense from "./components/global/Suspense";

const Home = lazy(() => import("./pages/Home"));
const DetailAnime = lazy(() => import("./pages/DetailAnime"));
const Search = lazy(() => import("./pages/Search"));
const Genres = lazy(() => import("./pages/Genres"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/search" Component={Search} />
        <Route path="/genres/:genre?" Component={Genres} />
        <Route path="/anime/:id/:anime_name" Component={DetailAnime} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </Suspense>
  );
}

export default App;
