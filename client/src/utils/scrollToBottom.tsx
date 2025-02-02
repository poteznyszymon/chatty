export const scrollToBottom = (divRef: React.RefObject<HTMLDivElement>) => {
  const div = divRef.current;
  if (div) {
    div.scrollTo({
      top: div.scrollHeight,
      behavior: "smooth",
    });
  }
};
