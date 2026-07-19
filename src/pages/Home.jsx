import ListAnime from "../components/home/ListAnime";
import useChangeDocTitle from "../hooks/useChangeDocTitle";

const Home = () => {
  useChangeDocTitle("Resnime");

  return <ListAnime titlePage="Anime" path="/anime" />;
};
export default Home;
