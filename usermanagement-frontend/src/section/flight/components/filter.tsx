// LeftFilterSidebar.tsx
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface LeftFilterSidebarProps {
  rangekwd: number[];
  setRangekwd: (value: [number, number]) => void;
  setSliderTouched: (value: boolean) => void;
  refundType: string | null;
  setRefundType: (value: string | null) => void;
}
export const LeftFilterSidebar = ({
  rangekwd,
  setRangekwd,
  setSliderTouched,
  refundType,
  setRefundType
}: LeftFilterSidebarProps) => {
  const handlePriceChange = (event: Event, value: number | number[]) => {
    setSliderTouched(true);
    setRangekwd(value as [number, number]);
  };

  const [rangehr, setRangehr] = useState<number[]>([105, 1800]);
  const [returnrangehr, setReturnRangehr] = useState<number[]>([105, 1800]);

  const handleChangeTime = (event: Event, newValue: number | number[]) => {
    setRangehr(newValue as number[]);
  };
  const handleChangeReturnTime = (
    event: Event,
    newValue: number | number[]
  ) => {
    setReturnRangehr(newValue as number[]);
  };

  const stopOptions = [
    { label: "NonStop", icon: "/icons/nonstop.svg" },
    { label: "1 Stop", icon: "/icons/1stop.svg" },
    { label: "1 + Stop", icon: "/icons/multistop.svg" },
  ];
  const [selectedStops, setSelectedStops] = useState<string[]>([]);

  const handleToggleStop = (label: string) => {
    setSelectedStops((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  return (
    <Box
      sx={{
        height: {
          xs: "100vh",
          md: "100vh",
        },
        width: {
          xs: "100%",
          md: "100%",
        },
        ml: {
          xs: 1,
          md: 5.3,
        },
        p: 1,
      }}
    >
      <Box
        sx={{
          height: {
            xs: "57vh",
            md: "100vh",
            overflowX: "hidden",
          },
          mb: 4,
          ml: 1.3,

          maxHeight: { xs: "calc(100vh - 140px)", md: "auto" },
          overflowY: "scroll",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Price
          </Typography>
          <Typography
            variant="body2"
            sx={{
              mt: 1,
              fontSize: {
                xs: "10px",
                md: "12px",
              },
            }}
          >
            {`KWD ${rangekwd[0]} — KWD ${rangekwd[1]}`}
          </Typography>
          <Slider
            value={rangekwd}
            valueLabelDisplay="auto"
            onChange={handlePriceChange}
            min={85.436}
            max={247.61}
            step={10}
            sx={{ width: "90%", mt: 3, ml: 1 }}
            size="small"
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            mb={1}
            sx={{
              fontSize: {
                xs: "10px",
                md: "12px",
              },
            }}
          >
            Fare Type
          </Typography>
          <FormControlLabel
  control={
    <Checkbox
      size="small"
      checked={refundType === "Refundable"}
      onChange={(e) =>
        setRefundType(e.target.checked ? "Refundable" : null)
      }
    />
  }
  label={
    <Typography
      sx={{
        fontSize: {
          xs: "7.5px",
          md: "12px",
        },
      }}
      variant="body2"
    >
      Refundable
    </Typography>
  }
/>

        </Box>
        <Divider />
        <Box sx={{ my: 2 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{
              fontSize: {
                xs: "10px",
                md: "12px",
              },
            }}
          >
            Duration
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "10px",
                md: "12px",
              },
            }}
            variant="caption"
          >
            onward
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              mt: 1,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              1 hr
            </Typography>
            <Typography variant="caption" color="text.secondary">
              1 Day
            </Typography>
          </Box>
          <Slider
            value={rangehr}
            onChange={handleChangeTime}
            valueLabelDisplay="auto"
            min={105}
            max={1800}
            step={10}
            sx={{ width: "90%", mt: 1, ml: 1 }}
            size="small"
          />
          <Typography variant="caption">return</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "90%",
              mt: 1,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              1 hr
            </Typography>
            <Typography variant="caption" color="text.secondary">
              1 Day
            </Typography>
          </Box>
          <Slider
            value={returnrangehr}
            onChange={handleChangeReturnTime}
            valueLabelDisplay="auto"
            min={105}
            max={1800}
            step={10}
            sx={{ width: "90%", mt: 1, ml: 1, mr: 6 }}
            size="small"
          />
        </Box>
        <Divider />
        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: "10px",
                md: "12px",
              },
            }}
            variant="h6"
            fontWeight={600}
            mb={1}
          >
            Stops
          </Typography>

          {["from Dubai", "from Kuwait"].map((fromText) => (
            <Box key={fromText} mb={3}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {fromText}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                {stopOptions.map((option: any) => (
                  <Paper
                    key={option.label}
                    elevation={1}
                    sx={{
                      textAlign: "center",
                      cursor: "pointer",
                      width: {
                        xs: "20%",
                        md: "20%",
                      },
                      height: {
                        xs: "30px",
                        md: "50px",
                      },
                      borderRadius: 1,
                      mb: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src={option.icon}
                      alt={option.label}
                      sx={{
                        width: {
                          xs: "100%",
                          md: "100%",
                        },
                        height: {
                          xs: "100%",
                          md: "100%",
                        },
                        objectFit: "contain",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "10px",
                          md: "12px",
                        },
                      }}
                      variant="caption"
                    >
                      {option.label}
                    </Typography>
                  </Paper>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            sx={{ mb: 0.5, mt: 2 }} // smaller margin below
          >
            Airlines
          </Typography>

          <FormControlLabel
            control={<Checkbox size="small" />}
            label={
              <Typography
                sx={{ fontSize: { xs: "10px", md: "12px" } }}
                variant="body2"
              >
                Hahn Air Businessline
              </Typography>
            }
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label={
              <Typography
                sx={{ fontSize: { xs: "10px", md: "12px" } }}
                variant="body2"
              >
                Qatar Airways
              </Typography>
            }
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label={
              <Typography
                sx={{ fontSize: { xs: "10px", md: "12px" } }}
                variant="body2"
              >
                Emirates Airlines
              </Typography>
            }
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label={
              <Typography
                sx={{ fontSize: { xs: "10px", md: "12px" } }}
                variant="body2"
              >
                Gulf Air Company
              </Typography>
            }
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label={
              <Typography
                sx={{ fontSize: { xs: "10px", md: "12px" } }}
                variant="body2"
              >
                Royal Jordanian
              </Typography>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
