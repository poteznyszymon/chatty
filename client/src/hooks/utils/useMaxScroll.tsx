import { useState, useEffect } from "react";

const useMaxScroll = () => {
  const [maxScroll, setMaxScroll] = useState(0);

  const calculateMaxScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    setMaxScroll(scrollHeight - clientHeight);
  };

  useEffect(() => {
    // Oblicz maksymalny scroll przy montowaniu
    calculateMaxScroll();

    // Aktualizuj przy zmianie rozmiaru okna
    window.addEventListener("resize", calculateMaxScroll);

    // Czyszczenie zdarzenia
    return () => {
      window.removeEventListener("resize", calculateMaxScroll);
    };
  }, []);

  return { maxScroll };
};

export default useMaxScroll;
