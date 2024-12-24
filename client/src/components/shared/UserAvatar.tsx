import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
  url?: string;
  online?: boolean;
}

const UserAvatar = ({ className, url, online }: UserAvatarProps) => {
  return (
    <div
      className={cn(
        className,
        " rounded-full overflow-hidden bg-background relative"
      )}
    >
      <img
        src={url ? url : "/deafult-user.jpg"}
        className="size-full object-contain"
      />

      {online && (
        <div className="absolute size-3 bg-green-600 rounded-full bottom-0 right-0 border" />
      )}
    </div>
  );
};

export default UserAvatar;
