import { Box as ChakraBox, Flex, Image } from "@chakra-ui/react";
import BannerHeroAnimeInfo from "./BannerHeroAnimeInfo";

const getTitle = (data, fallback) => data?.title?.romaji || decodeURI(fallback);

/**
 * Banner hero container component for anime detail page.
 * @param {Object} props
 * @param {Object} props.data
 * @param {String} props.animeName
 * @param {Function} props.onWatch
 */
const BannerHeroAnime = ({ data, animeName, onWatch }) => {
  const title = getTitle(data, animeName);

  return (
    <ChakraBox
      minH={{ base: "680px", md: "500px" }}
      borderRadius="16px"
      overflow="hidden"
      border="1px solid rgba(255,255,255,0.12)"
      bgImage={`linear-gradient(90deg, rgba(4, 8, 22, 0.98) 0%, rgba(7, 11, 27, 0.88) 38%, rgba(7, 11, 27, 0.58) 100%), url(${data?.cover || data?.image})`}
      bgSize="cover"
      bgPos="center"
      boxShadow="0 24px 80px rgba(0,0,0,0.38)"
      position="relative"
    >
      <Flex
        minH={{ base: "680px", md: "500px" }}
        align="center"
        gap={{ base: 6, lg: 9 }}
        direction={{ base: "column", md: "row" }}
        px={{ base: 5, md: 10, xl: 14 }}
        py={{ base: 8, md: 10 }}
      >
        <Image
          src={data?.image}
          alt={title}
          w={{ base: "210px", md: "240px" }}
          aspectRatio="2 / 3"
          objectFit="cover"
          borderRadius="16px"
          border="1px solid rgba(255,255,255,0.18)"
          boxShadow="0 18px 60px rgba(0,0,0,0.45)"
        />

        <BannerHeroAnimeInfo
          data={data}
          animeName={animeName}
          onWatch={onWatch}
        />
      </Flex>
    </ChakraBox>
  );
};

export default BannerHeroAnime;
