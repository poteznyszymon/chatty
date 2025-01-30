import {
  Image,
  Loader2,
  Paperclip,
  SendHorizonal,
  Smile,
  X,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useTheme } from "../ui/theme-provider";
import useSendMessage from "@/hooks/messages/useSendMessage";
import { useLocation } from "react-router";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { Input } from "../ui/input";
import DragDrop from "../shared/DragDrop";

const ChatInput = () => {
  const { pathname } = useLocation();
  const [openEmojiPanel, setOpenEmojiPanel] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { theme } = useTheme();
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const { sendMessage, isLoading } = useSendMessage(
    pathname.slice(1),
    userInput,
    {
      onSucess: () => {
        setUserInput("");
        setImage(null);
      },
    },
    image ? image : ""
  );
  const { isLoading: isUserLoading } = useQuery<User | null>({
    queryKey: ["user", `${pathname.slice(1)}`],
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 200) {
      setUserInput(inputValue);
    }
  };

  const handleSendMessage = () => {
    if (userInput.trim() && !isLoading) {
      sendMessage();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileType(file.type);
      setFileSize(file.size);
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
      id="chat-input-container"
      className="max-w-2xl mt-auto  mx-auto bg-background z-20 w-full lg:pb-5 pb-2 pt-2 items-center flex px-2 xl:px-0 gap-3"
    >
      <DragDrop
        setImage={setImage}
        setFileName={setFileName}
        setFileSize={setFileSize}
        setFileType={setFileType}
        className="flex flex-col w-full rounded-md bg-card relative "
      >
        <div className="min-h-[3rem] flex items-center w-full px-3">
          <div
            onClick={() => setOpenEmojiPanel(!openEmojiPanel)}
            className="text-muted-foreground p-1 hover:bg-accent rounded-full relative cursor-pointer group"
          >
            <Smile className="group-hover:text-primary" />
            {openEmojiPanel && (
              <div className="absolute bottom-10">
                <EmojiPicker
                  className="z-40"
                  theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                  onEmojiClick={(emoji: EmojiClickData) => {
                    if (userInput.length < 200) {
                      setUserInput((prev) => prev + emoji.emoji);
                    }
                  }}
                />
              </div>
            )}
          </div>
          <Input
            className=" border-none bg-transparent w-full focus:outline-none outline-none ring-0 focus-visible:ring-0"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Message"
            maxLength={200}
          />
          {userInput && (
            <div
              onClick={() => setUserInput("")}
              className="p-1 hover:bg-accent rounded-full cursor-pointer"
            >
              <X className="size-6 text-muted-foreground" />
            </div>
          )}

          <label
            htmlFor="input-file"
            className="p-2 hover:bg-accent rounded-full cursor-pointer group"
          >
            <Paperclip className="size-5 text-muted-foreground group-hover:text-primary" />
          </label>
          <input
            type="file"
            hidden
            id="input-file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
          />
        </div>
        {userInput.length > 160 && (
          <div className="absolute right-2 -bottom-3 text-xs text-muted-foreground bg-accent p-1 rounded-md">
            <p>{userInput.length}/200</p>
          </div>
        )}

        {image && (
          <div className="border shadow-sm bg-card absolute px-3 py-2 -top-[3.8rem] flex rounded-md items-center gap-3 w-[12rem] group hover:ring-1 ring-primary">
            <div>
              <Image className="text-primary" />
            </div>
            <div className="flex flex-col text-sm">
              <p className="max-w-[6rem] truncate">{fileName}</p>
              <p className="text-muted-foreground text-xs">
                {fileType?.split("/")[1].toUpperCase()}{" "}
                {Math.round(fileSize! / 1024)}KB
              </p>
            </div>
            <div
              onClick={() => setImage(null)}
              className="absolute top-1 text-muted-foreground right-1 hidden group-hover:block hover:bg-accent rounded-full p-1 cursor-pointer"
            >
              <X />
            </div>
          </div>
        )}
      </DragDrop>
      <div className="bg-background rounded-full border">
        <button
          onClick={handleSendMessage}
          disabled={(!userInput && !image) || isLoading}
          className="size-[3rem] aspect-square bg-primary disabled:bg-primary/70 rounded-full flex items-center justify-center"
        >
          {!isLoading && !isUserLoading ? (
            <SendHorizonal className="text-white size-5" />
          ) : (
            <Loader2 className="size-5 animate-spin text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
