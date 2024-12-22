import { createContext, useState, useContext, ReactNode } from "react";

interface ActiveUsersContextType {
  activeUsers: string[];
  setActiveUsers: (users: string[]) => void;
}

let globalSetActiveUsers: ((users: string[]) => void) | null = null;

const ActiveUsersContext = createContext<ActiveUsersContextType | undefined>(
  undefined
);

export const ActiveUsersProvider = ({ children }: { children: ReactNode }) => {
  const [activeUsers, setActiveUsers] = useState<string[]>([]);

  // Zapisz setter w zmiennej globalnej
  globalSetActiveUsers = setActiveUsers;

  return (
    <ActiveUsersContext.Provider value={{ activeUsers, setActiveUsers }}>
      {children}
    </ActiveUsersContext.Provider>
  );
};

export const useActiveUsers = () => {
  const context = useContext(ActiveUsersContext);
  if (!context) {
    throw new Error(
      "useActiveUsers must be used within an ActiveUsersProvider"
    );
  }
  return context;
};

// Funkcja globalna do ustawiania activeUsers spoza komponentów
export const setActiveUsersGlobally = (users: string[]) => {
  if (!globalSetActiveUsers) {
    throw new Error(
      "setActiveUsersGlobally can only be used when ActiveUsersProvider is mounted"
    );
  }
  globalSetActiveUsers(users);
};
