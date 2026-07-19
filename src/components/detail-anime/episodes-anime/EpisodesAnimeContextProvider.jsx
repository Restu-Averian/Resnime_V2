import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
/**
 * @typedef EpisodesAnimeContextData
 * @property {Object} data
 * @property {(e:HTMLButtonElement,episodeId:Number)=>void} openModalVideo
 * @property {()=>void} closeModalVideo
 * @property {Boolean} isStreamOpen
 * @property {String} episodeValParam
 *
 */

/** @type {import("react").Context<EpisodesAnimeContextData>} */
const EpisodesAnimeContext = createContext({});

export const useEpisodeAnimeContext = () => useContext(EpisodesAnimeContext);

const EpisodesAnimeContextProvider = ({ data, children }) => {
  const [episodeParam, setEpisodeParam] = useSearchParams();

  const [isStreamOpen, setIsStreamOpen] = useState(false);
  const [streamError, setStreamError] = useState("");

  const episodeValParam = useMemo(() => {
    return episodeParam?.get("episode");
  }, [episodeParam]);

  const selectedEpisode = useMemo(() => {
    return data?.episodes?.find((episode) => episode?.id === episodeValParam);
  }, [data, episodeValParam]);

  const openModalVideo = (e, episodeId) => {
    e?.preventDefault();
    setIsStreamOpen(true);

    const nextParams = new URLSearchParams(episodeParam);
    nextParams.set("episode", episodeId);
    setEpisodeParam(nextParams);
  };

  const closeModalVideo = () => {
    setIsStreamOpen(false);

    const nextParams = new URLSearchParams(episodeParam);
    nextParams.delete("episode");
    setEpisodeParam(nextParams);
  };

  useEffect(() => {
    if (episodeValParam) {
      setIsStreamOpen(true);
    }
  }, [episodeValParam]);

  useEffect(() => {
    setStreamError("");
  }, [episodeValParam]);

  return (
    <EpisodesAnimeContext.Provider
      value={{
        data,
        openModalVideo,
        closeModalVideo,
        isStreamOpen,
        episodeValParam,
        selectedEpisode,
        streamUrl: selectedEpisode?.playerUrl || "",
        streamError,
        setStreamError,
      }}
    >
      {children}
    </EpisodesAnimeContext.Provider>
  );
};
export default EpisodesAnimeContextProvider;
