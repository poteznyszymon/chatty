import { Loader2, Search, UserCheck, UserPlus, X } from "lucide-react";
import { Input } from "../ui/input";
import OptionsButton from "./OptionsButton";
import { useState, ChangeEvent } from "react";
import useSearchUsers from "@/hooks/users/useSearchUsers";
import UserAvatar from "../shared/UserAvatar";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import CustomTooltip from "../shared/CustomTooltip";
import useAddContact from "@/hooks/contacts/useAddContact";

const SearchBar = () => {
  const queryClient = useQueryClient();
  const { inviteContact } = useAddContact();
  const [showSearchAnswers, setShowSearchAnswers] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { users, refetch, isError, isLoading, isRefetching } =
    useSearchUsers(inputValue);
  const contacts = queryClient.getQueryData<User[]>(["contacts"]);
  const invitations = queryClient.getQueryData<User[]>(["invitations"]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setShowSearchAnswers(value.trim().length > 0);
    refetch();
  };

  return (
    <div
      onMouseLeave={() => setShowSearchAnswers(false)}
      className="w-full h-[4rem] flex gap-1 items-center justify-center"
    >
      <OptionsButton />
      <div className="relative w-full">
        <Input
          className="pl-10 peer pr-10"
          id="input"
          value={inputValue}
          onChange={handleInputChange}
        />
        <label htmlFor="input">
          <Search className="size-5 text-muted-foreground peer-focus:text-primary absolute top-1/2 -translate-y-1/2 left-2" />
        </label>
        {inputValue && (
          <div
            onClick={() => {
              setInputValue("");
              setShowSearchAnswers(false);
            }}
            className="p-1 mr-1 hover:bg-card rounded-full absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <X className="size-5" />
          </div>
        )}
        {showSearchAnswers && (
          <div className="absolute top-12 w-full z-10 rounded-md bg-card border shadow-lg flex flex-col p-2">
            {!isLoading &&
              !isRefetching &&
              users?.map((user) => (
                <Link
                  onClick={() => {
                    setShowSearchAnswers(false);
                    setInputValue("");
                  }}
                  to={`/${user.username}`}
                  key={user.id}
                  className="p-2 flex items-center gap-2 hover:bg-accent rounded-md"
                >
                  <UserAvatar url={user.imageUrl || ""} className="size-8" />
                  {user.username}

                  {contacts?.find((contact) => contact.id === user.id) ||
                  invitations?.find((contact) => contact.id === user.id) ? (
                    <div className="ml-auto text-muted-foreground p-2 rounded-full">
                      <UserCheck className="size-5" />
                    </div>
                  ) : (
                    <CustomTooltip
                      classname="ml-auto"
                      text="Invite to contacts"
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          inviteContact(user.id || Number.MAX_SAFE_INTEGER);
                          setInputValue("");
                        }}
                        className="p-2 hover:bg-card rounded-full"
                      >
                        <UserPlus className="size-5" />
                      </div>
                    </CustomTooltip>
                  )}
                </Link>
              ))}
            {(!users || isError) && !isLoading && !isRefetching && (
              <p className="p-2">No users found</p>
            )}
            {(isLoading || isRefetching) && (
              <div className="p-2">
                <Loader2 className="animate-spin mx-auto text-foreground" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
