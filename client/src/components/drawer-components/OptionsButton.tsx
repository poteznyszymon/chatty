import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useTheme } from "../ui/theme-provider";
import { UseLayoutContext } from "@/context/LayoutContext";
import useLogout from "@/hooks/auth/useLogout";

const OptionsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const { setIsProfileSettingsOpen } = UseLayoutContext();
  const { logoutUser, isLoading } = useLogout();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
          <TooltipTrigger>
            <DropdownMenuTrigger asChild>
              <div className="hover:bg-secondary p-2 rounded-full text-muted-foreground cursor-pointer">
                <Menu />
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Theme</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className={`${theme === "dark" ? "bg-secondary" : ""}`}
                  onClick={() => setTheme("dark")}
                >
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`${theme === "light" ? "bg-secondary" : ""}`}
                  onClick={() => setTheme("light")}
                >
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`${theme === "system" ? "bg-secondary" : ""}`}
                  onClick={() => setTheme("system")}
                >
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setIsProfileSettingsOpen(true)}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="group" onClick={() => logoutUser()}>
                <p className="text-red-500 group-hover:underline">Logout</p>
              </DropdownMenuItem>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-muted-foreground">
              Chatyy 1.0
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <TooltipContent>
          <p>Open menu</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default OptionsButton;
