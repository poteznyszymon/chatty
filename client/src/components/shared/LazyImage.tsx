import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface MyImageProps {
  image: string;
}

const MyImage = ({ image }: MyImageProps) => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [image]);

  return (
    <div>
      <LazyLoadImage
        alt="Image"
        src={image}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default MyImage;
