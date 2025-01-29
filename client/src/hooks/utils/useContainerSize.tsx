import { useEffect, useState } from "react";

const useContainerSize = (id: string) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const container = document.getElementById(id);
    if (!container) {
      console.warn(`Element with id "${id}" not found.`);
      return;
    }

    const updateSize = () => {
      setContainerHeight(container.clientHeight);
      setContainerWidth(container.clientWidth);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });

    resizeObserver.observe(container);

    updateSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [id]);

  return { containerHeight, containerWidth };
};

export default useContainerSize;
