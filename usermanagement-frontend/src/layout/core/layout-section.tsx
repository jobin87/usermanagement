import type { Theme, SxProps, CSSObject } from "@mui/material/styles";

import Box from "@mui/material/Box";
import GlobalStyles from "@mui/material/GlobalStyles";

export type LayoutSectionProps = {
  sx?: SxProps<Theme>;
  cssVars?: CSSObject;
  children?: React.ReactNode;
  headerSection?: React.ReactNode;
};

export function LayoutSection({
  sx,
  cssVars,
  children,
  headerSection,
}: LayoutSectionProps) {
  return (
    <Box >
      <GlobalStyles
        styles={{
          html: { margin: 0, padding: 0, boxSizing: "border-box" },
          body: { margin: 0, padding: 0, boxSizing: "border-box" },
          "#root": { margin: 0, padding: 0 },
          "*": { boxSizing: "inherit" },
          "--layout-header-zIndex": 1100,
          "--layout-header-mobile-height": "64px",
          "--layout-header-desktop-height": "72px",
          ...cssVars,
        }}
      />

      <>
        {headerSection}
        {children}
      </>
    </Box>
  );
}
