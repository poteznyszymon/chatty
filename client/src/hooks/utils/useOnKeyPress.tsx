import { useEffect } from "react";

interface useOnKeyPressProps {
  targetKey: string;
  callback: () => void;
}

const useOnKeyPress = ({ callback, targetKey }: useOnKeyPressProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === targetKey) {
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });
};

export default useOnKeyPress;
