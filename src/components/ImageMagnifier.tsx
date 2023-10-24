import React, { useState } from "react";

export default function ImageMagnifier({
  src,
  maxWidth,
  maxHeight,
  magnifierHeight = 120,
  magnifieWidth = 120,
  zoomLevel = 1.5,
  alt,
  rimProps,
  rimStyles,
  useMagnifier = true,
}: {
  src: string;
  maxWidth?: string;
  maxHeight?: string;
  magnifierHeight?: number;
  magnifieWidth?: number;
  zoomLevel?: number;
  alt?: string;
  rimProps?: object;
  rimStyles?: object;
  useMagnifier?: boolean;
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
    >
      {useMagnifier && (
        <img
          alt={alt ?? "An image"}
          src={src}
          style={{
            width: "100%",
            maxHeight: maxHeight,
            maxWidth: maxWidth,
            objectFit: "cover",
            cursor: "zoom-in",
            borderRadius: "16px",
            ...rimStyles,
          }}
          onMouseEnter={(e) => {
            // update image size and turn-on magnifier
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            // update cursor position
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();

            // calculate cursor position on the image
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            // close magnifier
            setShowMagnifier(false);
          }}
          {...rimProps}
        />
      )}

      {!useMagnifier && (
        <img
          alt={alt ?? "An image"}
          src={src}
          style={{
            width: "100%",
            maxHeight: maxHeight,
            maxWidth: maxWidth,
            objectFit: "cover",
          }}
          {...rimProps}
        />
      )}

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: "none",
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "1px solid lightgray",
          borderRadius: "6px",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}
