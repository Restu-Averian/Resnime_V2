import EpisodesAnimeContextProvider from "./EpisodesAnimeContextProvider";
import EpisodesAnimeList from "./EpisodesAnimeList";
import EpisodesAnimeStreamingModal from "./EpisodesAnimeStreamingModal";

const EpisodesAnime = ({ data, sortMode, setSortMode }) => {
  return (
    <EpisodesAnimeContextProvider data={data}>
      <EpisodesAnimeList sortMode={sortMode} setSortMode={setSortMode} />

      <EpisodesAnimeStreamingModal />
    </EpisodesAnimeContextProvider>
  );
};
export default EpisodesAnime;
