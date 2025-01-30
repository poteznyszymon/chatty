import { Download, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface ImageInfoProps {
  imageUrl: string;
  showImageInfo: boolean;
  setShowImageInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageInfo = ({
  imageUrl,
  showImageInfo,
  setShowImageInfo,
}: ImageInfoProps) => {
  const [enlargeImage, setEnlargeImage] = useState(false);

  return (
    <div
      className={`absolute top-0 left-0 z-[999] w-full h-full  bg-black/80 flex flex-col duration-300  ${
        showImageInfo ? "" : "hidden"
      }`}
    >
      <nav className=" flex items-center justify-end p-2 gap-3">
        <a
          target="_blank"
          href={imageUrl}
          className="p-2 hover:bg-accent rounded-full cursor-pointer text-muted-foreground hover:text-foreground"
        >
          <Download />
        </a>
        <div
          onClick={() => setEnlargeImage(!enlargeImage)}
          className="p-2 hover:bg-accent rounded-full cursor-pointer text-muted-foreground hover:text-foreground"
        >
          {enlargeImage ? <ZoomOut /> : <ZoomIn />}
        </div>
        <div
          onClick={() => {
            setShowImageInfo(false);
            setEnlargeImage(false);
          }}
          className="p-2 hover:bg-accent rounded-full cursor-pointer text-muted-foreground hover:text-foreground"
        >
          <X />
        </div>
      </nav>
      <div
        onClick={() => setShowImageInfo(false)}
        className="flex items-center justify-center h-full "
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`max-w-[60%] md:max-w-[30rem]  rounded-md duration-300 ${
            enlargeImage && "scale-150"
          }`}
        >
          <img src={imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default ImageInfo;
