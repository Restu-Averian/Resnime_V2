import { STREAM_BASE_URL } from "../constants/index.js";

export const ALLOWED_AUDIO_TYPES = ["sub", "dub"];
export const STREAM_SERVERS = [
  {
    value: "hd-1",
    label: "Server 1",
  },
  {
    value: "hd-2",
    label: "Server 2",
  },
  {
    value: "hd-3",
    label: "Server 3",
  },
  {
    value: "hd-4",
    label: "Server 4",
  },
  {
    value: "hd-5",
    label: "Server 5",
  },
];

const toPositiveInteger = (value, label) => {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`Invalid ${label}.`);
  }
  return number;
};

export const buildStreamUrl = ({
  embedId,
  server = "hd-1",
  audioType = "sub",
}) => {
  const validEmbedId = toPositiveInteger(embedId, "embed ID");

  if (!ALLOWED_AUDIO_TYPES.includes(audioType)) {
    throw new Error("Invalid audio type.");
  }

  if (!STREAM_SERVERS.some((option) => option.value === server)) {
    throw new Error("Invalid stream server.");
  }

  const baseUrl = new URL(STREAM_BASE_URL);
  return `${baseUrl.origin}/embed/${server}/in/${validEmbedId}/${audioType}`;
};

export const getStreamOrigin = () => new URL(STREAM_BASE_URL).origin;
