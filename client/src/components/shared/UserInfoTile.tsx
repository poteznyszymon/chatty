import { Check, Copy, LucideProps } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import CustomTooltip from "./CustomTooltip";

interface UserInfoTileProps {
  title: string;
  subTitle: string;
  toolTipText: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  loading?: boolean;
}

const UserInfoTile = ({
  title,
  subTitle,
  toolTipText,
  Icon,
  loading,
}: UserInfoTileProps) => {
  const [isCopied, setIsCopied] = useState([false, false]);
  const { toast } = useToast();

  const handleCopy = async (idx: number, text: string) => {
    toast({
      description: `${subTitle} copied to clipboard`,
    });
    await navigator.clipboard.writeText(text);
    setIsCopied((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });
    setTimeout(() => {
      setIsCopied((prev) => {
        const updated = [...prev];
        updated[idx] = false;
        return updated;
      });
    }, 2000);
  };

  return (
    <CustomTooltip classname="w-full" text={toolTipText}>
      <button className="justify-start group/email w-full">
        <div
          onClick={() => handleCopy(0, title)}
          className="flex items-center gap-10 hover:bg-accent  rounded-md p-2 px-5"
        >
          <Icon className="size-5 text-muted-foreground " />
          <div className="flex items-start flex-col">
            {!loading ? (
              <p>{title}</p>
            ) : (
              <div className="w-28 rounded-md animate-pulse h-4 bg-accent " />
            )}
            {!loading ? (
              <p className="text-muted-foreground text-sm">{subTitle}</p>
            ) : (
              <div className="w-16 mt-1 rounded-md animate-pulse h-4 bg-accent " />
            )}
          </div>
          {isCopied[0] ? (
            <Check className="size-5 hidden text-muted-foreground ml-auto group-hover/email:block" />
          ) : (
            <Copy className="size-5 hidden text-muted-foreground ml-auto group-hover/email:block" />
          )}
        </div>
      </button>
    </CustomTooltip>
  );
};

export default UserInfoTile;
