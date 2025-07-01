import { Theme } from "@emotion/react";
import { Box, Container, SxProps } from "@mui/material";


interface MainProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>; // ✅ Accept the `sx` prop
}
export const  Main: React.FC<MainProps> = ({ children, sx })=> {
  return (
    <>
      <Container maxWidth="xl" disableGutters>
        {children}
      </Container>
    </>
  );
};
