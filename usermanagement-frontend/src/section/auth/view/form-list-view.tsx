import { Box } from "@mui/material";
import { FormListPage } from "../form-list";

export function FormListPageView() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <FormListPage />
    </Box>
  );
}
