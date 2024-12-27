import { useContext, useState } from "react";
import { createContext } from "react";

interface LayoutContextType {
  isProfileSettingsOpen: boolean;
  isUserInfoOpen: boolean;
  isEditProfileOpen: boolean;
  setIsProfileSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUserInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [isUserInfoOpen, setIsUserInfoOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        isProfileSettingsOpen,
        setIsProfileSettingsOpen,
        isUserInfoOpen,
        setIsUserInfoOpen,
        isEditProfileOpen,
        setIsEditProfileOpen,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const UseLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error(
      "useSettingsPage must be used within a SettingsPageProvider"
    );
  }
  return context;
};
