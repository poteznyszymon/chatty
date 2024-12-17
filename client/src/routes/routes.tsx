import RootLayout from "@/pages/root/RootLayout";
import HomePage from "@/pages/root/HomePage";

import { BrowserRouter, Routes, Route } from "react-router";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import PublicRoutes from "./PublicRoutes";
import AuthLayout from "@/pages/auth/AuthLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ChatPage from "@/pages/root/ChatPage";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthenticatedRoutes />}>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path=":username" element={<ChatPage />} />
          </Route>
        </Route>
        <Route element={<PublicRoutes />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
