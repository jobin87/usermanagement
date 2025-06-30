import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<MainLayoutProps> = ({ children }) => {

  return (
    <Box
      sx={{
        minHeight: "95vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main Content */}
      <Box component="main" >
        <Container maxWidth="sm">
          {children}
        </Container>
      </Box>

    </Box>
  );
};

export default AuthLayout;