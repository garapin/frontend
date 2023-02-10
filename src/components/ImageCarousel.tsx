import React, { useState } from 'react';
import ReactSlick from 'react-slick';
// import '@/styles/react-slick.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/system';
import ImageMagnifier from './ImageMagnifier';

export interface CarouselImageSet {
    alt?: string
    srcUrl: string
}


type ImageCarouselProp = {
    dataSource: CarouselImageSet[],
    rimProps?: object,
    rimStyles?: object,
    rsProps?: object,
    maxWidth?: number,
    maxHeight?: number,
    withThumbnail?: boolean,
    useMagnifier?:boolean,
}

type AdditionalProps = { [key: string]: any };

type Props = ImageCarouselProp & AdditionalProps;

export default function ImageCarousel({dataSource, rimProps, rimStyles, rsProps, maxWidth, maxHeight, withThumbnail=true, useMagnifier, ...props}: Props) {
    const [currentSlide, setCurrentSlide] = useState(0);
    let slider:ReactSlick|null;

  return (
    <Box className='py-2' {...props}>
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
                ref={thisSlider => (slider = thisSlider)}
            >
                {dataSource.map((src, index) => (
                    <div key={index}>
                        <ImageMagnifier src={src.srcUrl} zoomLevel={3} alt={src.alt} maxWidth={`${maxWidth}px`} maxHeight={maxHeight?`${maxHeight}px`:'100%'} rimProps={rimProps} rimStyles={rimStyles} useMagnifier={useMagnifier}/>
                    </div>
                ))}
            </ReactSlick>
            {withThumbnail &&
            <div className="w-full flex justify-center pb-2">
                {dataSource.map((_,index) => (
                    <div
                        key={index}
                        className='w-10 h-10 mx-2 rounded-md cursor-pointer'
                        onClick={e => slider?.slickGoTo(index)}
                        style={{
                            backgroundImage: `url(${dataSource[index].srcUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: index === currentSlide ? 1 : 0.5,
                          }}
                        >

                    </div>
                ))}
            </div> }
            </Box>
  )
}
