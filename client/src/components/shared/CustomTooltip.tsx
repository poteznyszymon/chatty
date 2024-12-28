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
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className={classname}>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomTooltip;
