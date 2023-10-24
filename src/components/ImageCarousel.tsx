import React, { useState } from "react";
import ReactSlick from "react-slick";
// import '@/styles/react-slick.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/system";
import ImageMagnifier from "./ImageMagnifier";

export interface CarouselImageSet {
  alt?: string;
  srcUrl: string;
}

type ImageCarouselProp = {
  dataSource: CarouselImageSet[];
  rimProps?: object;
  rimStyles?: object;
  rsProps?: object;
  maxWidth?: number;
  maxHeight?: number;
  withThumbnail?: boolean;
  useMagnifier?: boolean;
};

type AdditionalProps = { [key: string]: any };

type Props = ImageCarouselProp & AdditionalProps;

export default function ImageCarousel({
  dataSource,
  rimProps,
  rimStyles,
  rsProps,
  maxWidth,
  maxHeight,
  withThumbnail = true,
  useMagnifier,
  ...props
}: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  let slider: ReactSlick | null;

  return (
    <Box className="py-2" {...props}>
      <ReactSlick
        {...{
          dots: false,
          arrows: true,
          infinite: false,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          afterChange: (index) => setCurrentSlide(index),
        }}
        {...rsProps}
        ref={(thisSlider) => (slider = thisSlider)}
      >
        {dataSource.map((src, index) => (
          <div key={index}>
            <ImageMagnifier
              src={src.srcUrl}
              zoomLevel={3}
              alt={src.alt}
              maxWidth={`${maxWidth}px`}
              maxHeight={maxHeight ? `${maxHeight}px` : "100%"}
              rimProps={rimProps}
              rimStyles={rimStyles}
              useMagnifier={useMagnifier}
            />
          </div>
        ))}
      </ReactSlick>
      {withThumbnail && (
        <div className="flex py-2 overflow-x-auto">
          {dataSource.map((_, index) => (
            <div
              key={index}
              className="min-w-[4rem] w-28 md:w-40 h-20 md:h-36 min-h-[4rem] mr-2 cursor-pointer"
              onClick={(e) => slider?.slickGoTo(index)}
              style={{
                backgroundImage: `url(${dataSource[index].srcUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: index === currentSlide ? 1 : 0.5,
                borderRadius: "16px",
              }}
            ></div>
          ))}
        </div>
      )}
    </Box>
  );
}
