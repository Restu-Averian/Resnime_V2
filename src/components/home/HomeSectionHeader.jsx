import { Flame } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import Pagination from "../global/Pagination";

const HomeSectionHeader = ({ loading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const handleSetPage = (nextPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(nextPage));
      return params;
    });
  };

  return (
    <SectionHeader
      icon={Flame}
      title="Recently Updated"
      action={
        <Pagination
          page={page}
          loading={loading}
          onPrev={() => handleSetPage(Math.max(page - 1, 1))}
          onNext={() => handleSetPage(page + 1)}
          justify="flex-end"
        />
      }
    />
  );
};

export default HomeSectionHeader;
