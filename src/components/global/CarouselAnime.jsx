import { useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import useResponsive from "../../hooks/useResponsive";
import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BgImage from "./BgImage";

const CarouselAnime = ({ arrDatas, customChildren }) => {
  const { sm } = useResponsive();

  const dataPerSlide = useMemo(() => {
    return sm ? 2 : 3;
  }, [sm]);

  /** Proses data untuk nampilin 3 or 2 anime per carousel
   * 0 - 3 / 0 -2
   * 3 - 6 / 2 - 4
   */
  const dataCarousel = useMemo(() => {
    const tempData = [];
    arrDatas?.forEach((_, idx) => {
      tempData?.push(
        arrDatas?.slice(idx * dataPerSlide, (idx + 1) * dataPerSlide),
      );
    });

    return tempData?.filter((d) => d?.length > 0);
  }, [arrDatas, sm]);

  return (
    <Carousel
      emulateTouch
      showIndicators={false}
      infiniteLoop
      swipeable
      autoPlay
      showStatus={false}
      showThumbs={false}
    >
      {dataCarousel?.map((carData) => {
        return (
          <SimpleGrid
            key={carData?.id}
            columns={dataPerSlide}
            spacing={sm ? 5 : 10}
          >
            {carData?.map((item) => {
              if (customChildren) {
                return customChildren(item);
              }
              return (
                <Link key={item?.id} to={`/anime/${item?.id}/${item?.title}`}>
                  <BgImage src={item?.cover} useOverlay height={300}>
                    <Stack spacing={2} bottom={5} left={2} pos="absolute">
                      <Heading as="h3" fontSize={sm ? "md" : "xl"}>
                        {item?.title}
                      </Heading>
                      <Stack direction="row">{item?.subTitle}</Stack>
                    </Stack>
                  </BgImage>
                </Link>
              );
            })}
          </SimpleGrid>
        );
      })}
    </Carousel>
  );
};
export default CarouselAnime;
