import { formatRelativeDate } from "@/lib/relativeDate";
import { CheckCheck, Clock } from "lucide-react";
import ImageInfo from "../shared/ImageInfo";
import { useState } from "react";

interface MessageProps {
  message: {
    content: string;
    sentAt: string;
    image?: string;
  };
  myMessage: boolean;
  sending?: boolean;
}

const MessageComponent = ({ message, myMessage, sending }: MessageProps) => {
  const [showImageInfo, setShowImageInfo] = useState(false);

  return (
    <div
      className={`p-3 flex flex-col max-w-[15rem] lg:max-w-[17rem] xl:max-w-[20rem] rounded-md border ${
        myMessage
          ? "ml-auto sm:mr-[3.9rem] bg-primary text-white"
          : "bg-card mr-auto"
      } `}
    >
      <p>{message.content}</p>
      {message.image && (
        <div
          onClick={() => setShowImageInfo(true)}
          className="rounded-md overflow-hidden w-[13rem] h-[9rem] lg:w-[15rem] lg:h-[11rem] xl:w-[18rem] xl:h-[14rem] my-3 cursor-pointer"
        >
          <img src={message.image} className="w-full h-full"></img>
        </div>
      )}
      <div className="flex items-center gap-1">
        <p className={`text-xs  ${myMessage ? " " : "text-muted-foreground"}`}>
          {formatRelativeDate(new Date(message.sentAt))}
        </p>
        {!sending ? (
          <CheckCheck className="size-3 " />
        ) : (
          <Clock className="size-3 " />
        )}
      </div>
      <ImageInfo
        imageUrl={message.image ?? ""}
        showImageInfo={showImageInfo}
        setShowImageInfo={setShowImageInfo}
      />
    </div>
  );
};

export default MessageComponent;
