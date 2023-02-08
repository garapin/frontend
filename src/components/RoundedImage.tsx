import React from 'react';
import styled from "@emotion/styled";

interface RoundedImageProps {
    src: string;
    alt: string;
    width?: string;
    height?: string;
}

const RoundedImageStyle = styled.img<RoundedImageProps>`
  border-radius: 50%;
  width: ${props => props.width || '100px'};
  height: ${props => props.height || '100px'};
`;

const RoundedImage: React.FC<RoundedImageProps> = ({ src, alt, ...props }) => (
    <RoundedImageStyle src={src} alt={alt} {...props} />
);

export default RoundedImage;
