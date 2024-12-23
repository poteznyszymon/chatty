import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import CustomRoutes from "./routes/routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActiveUsersProvider } from "./context/OnlineUsersContext.tsx";
import { SettingsPageProvider } from "./context/SettingsPageContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <SettingsPageProvider>
    <ActiveUsersProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <CustomRoutes />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </ActiveUsersProvider>
  </SettingsPageProvider>
);
