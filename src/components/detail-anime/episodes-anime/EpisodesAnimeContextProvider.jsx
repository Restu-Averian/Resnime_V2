import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ALLOWED_AUDIO_TYPES,
  ALLOWED_STREAM_SERVERS,
  buildStreamUrl,
} from "../../../services/stream.js";

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
  const [audioType, setAudioType] = useState("sub");
  const [server, setServer] = useState("hd-1");
  const [streamError, setStreamError] = useState("");

  const episodeValParam = useMemo(() => {
    return episodeParam?.get("episode");
  }, [episodeParam]);

  const selectedEpisode = useMemo(() => {
    return data?.episodes?.find((episode) => episode?.id === episodeValParam);
  }, [data, episodeValParam]);

  const streamState = useMemo(() => {
    if (!selectedEpisode) return { error: "", url: "" };

    try {
      return {
        error: "",
        url: buildStreamUrl({
          malId: data?.malId || data?.id,
          episodeNumber: selectedEpisode?.number,
          audioType,
          server,
        }),
      };
    } catch (error) {
      return { error: error?.message, url: "" };
    }
  }, [audioType, data, selectedEpisode, server]);

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
    setAudioType("sub");
    setServer("hd-1");
    setStreamError("");
  }, [episodeValParam]);

  useEffect(() => {
    setStreamError("");
  }, [audioType, server]);

  return (
    <EpisodesAnimeContext.Provider
      value={{
        data,
        openModalVideo,
        closeModalVideo,
        isStreamOpen,
        episodeValParam,
        selectedEpisode,
        streamUrl: streamState.url,
        audioType,
        server,
        streamError: streamError || streamState.error,
        setAudioType,
        setServer,
        setStreamError,
        audioOptions: ALLOWED_AUDIO_TYPES,
        serverOptions: ALLOWED_STREAM_SERVERS,
      }}
    >
      {children}
    </EpisodesAnimeContext.Provider>
  );
};
export default EpisodesAnimeContextProvider;
