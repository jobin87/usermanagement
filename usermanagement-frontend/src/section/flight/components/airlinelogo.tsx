import { Typography } from "@mui/material";
import { Box } from "@mui/material";

export const Airlinelogo = () => {
  const logos = [
    { src: "hahnair.png", label: "Hahn Air" },
    { src: "gulfair.png", label: "Gulf Air" },
    { src: "qatar.png", label: "Qatar Airways" },
    { src: "royaljordanian.png", label: "Royal Jordanian" },
  ];
  return (
    <Box
      sx={{
        pl: {
          xs: 2,
          md: 6,
        },
        pr: {
          xs: 2,
          md: 4,
        },
        height:{
          xs:"80px",
          lg:"40px"
        },bgcolor:"red"
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor:"blue",
          height:"100%"
        }}
      >
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "flex",
            },
            justifyContent: "center",
            flexWrap: "wrap",
            gap: {
              xs: 2,
              sm: 14,
            },
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            width: {
              xs: "100%",
              md: "100%",
            },
 
            mb: 1,
          }}
        >
          {logos.map((logo) => (
            <Box
              key={logo.src}
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                component="img"
                src={`/logos/${logo.src}`}
                alt={logo.label}
                sx={{
                  height: {
                    xs: 15,
                    md: 20,
                  },
                  objectFit: "contain",
                  gap: 8,
                }}
              />
              <Typography variant="caption">{logo.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
