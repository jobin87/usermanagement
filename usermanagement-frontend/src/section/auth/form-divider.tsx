import type { SxProps, Theme } from "@mui/material/styles";

import Divider from "@mui/material/Divider";

// ----------------------------------------------------------------------

type FormDividerProps = {
  sx?: SxProps<Theme>;
  label?: React.ReactNode;
};

export function FormDivider({ sx, label = "" }: FormDividerProps) {
  return (
    <Divider
      sx={{
        my: 3,
        typography: "overline",
        color: "text.disabled",
        "&::before, :after": { borderTopStyle: "dashed" },
        ...sx,
      }}
    >
      {label}
    </Divider>
  );
}
