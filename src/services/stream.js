import { STREAM_BASE_URL } from "../constants/index.js";

export const ALLOWED_AUDIO_TYPES = ["sub", "dub"];
export const ALLOWED_STREAM_SERVERS = ["hd-1"];

const toPositiveInteger = (value, label) => {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`Invalid ${label}.`);
  }
  return number;
};

export const buildStreamUrl = ({
  malId,
  episodeNumber,
  server = "hd-1",
  audioType = "sub",
}) => {
  const validMalId = toPositiveInteger(malId, "MAL anime ID");
  const validEpisodeNumber = toPositiveInteger(episodeNumber, "episode number");

  if (!ALLOWED_AUDIO_TYPES.includes(audioType)) {
    throw new Error("Invalid audio type.");
  }

  if (!ALLOWED_STREAM_SERVERS.includes(server)) {
    throw new Error("Invalid stream server.");
  }

  const baseUrl = new URL(STREAM_BASE_URL);
  return `${baseUrl.origin}/embed/${server}/mal/${validMalId}/${validEpisodeNumber}/${audioType}?k=1`;
};

export const getStreamOrigin = () => new URL(STREAM_BASE_URL).origin;
