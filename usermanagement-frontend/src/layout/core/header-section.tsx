import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useTheme,
  SxProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Optional: scroll offset hook
import { useScrollOffSetTop } from "src/hooks/use-scroll-offset-top"; // make sure this exists
import { Theme } from "@emotion/react";

interface HeaderProps {
  sx?: SxProps<Theme>;

}

const Header: React.FC<HeaderProps> = ({ sx }) => {
  const theme = useTheme();
  const { offsetTop } = useScrollOffSetTop(); // returns true after scroll threshold

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };


  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: theme.zIndex.appBar,
        ...(offsetTop && {
          boxShadow: theme.shadows[9],
        }),
        ...sx,
        bgcolor:{
          xs:"#301934",
          md:"none"
        }
      }}
    >
      <Toolbar
        disableGutters
        sx={{ minHeight: { xs: 56, md: 34 }, width: "100%" }}
      >
        {/* Mobile Menu Icon */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={handleOpenNavMenu}
            color="inherit"
            
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
