import { useState } from "react";
import { Image as ImageChakra } from "@chakra-ui/react";
import PlaceholderImage from "../../assets/placeholder.png";

/**
 * @param {import("@chakra-ui/react").ImageProps} props
 * @returns {Element}
 */
const Image = ({ src, onError, ...props }) => {
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setHasError(false);
  }

  const handleImageError = (e) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  const imageSrc = !src || hasError ? PlaceholderImage : src;

  return (
    <ImageChakra
      loading="lazy"
      src={imageSrc}
      onError={handleImageError}
      {...props}
    />
  );
};

export default Image;
