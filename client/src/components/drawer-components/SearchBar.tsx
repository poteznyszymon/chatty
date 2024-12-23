import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import OptionsButton from "./OptionsButton";

const SearchBar = () => {
  return (
    <div className="w-full h-[4rem] flex gap-1 items-center justify-center">
      <OptionsButton />
      <div className="relative w-full">
        <Input className="pl-10 peer" id="input" />
        <label htmlFor="input">
          <Search className="size-5 text-muted-foreground peer-focus:text-primary absolute top-1/2 -translate-y-1/2 left-2" />
        </label>
      </div>
      <Button variant={"outline"}>Search</Button>
    </div>
  );
};

export default SearchBar;
