import { Loader2, SendHorizonal, Smile, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { AutosizeTextarea } from "../ui/textarea";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useTheme } from "../ui/theme-provider";
import useSendMessage from "@/hooks/messages/useSendMessage";
import { useLocation } from "react-router";

const ChatInput = () => {
  const { pathname } = useLocation();
  const [openEmojiPanel, setOpenEmojiPanel] = useState(false);
  const [userInput, setUserInput] = useState("");
  const { theme } = useTheme();
  const { sendMessage, isLoading } = useSendMessage(
    pathname.slice(1),
    userInput,
    { onSucess: () => setUserInput("") }
  );

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

  return (
    <div className="max-w-2xl sticky bottom-0 bg-background z-20 w-full pb-5 pt-2 items-center flex px-2 xl:px-0 gap-3">
      <div className="flex flex-col w-full rounded-md bg-card relative">
        <div className="min-h-[3rem] flex items-center w-full px-3">
          <div
            onClick={() => setOpenEmojiPanel(!openEmojiPanel)}
            className="text-muted-foreground p-1 hover:bg-accent rounded-full relative cursor-pointer group"
          >
            <Smile className="group-hover:text-primary" />
            {openEmojiPanel && (
              <div className="absolute bottom-10">
                <EmojiPicker
                  theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                  onEmojiClick={(emoji: EmojiClickData) => {
                    setUserInput((prev) => prev + emoji.emoji);
                  }}
                />
              </div>
            )}
          </div>
          <AutosizeTextarea
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
        </div>
        {userInput.length > 160 && (
          <div className="absolute right-2 bottom-2 text-xs text-muted-foreground bg-accent p-1 rounded-md">
            <p>{userInput.length}/200</p>
          </div>
        )}
      </div>
      <div className="bg-background rounded-full">
        <button
          onClick={handleSendMessage}
          disabled={!userInput || isLoading}
          className="size-[3rem] aspect-square bg-primary disabled:bg-primary/70 rounded-full flex items-center justify-center"
        >
          {!isLoading ? (
            <SendHorizonal className="text-white size-5" />
          ) : (
            <Loader2 className="size-5 animate-spin" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
