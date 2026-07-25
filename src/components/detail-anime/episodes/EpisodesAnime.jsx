import EpisodesAnimeContextProvider from "../../../context/EpisodesAnimeContextProvider";
import EpisodesAnimeList from "./EpisodesAnimeList";
import StreamingAnime from "../streaming/StreamingAnime";

const EpisodesAnime = ({ data }) => {
  return (
    <EpisodesAnimeContextProvider data={data}>
      <EpisodesAnimeList />

      <StreamingAnime />
    </EpisodesAnimeContextProvider>
  );
};
export default EpisodesAnime;
