import { Check, Copy, LucideProps } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface UserInfoTileProps {
  title: string;
  subTitle: string;
  toolTipText: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

const UserInfoTile = ({
  title,
  subTitle,
  toolTipText,
  Icon,
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="w-full">
          <button className="justify-start group/email w-full">
            <div
              onClick={() => handleCopy(0, title)}
              className="flex items-center gap-10 hover:bg-accent  rounded-md p-2 px-5"
            >
              <Icon className="size-5 text-muted-foreground " />
              <div className="flex items-start flex-col">
                {title}
                <p className="text-muted-foreground text-sm">{subTitle}</p>
              </div>
              {isCopied[0] ? (
                <Check className="size-5 hidden text-muted-foreground ml-auto group-hover/email:block" />
              ) : (
                <Copy className="size-5 hidden text-muted-foreground ml-auto group-hover/email:block" />
              )}
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{toolTipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserInfoTile;
