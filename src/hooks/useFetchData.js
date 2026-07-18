import { useCallback, useEffect, useState } from "react";
import { getAnimeByPath } from "../services/animeService";

const searchDebounceMs = 500;

const isSearchPath = (path) =>
  !["/trending", "/popular", "/upcoming"].some((item) =>
    path?.startsWith(item),
  ) && !path?.startsWith("/anime/");

const useFetchData = (path) => {
  const [state, setState] = useState({
    data: [],
    loading: false,
    error: "",
  });

  const getData = useCallback(
    async (signal) => {
      setState((prev) => ({
        ...prev,
        data: [],
        error: "",
        loading: true,
      }));

      try {
        const data = await getAnimeByPath(path, signal);
        setState((prev) => ({
          ...prev,
          data,
        }));
      } catch (e) {
        if (!e?.cancelled) {
          setState((prev) => ({
            ...prev,
            error: e?.message,
          }));
        }
      } finally {
        if (!signal?.aborted) {
          setState((prev) => ({
            ...prev,
            loading: false,
          }));
        }
      }
    },
    [path],
  );

  const refetch = () => {
    const controller = new AbortController();
    getData(controller.signal);
  };

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => getData(controller.signal),
      isSearchPath(path) ? searchDebounceMs : 0,
    );

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [getData, path]);

  return { ...state, refetch };
};
export default useFetchData;
