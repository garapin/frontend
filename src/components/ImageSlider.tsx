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
              width={500}
              height={250}
              alt="image"
              className="aspect-auto w-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
