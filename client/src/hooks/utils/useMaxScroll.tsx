import { useState, useEffect } from "react";

const useMaxScroll = (id: string) => {
  const [maxScroll, setMaxScroll] = useState(0);

  const calculateMaxScroll = () => {
    const container = document.getElementById(id);
    if (container) {
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      setMaxScroll(scrollHeight - clientHeight);
    }
  };

  useEffect(() => {
    const container = document.getElementById(id);

    if (!container) {
      console.warn(`Element with id "${id}" not found.`);
      return;
    }

    calculateMaxScroll();

    const observer = new MutationObserver(calculateMaxScroll);
    observer.observe(container, { childList: true, subtree: true });

    window.addEventListener("resize", calculateMaxScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", calculateMaxScroll);
    };
  }, [id]);

  return { maxScroll };
};

export default useMaxScroll;
