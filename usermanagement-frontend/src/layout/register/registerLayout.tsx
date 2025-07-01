import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LayoutSection } from "../core/layout-section";
import Header from "../core/header-section";
import { Main } from "../dashboard/main";

interface MainLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutSection headerSection={<Header/>}>
          <Main>{children}</Main>
        </LayoutSection>
  );
};

export default AuthLayout;
