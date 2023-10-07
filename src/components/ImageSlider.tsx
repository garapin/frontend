import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";

const useStyles = makeStyles((theme: Theme) => ({
  sliderImage: {
    "& .slick-dots": {
      "& .slick-active": {
        "& button": {
          "&::before": {
            content: "''",
            backgroundColor: "#713F97",
            opacity: 1,
            height: 4,
            borderRadius: 4,
            top: 8,
            width: 20,
          },
        },
      },
    },
  },
}));

const ImageSlider = () => {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={`mb-6 ${classes.sliderImage}`}>
      <Slider {...settings}>
        {[1, 2, 3].map((item) => (
          <div>
            <Image
              src="/assets/slider.png"
              width={800}
              height={800}
              alt="image"
              className="aspect-[3/4] h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] 2xl:h-[750px] w-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
