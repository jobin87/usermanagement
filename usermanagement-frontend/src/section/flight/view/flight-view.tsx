import { Box } from "@mui/material";
import { FlightFirstPage } from "../flight-first-page";
import { FlightSecondPage } from "../flight-second-page";
import { FlightThirdPage } from "../flight-third-page";
import { Airlinelogo } from "../components/airlinelogo";

export const FlightPageView = () => {
  return (
    <Box
      sx={{
        height: {
          xs: "100vh",
          md: "auto", // allow scrolling on md+
        },
        overflow: {
          xs: "hidden",
          md: "visible", // allow scroll on md+
        },
      }}
    >
      {/* Header */}
      <Box sx={{ height: { xs: "60px", md: "95px" } }}>
        <FlightFirstPage />
      </Box>

      {/* Search Panel */}
      <Box >
        <FlightSecondPage />
      </Box>
 

      {/* Remaining View */}
      <Box
        sx={{
          height: {
            xs: "100vh", // 60 + 230
            md: "calc(100vh - 225px)", // 85 + 140
          },
        }}
      >
        <FlightThirdPage />
      </Box>
    </Box>
  );
};
