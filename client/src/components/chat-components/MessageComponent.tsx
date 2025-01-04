import { formatRelativeDate } from "@/lib/relativeDate";
import { CheckCheck, Clock } from "lucide-react";

interface MessageProps {
  message: {
    content: string;
    sentAt: string;
  };
  myMessage: boolean;
  sending?: boolean;
}

const MessageComponent = ({ message, myMessage, sending }: MessageProps) => {
  return (
    <div
      className={`p-3 flex flex-col rounded-md  ${
        myMessage ? "ml-auto sm:mr-[3.9rem] bg-primary" : "bg-card mr-auto"
      } `}
    >
      <p>{message.content}</p>
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
