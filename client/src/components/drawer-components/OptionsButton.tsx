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
import { Clock, LogOut, Mail, Menu, Palette, User } from "lucide-react";
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
  const { setIsProfileSettingsOpen, setIsInvitationsOpen, setIsPendingsOpen } = UseLayoutContext();
  const { logoutUser } = useLogout();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
          <TooltipTrigger>
            <DropdownMenuTrigger asChild>
              <div className="hover:bg-accent p-2 rounded-full text-muted-foreground cursor-pointer">
                <Menu />
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette />
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
                <User />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsInvitationsOpen(true)}>
                <Mail />
                Invitations
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsPendingsOpen(true)}>
                <Clock />
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem className="group "  onClick={() => logoutUser()}>
                <LogOut className="text-red-500 group-hover:underline"/>
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
