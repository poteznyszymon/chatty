import { useContext, useState } from "react";
import { createContext } from "react";

interface SettingsPageContextType {
  isProfileSettingsOpen: boolean;
  setIsProfileSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsPageContext = createContext<SettingsPageContextType | undefined>(
  undefined
);

export const SettingsPageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);

  return (
    <SettingsPageContext.Provider
      value={{ isProfileSettingsOpen, setIsProfileSettingsOpen }}
    >
      {children}
    </SettingsPageContext.Provider>
  );
};

export const UseSettingsPage = () => {
  const context = useContext(SettingsPageContext);
  if (!context) {
    throw new Error(
      "useSettingsPage must be used within a SettingsPageProvider"
    );
  }
  return context;
};
