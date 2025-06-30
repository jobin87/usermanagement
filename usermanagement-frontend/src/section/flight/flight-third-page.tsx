import {
  Box,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";
import { getAllFlights, getSearchFlights } from "src/store/flight/flightThunk";
import { LeftFilterSidebar } from "./components/filter";
import { setSearchParams } from "src/store/flight/flightReducer";

export const FlightThirdPage = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [priceRange, setPriceRange] = useState<[number, number]>([85.436, 247.61]);
  const [durationRange, setDurationRange] = useState<[number, number]>([85.436, 247.61]);
  const [returnDurationRange, setReturnDurationRange] = useState<[number, number]>([85.436, 247.61]);

  const [priceTouched, setPriceTouched] = useState(false);
  const [durationTouched, setDurationTouched] = useState(false);
  const [returnDurationTouched, setReturnDurationTouched] = useState(false);
  const [refundType, setRefundType] = useState<string | null>(null);

  const flightsPerPage = isXs ? 5 : 4;

  const {
    flightlist,
    flightSearched,
    flightSearchPage,
    loading,
  } = useAppSelector((state) => state.flight || {});

  const totalFlights = useMemo(() => {
    const rawData = flightSearched ? flightSearchPage?.data : flightlist?.data;

    if (!Array.isArray(rawData)) return [];

    let filtered = [...rawData];

    if (priceTouched) {
      filtered = filtered.filter(
        (flight: any) => flight.price >= priceRange[0] && flight.price <= priceRange[1]
      );
    }

    if (refundType) {
      filtered = filtered.filter((flight: any) => flight.refundType === refundType);
    }

    if (durationTouched) {
      filtered = filtered.filter(
        (flight: any) =>
          flight.duration >= durationRange[0] && flight.duration <= durationRange[1]
      );
    }

    if (returnDurationTouched) {
      filtered = filtered.filter(
        (flight: any) =>
          flight.returnDuration >= returnDurationRange[0] &&
          flight.returnDuration <= returnDurationRange[1]
      );
    }

    filtered.sort((a, b) => a.price - b.price);
    return filtered;
  }, [
    flightlist?.data,
    flightSearchPage?.data,
    priceRange,
    priceTouched,
    durationRange,
    durationTouched,
    returnDurationRange,
    returnDurationTouched,
    refundType,
    flightSearched,
  ]);

  const totalPages = Math.ceil(totalFlights.length / flightsPerPage);
  const paginatedFlights = totalFlights.slice(
    (currentPage - 1) * flightsPerPage,
    currentPage * flightsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    priceTouched,
    priceRange,
    durationTouched,
    durationRange,
    returnDurationTouched,
    returnDurationRange,
    refundType,
  ]);

  useEffect(() => {
    const searchData = flightSearchPage?.data;
    if (searchData?.departureCity && searchData?.arrivalCity) {
      const { departureCity, arrivalCity, departureDate, arrivalDate } = searchData;
      dispatch(getSearchFlights({ departureCity, arrivalCity, departureDate, arrivalDate }));
      dispatch(setSearchParams({ departureCity, arrivalCity }));
    } else {
      const params ={} as any;
      dispatch(getAllFlights(params));
    }
  }, [dispatch]);

  const getDuration = (
    departureDate: string,
    departureTime: string,
    arrivalDate: string,
    arrivalTime: string
  ) => {
    const departure = new Date(`${departureDate}T${departureTime}`);
    const arrival = new Date(`${arrivalDate}T${arrivalTime}`);
    const diffMs = arrival.getTime() - departure.getTime();
    const diffMins = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    return `${hours}h ${minutes}m`;
  };

  const shouldShowPagination = () => {
    return totalFlights.length > flightsPerPage;
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", mt: 1 }}>
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "auto",
        }}
      >
        <Box
          onClick={() => setSidebarOpen((prev) => !prev)}
          sx={{
            cursor: "pointer",
            borderRadius: 1,
            width: { xs: "30%", md: "20%" },
            height: { xs: "50px", md: "30px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ml: { xs: 2, md: 6 },
          }}
        >
          <Typography sx={{ fontSize: { xs: "10px", md: "12px" } }}>
            {sidebarOpen ? "▲ Hide Filters" : "▼ Show Filters"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            width: { xs: "70%", md: "60%" },
            pr: 2,
          }}
        >
          {[
            "Cheapest flight - KWD 85.435",
            "Best value KWD 85.435",
            "Shortest flight - KWD 100.792",
            "others ▼",
          ].map((text) => (
            <Typography
              key={text}
              sx={{
                border: "1px solid black",
                px: 1,
                py: 0.5,
                fontSize: { xs: "8px", md: "12px" },
                borderRadius: "5px",
              }}
            >
              {text}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Main Layout */}
      <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        {sidebarOpen && (
          <Box sx={{ width: { xs: "40%", md: "25%" } }}>
            <LeftFilterSidebar
              rangekwd={priceRange}
              setRangekwd={setPriceRange}
              setSliderTouched={(value: boolean) => setPriceTouched(value)}
              refundType={refundType}
              setRefundType={setRefundType}
            />
          </Box>
        )}

        <Box
          sx={{
            width: sidebarOpen ? { xs: "100%", md: "85%" } : "100%",
            transition: "width 0.3s ease",
            ml: sidebarOpen ? { xs: 2, md: 4 } : 0,
            mr: sidebarOpen ? { xs: 2, md: 4 } : 0,
          }}
        >
          <Box
            id="rightbox"
            sx={{
              px: { xs: 1, md: 2 },
              py: 1,
              maxHeight: { xs: "calc(100vh - 140px)", md: "auto" },
              overflowY: "scroll",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {/* Flights or Loading */}
            {loading ? (
              <Typography textAlign="center">Loading flights...</Typography>
            ) : paginatedFlights.length > 0 ? (
              paginatedFlights.map((flight: any, index: number) => {
                const duration = getDuration(
                  flight.departureDate,
                  flight.departureTime,
                  flight.arrivalDate,
                  flight.arrivalTime
                );

                return (
                  <Box
                    key={flight._id || `${flight.flightNumber}-${index}`}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: { xs: "flex-start", md: "center" },
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      bgcolor: "#fff",
                      borderRadius: 2,
                      boxShadow: 2,
                      mb: 2,
                      p: 2,
                      fontSize: { xs: "10px", md: "12px" },
                    }}
                  >
                    <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                      <Typography fontWeight="bold">{flight.flightName}</Typography>
                      <Typography>
                        {flight.departureCity} → {flight.arrivalCity}
                      </Typography>
                      <Typography>
                        {flight.departureDate} at {flight.departureTime}
                      </Typography>
                      <Typography>Duration: {duration}</Typography>
                      <Typography>Price: {flight.price} KWD</Typography>
                    </Box>

                    <Box
                      sx={{
                        width: { xs: "100%", md: "auto" },
                        display: "flex",
                        justifyContent: {
                          xs: "flex-end",
                          md: "center",
                        },
                        alignItems: "center",
                        mt: { xs: 1, md: 0 },
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: "primary.main",
                          color: "#fff",
                          px: 2,
                          py: 0.5,
                          fontSize: { xs: "10px", md: "12px" },
                          textTransform: "none",
                          borderRadius: 1,
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 50,
                  bgcolor: "#fff",
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                <Typography>No flights found</Typography>
              </Box>
            )}

            {shouldShowPagination() && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(e, page) => setCurrentPage(page)}
                  color="primary"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
