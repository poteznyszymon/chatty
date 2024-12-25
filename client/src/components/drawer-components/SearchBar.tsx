import { Search } from "lucide-react";
import { Input } from "../ui/input";
import OptionsButton from "./OptionsButton";
import { useState, useRef, useEffect, ChangeEvent } from "react";

const SearchBar = () => {
  const [showSearchAnswers, setShowSearchAnswers] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSearchAnswers(value.trim().length > 0);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setShowSearchAnswers(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full h-[4rem] flex gap-1 items-center justify-center"
      ref={searchBarRef}
    >
      <OptionsButton />
      <div className="relative w-full">
        <Input
          className="pl-10 peer"
          id="input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <label htmlFor="input">
          <Search className="size-5 text-muted-foreground peer-focus:text-primary absolute top-1/2 -translate-y-1/2 left-2" />
        </label>
        {showSearchAnswers && (
          <div className="absolute top-12 w-full h-32 z-10 rounded-md bg-card border shadow-lg">
            {/* Tu możesz dodać zawartość wyników */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
