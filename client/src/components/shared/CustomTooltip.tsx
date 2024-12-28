import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface CustomTooltipProps {
  text: string;
  children: React.ReactNode;
  classname?: string;
}

const CustomTooltip = ({ text, children, classname }: CustomTooltipProps) => {
  return (
    ///test
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={classname}>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
