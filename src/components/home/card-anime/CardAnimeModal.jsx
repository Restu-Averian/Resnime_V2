import { useMemo } from "react";
import useResponsive from "../../../hooks/useResponsive";
import Modal from "../../global/Modal";
import { Heading } from "@chakra-ui/react";

/**
 * @typedef AddModalProps
 * @property {Object} data
 */
/**
 *
 * @param {import("@chakra-ui/react").ModalProps & AddModalProps} props
 */
const CardAnimeModal = ({ data, ...props }) => {
  const title = useMemo(() => {
    return data?.title?.romaji;
  }, [data]);

  const { sm } = useResponsive();

  return (
    <Modal
      {...props}
      isCentered
      size={sm ? "md" : "2xl"}
      header={<Heading>Trailer {title}</Heading>}
    >
      <iframe
        width={sm ? "320" : "630"}
        height="357"
        src={`https://www.youtube.com/embed/${data?.trailer?.id}`}
        title={data?.title?.romaji}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </Modal>
  );
};
export default CardAnimeModal;
