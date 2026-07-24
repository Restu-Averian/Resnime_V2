import EpisodesAnimeContextProvider from "../../../context/EpisodesAnimeContextProvider";
import EpisodesAnimeList from "./EpisodesAnimeList";
import StreamingAnime from "../streaming/StreamingAnime";

const EpisodesAnime = ({ data, sortMode, setSortMode }) => {
  return (
    <EpisodesAnimeContextProvider data={data}>
      <EpisodesAnimeList sortMode={sortMode} setSortMode={setSortMode} />

      <StreamingAnime />
    </EpisodesAnimeContextProvider>
  );
};
export default EpisodesAnime;
