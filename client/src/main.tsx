import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import CustomRoutes from "./routes/routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActiveUsersProvider } from "./context/OnlineUsersContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ActiveUsersProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <CustomRoutes />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </ActiveUsersProvider>
);
