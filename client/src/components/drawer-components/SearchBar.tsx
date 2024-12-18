import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <div className="w-full h-[4rem] relative flex flex-col items-center justify-center">
      <Input className="pl-10 h-[2.5rem] peer" id="input" />
      <label htmlFor="input">
        <Search className="size-5 text-muted-foreground peer-focus:text-primary absolute top-1/2 -translate-y-1/2 left-2" />
      </label>
    </div>
  );
};

export default SearchBar;
