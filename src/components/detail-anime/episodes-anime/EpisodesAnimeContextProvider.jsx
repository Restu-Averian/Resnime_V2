import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../../constants";
import videoHLS from "../../../helpers/videoHLS";

/**
 * @typedef {Array} DataStreamState
 * @property {String} download
 * @property {[]} sources
 */
/**
 * @typedef EpisodesAnimeContextData
 * @property {Object} data
 * @property {import("react").MutableRefObject<HTMLVideoElement>} videoRef
 * @property {(e:HTMLButtonElement,episodeId:Number)=>void} openModalVideo
 * @property {()=>void} closeModalVideo
 * @property {Boolean} isStreamOpen
 * @property {String} episodeValParam
 * @property {DataStreamState} dataStream
 *
 */

/** @type {import("react").Context<EpisodesAnimeContextData>} */
const EpisodesAnimeContext = createContext({});

export const useEpisodeAnimeContext = () => useContext(EpisodesAnimeContext);

const EpisodesAnimeContextProvider = ({ data, children }) => {
  const navigate = useNavigate();

  const videoRef = useRef();

  const [episodeParam, setEpisodeParam] = useSearchParams();

  const [isStreamOpen, setIsStreamOpen] = useState(false);
  const [dataStream, setDataStream] = useState({
    download: "",
    sources: [],
  });

  const episodeValParam = useMemo(() => {
    return episodeParam?.get("episode");
  }, [episodeParam]);

  const getStreamLink = () => {
    axios.get(`${BASE_API}/watch/${episodeValParam}`)?.then(({ data }) => {
      if (data) {
        videoHLS({
          refCurrent: videoRef?.current,
          srcVideo: data?.sources[0]?.url,
        });
        setDataStream((prev) => ({
          ...prev,
          download: data?.download,
          sources: data?.sources,
        }));
      }
    });
  };

  const openModalVideo = (e, episodeId) => {
    e?.preventDefault();
    setIsStreamOpen(true);

    episodeParam?.set("episode", episodeId);
    setEpisodeParam(episodeParam);

    navigate(`?episode=${episodeId}`);
  };

  const closeModalVideo = () => {
    setIsStreamOpen(false);

    episodeParam.delete("episode");
    setEpisodeParam(episodeParam);
  };

  useEffect(() => {
    if (episodeValParam) {
      setIsStreamOpen(true);
      getStreamLink();
    }
  }, [episodeValParam]);

  return (
    <EpisodesAnimeContext.Provider
      value={{
        data,
        videoRef,
        openModalVideo,
        closeModalVideo,
        isStreamOpen,
        episodeValParam,
        dataStream,
      }}
    >
      {children}
    </EpisodesAnimeContext.Provider>
  );
};
export default EpisodesAnimeContextProvider;
