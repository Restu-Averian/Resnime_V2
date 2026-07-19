import { useSearchParams } from "react-router-dom";
import ListAnime from "../components/home/ListAnime";
import { useMemo } from "react";
import useChangeDocTitle from "../hooks/useChangeDocTitle";

const Search = () => {
  const [searchParam] = useSearchParams();

  const searchVal = useMemo(() => {
    return searchParam?.get("q");
  }, [searchParam]);

  useChangeDocTitle(`Resnime | ${searchVal}`);
  return (
    <ListAnime
      titlePage={`Search : ${searchVal}`}
      path={`/${searchVal}`}
      useExploreMore={false}
    />
  );
};
export default Search;
