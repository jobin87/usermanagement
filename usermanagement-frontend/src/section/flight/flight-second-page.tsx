import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { cities } from "src/mockdata/_map/cities";
import { countries } from "src/mockdata/_map/countries";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  setFlightSearched,
  setSearchParams,
} from "src/store/flight/flightReducer";
import { LoadingButton } from "@mui/lab";
import { useBoolean } from "src/hooks/use-boolean";
import { getSearchFlights } from "src/store/flight/flightThunk";

export const FlightSecondPage = () => {
  const [directOnly, setDirectOnly] = useState(false);
  const [travelClass, setTravelClass] = useState("1 Traveller, Economy");
  const [departureCity, setDepartureCity] = useState<string | null>(null);
  const [arrivalCity, setArrivalCity] = useState<string | null>(null);

  const [departureDate, setDepartureDate] = useState<string | null>(null);
  const [arrivalDate, setArrivalDate] = useState<string | null>(null);

  const cityOptions = cities.map((c) => c.city);
  const countryOptions = countries.map((c) => c.name);
  const combinedOptions = [...cityOptions, ...countryOptions];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { flightSearchPage } = useAppSelector((state) => state.flight);

  const handleSearch = () => {
    console.log({
      departureCity,
      arrivalCity,
      departureDate,
      arrivalDate,
    });

    if (
      !departureCity?.trim() ||
      !arrivalCity?.trim() ||
      !departureDate?.trim() ||
      !arrivalDate?.trim()
    ) {
      alert("Please select both departure and arrival cities and dates");
      return;
    }

    const params = { departureCity, arrivalCity, departureDate, arrivalDate };
    dispatch(getSearchFlights(params));
    dispatch(setFlightSearched(true));
    dispatch(setSearchParams(params));
  };

  return (
    <Box
      sx={{
        bgcolor: "#2e8bc0",
        width: "100%",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        height: {
          xs: "70%",
          md: "100%",
        },
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          height: {
            xs: "100%",
            md: "100%",
          },
          width: {
            xs: "100%",
            md: "100%",
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            gap: 0.5,
            width: "60%",
            overflowX: "hidden",
            ml: {
              xs: 0,
              md: 4,
            },
            mt: {
              xs: 0.3,
              md: 2.4,
            },
            mb: {
              xs: 1,
              md: 0,
            },
          }}
        >
          {["One Way", "Round Trip", "Multi City"].map((type) => (
            <Button
              key={type}
              variant={type === "Round Trip" ? "contained" : "outlined"}
              onClick={() => {}}
              sx={{
                textTransform: "none",
                bgcolor: type === "Round Trip" ? "#fff" : "transparent",
                color: type === "Round Trip" ? "#2e8bc0" : "#fff",
                borderColor: "#fff",
                fontSize: {
                  xs: "0.4rem",
                  sm: "0.6rem",
                },
              }}
            >
              {type}
            </Button>
          ))}
        </Box>

        {/* Flight Form Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "center",
            width: {
              xs: "100%",
              md: "100%",
            },
            gap: {
              xs: 0,
              md: 1,
            },
            mt: {
              xs: 0,
              md: 1.5,
            },

            pl: {
              xs: 1,
              md: 4,
            },
            pr: {
              xs: 1,
              md: 4,
            },
            mb: {
              xs: 0,
              md: 5,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexdirection: {
                xs: "column",
                md: "row",
              },
              gap: 1,
              width: {
                xs: "100%",
                md: "100%",
              },
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(event, newValue) => setDepartureCity(newValue)}
              options={combinedOptions}
              size="small"
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="From"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoffIcon sx={{ color: "#2e8bc0" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ bgcolor: "white", fontSize: "4px", width: "100%" }}
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              onChange={(event, newValue) => setArrivalCity(newValue)}
              options={combinedOptions}
              size="small"
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="To"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon sx={{ color: "#2e8bc0" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ bgcolor: "white" }}
                />
              )}
            />
          </Box>

          {/* To */}

          <Box
            sx={{
              display: "flex",
              flexdirection: {
                xs: "column",
                md: "row",
              },
              gap: 1,
              mt:{
                xs:1,
                md:0
              }
            }}
          >
            {/* Departure Date */}
            <TextField
              type="date"
              size="small"
              sx={{ width: "60%", bgcolor: "white" }}
              value={departureDate || ""}
              onChange={(event) => setDepartureDate(event.target.value)}
            />
            {/* Return Date */}
            <TextField
              type="date"
              size="small"
              sx={{ width: "60%", bgcolor: "white" }}
              value={arrivalDate || ""}
              onChange={(event) => setArrivalDate(event.target.value)}
            />
          </Box>
        </Box>
      </Box>

      {/* Right Control Panel */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: {
            xs: "100%",
            md: "50%",
          },
          mb: {
            xs: 0,
            md: 2,
          },
        }}
      >
        <Box sx={{ width: "50%" }}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={directOnly}
                onChange={(e) => setDirectOnly(e.target.checked)}
              />
            }
            label={
              <Typography variant="body2" color="white">
                Direct flights only
              </Typography>
            }
            sx={{
              ml: {
                xs: 0,
                md: 4,
              },
            }}
          />
          {/* Select Box */}
          <Select
            size="small"
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            sx={{ bgcolor: "white",mb:{
              xs:1,
              md:0
            },
          ml:{
            xs:1,
            md:0
          } }}
          >
            <MenuItem value="1 Traveller, Economy">
              1 Traveller, Economy
            </MenuItem>
            <MenuItem value="2 Travellers, Economy">
              2 Travellers, Economy
            </MenuItem>
            <MenuItem value="1 Traveller, Business">
              1 Traveller, Business
            </MenuItem>
          </Select>
        </Box>

        <Box
          sx={{
            width: {
              xs: "30%",
              md: "100%",
            },
            ml:{
              xs:0,
              md:2
            },
            mr:{
              xs:4,
              md:0
            },
            mt:{
              xs:0,
              md:4
            }
          }}
        >
          <LoadingButton
            variant="contained"
            size="medium"
            onClick={handleSearch}
          >
            Search
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};
