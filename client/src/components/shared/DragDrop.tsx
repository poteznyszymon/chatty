import { cn } from "@/lib/utils";
import { DragEvent, useState } from "react";

interface DragDropProps {
  children: React.ReactNode;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
  setFileType: React.Dispatch<React.SetStateAction<string | null>>;
  setFileName: React.Dispatch<React.SetStateAction<string | null>>;
  setFileSize: React.Dispatch<React.SetStateAction<number | null>>;
  className?: string;
}

const DragDrop = ({
  children,
  setImage,
  className,
  setFileName,
  setFileSize,
  setFileType,
}: DragDropProps) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setFileSize(file.size);
      setFileType(file.type);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={cn(
        className,
        `${dragging ? "border border-dashed border-primary" : "border"}`
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default DragDrop;
