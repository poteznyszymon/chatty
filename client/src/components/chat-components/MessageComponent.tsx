import { formatRelativeDate } from "@/lib/relativeDate";
import { CheckCheck, Clock } from "lucide-react";

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
  return (
    <div
      className={`p-3 flex flex-col max-w-[15rem] lg:max-w-[20rem] rounded-md border ${
        myMessage
          ? "ml-auto sm:mr-[3.9rem] bg-primary text-white"
          : "bg-card mr-auto"
      } `}
    >
      <p>{message.content}</p>
      {message.image && (
        <img src={message.image} className="max-h-[13rem] py-3"></img>
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
    </div>
  );
};

export default MessageComponent;
