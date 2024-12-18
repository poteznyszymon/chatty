import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";

const ChatPage = () => {
  const { username } = useParams();

  return (
    <div className="w-full flex flex-col">
      <nav className="bg-card w-full h-[3rem] flex items-center px">
        <Link
          to="/"
          className="block sm:hidden hover:bg-secondary p-2 rounded-full"
        >
          <ArrowLeft className="text-muted-foreground" />
        </Link>
        <h1 className="text-lg m-auto">username: {username}</h1>
      </nav>
    </div>
  );
};

export default ChatPage;
