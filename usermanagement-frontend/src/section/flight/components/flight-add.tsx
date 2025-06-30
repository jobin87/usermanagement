import {
  Box,
  Card,
  Stack,
  MenuItem,
  Typography,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z as zod } from "zod";
import { Form, Field } from "src/components/hook-form";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { cities } from 'src/mockdata/_map/cities';
import { countries } from 'src/mockdata/_map/countries';
import { useEffect } from "react";
import { useAppDispatch } from "src/store";
import { useNavigate } from "react-router";
import { requestAddFlights } from "src/store/flight/flightThunk";
import { Button } from "@mui/material";

const FlightSchema = zod.object({
  flightName: zod.string().min(1, { message: "Flight Name is required" }),
  flightNumber: zod.string().min(1, { message: "Flight Number is required" }),
  departureCity: zod.string().min(1, { message: "Departure City is required" }),
  arrivalCity: zod.string().min(1, { message: "Arrival City is required" }),
  departureDate: zod.string().min(1, { message: "Departure Date is required" }),
  arrivalDate: zod.string().min(1, { message: "Arrival Date is required" }),
  departureTime: zod.string().min(1, { message: "Departure Time is required" }),
  arrivalTime: zod.string().min(1, { message: "Arrival Time is required" }),
  price: zod.number().min(85.435, "Minimum price is 85.435 KWD"),

});

type FlightFormValues = zod.infer<typeof FlightSchema>;

export function AddFlightForm() {

   const dispatch = useAppDispatch();
   const navigate = useNavigate()
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
const nowTime = new Date().toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
});
const now = new Date();
const arrivalDate = new Date(now.getTime() + (1 * 60 + 45) * 60 * 1000);

// Format arrival time as HH:mm
const arrivalTime = arrivalDate.toLocaleTimeString('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
});
  const methods = useForm<FlightFormValues>({
    resolver: zodResolver(FlightSchema),
    defaultValues: {
      flightName: "",
      flightNumber: "",
      departureCity: "",
      arrivalCity: "",
      departureDate: today,
      arrivalDate: today,
      departureTime: nowTime,
      arrivalTime: arrivalTime,
      price: 0,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await dispatch(requestAddFlights(data)).unwrap();
      console.log("API Response:", response); // ✅ Debugging the full response
      if (response?.success) {
        toast.success("flight added successfully!");
        console.log("flight added successfully!");
        navigate('/home')
      }
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  });

 

  return (
<Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Add New Flight
        </Typography>

        <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={2}>
          <Field.Text name="flightName" label="Flight Name" />
          <Field.Text name="flightNumber" label="Flight Number" />
         <Field.Select name="departureCity" label="Departure City">
  {cities.map((city) => (
    <MenuItem key={city.city} value={city.city}>
      {city.city}
    </MenuItem>
  ))}
</Field.Select>

<Field.Select name="arrivalCity" label="Arrival City">
  {cities.map((city) => (
    <MenuItem key={city.city} value={city.city}>
      {city.city}
    </MenuItem>
  ))}
</Field.Select>
          <Field.Text type="date" name="departureDate" label="Departure Date" />
          <Field.Text type="date" name="arrivalDate" label="Arrival Date" />
          <Field.Text type="time" name="departureTime" label="Departure Time" />
          <Field.Text type="time" name="arrivalTime" label="Arrival Time" />
<Field.Text
  type="number"
  name="price"
  label="Price (KWD)"
  inputProps={{ min: 85.435, step: 0.001 }}
/>
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <Button
      variant="outlined"
      color="secondary"
      onClick={() => navigate("/home")}
    >
      Home
    </Button>
          
        
        </Stack>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          
           <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Add flight
          </LoadingButton>
        </Stack> 
        </Box>
      </Card>
    </Form>
  );
}
