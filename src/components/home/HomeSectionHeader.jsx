import { Flame } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Pagination from "../global/Pagination";

const HomeSectionHeader = ({ page, setPage, loading }) => {
  return (
    <SectionHeader
      icon={Flame}
      title="Recently Updated"
      action={
        <Pagination
          page={page}
          loading={loading}
          onPrev={() => setPage((value) => Math.max(value - 1, 1))}
          onNext={() => setPage((value) => value + 1)}
        />
      }
    />
  );
};

export default HomeSectionHeader;
