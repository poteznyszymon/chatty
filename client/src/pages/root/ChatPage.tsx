import { useParams } from "react-router";

const ChatPage = () => {
  const { username } = useParams();

  return (
    <div className="w-full flex flex-col">
      <nav className="bg-card w-full h-[3rem] flex items-center justify-center">
        <h1 className="text-lg">username: {username}</h1>
      </nav>
    </div>
  );
};

export default ChatPage;
