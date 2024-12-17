import { useParams } from "react-router";

const ChatPage = () => {
  const { username } = useParams();

  return <div>{username}</div>;
};

export default ChatPage;
