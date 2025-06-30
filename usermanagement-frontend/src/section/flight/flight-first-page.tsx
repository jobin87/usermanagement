import { Box, List, Typography } from "@mui/material";

export const FlightFirstPage = () => {
  const items = [
    "My Booking",
    "Tour And Attraction",
    "KWD/ARABIC",
    "Login/Signup",
  ];
  return (
    <Box
      id="parentbox"
      sx={{
        width: "100%",
        height: {
          xs: "100px",
          md: "100px",
        },
        m: 0,
        display: "flex",
        justifyContent: "space-between",
        flexDirection: {
          xs: "row",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          width: { xs: "37%", md: "60%" },
          height: { xs: 60, md: 80 },
          display:"flex" ,
          justifyContent:{
            xs:"flex-start",
            md:"flex-start"
          },
          ml:{
            xs:0,
            md:6
          }
        }}
      >
        <Box
          sx={{
            width: {
              xs: "10%",
              md: "auto",
            },
          }}
        >
          <Box
            component="img"
            src="/logos/flightlogo.svg"
            alt="Logo"
            sx={{
              height: {
                xs: 60,
                md: 80,
              },
            }}
          />
        </Box>
      </Box>
      <Box
        id="secondbox"
       
         sx={{
          width: { xs: "auto", md: "60%" },
          height: { xs: 60, md: 80 },
          display:"flex" ,
          justifyContent:{
            xs:"flex-start",
            md:"flex-start"
          },
          ml:{
            xs:0,
            md:6
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection:"row",
 
            fontSize: { xs: 0.7, md: 16 },
            gap: {
              xs: 1,
              md: 2,
            },
            mr: {
              xs: 0,
              md: 3,
            },
            width: {
              xs: "70%",
              md: "100%",
            },
            ml: 1,
          }}
        >
          {items.map((text, index) => (
            <Box key={text} display="flex" alignItems="center">
              {/* ✅ Dot before all items except the last one */}
              {index !== items.length && (
                <Box
                  sx={{
                    mr: {
                      xs: 1,
                      md: 1,
                    },
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    alignSelf: "center",
                  }}
                />
              )}
              <Typography
                variant="body2"
                sx={{
                  fontSize: { xs: 7, md: 14 },
                  fontWeight: 500, // Make it slightly bolder
                  letterSpacing: 0.2, // Increase spacing slightly for clarity
                  color: "black", // Or any high-contrast color depending on background
                  textShadow: "black", // Optional for light text on dark bg
                }}
              >
                {text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
