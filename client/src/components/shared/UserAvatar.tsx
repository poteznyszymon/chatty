import { cn } from "@/lib/utils";

interface UserAvatarProps {
  className?: string;
  url?: string;
}

const UserAvatar = ({ className, url }: UserAvatarProps) => {
  return (
    <div className={cn(className, "size-12 rounded-full bg-secondary")}>
      {url && <img src={url} className="size-full object-contain" />}
    </div>
  );
};

export default UserAvatar;
