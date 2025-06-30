import { useFormContextData } from "src/context/form-context";
import { Box, Typography, Divider } from "@mui/material";

export const SubmittedFormList=()=> {
  const { formList } = useFormContextData();
console.log("Form List Length:", formList.length);


  if (formList.length === 0) {
    return (
      <Typography sx={{ mt: 4 }} align="center">
        No forms submitted yet.
      </Typography>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Submitted Forms
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {formList.map((form, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Typography>Name: {form.Name}</Typography>
          <Typography>Age: {form.Age}</Typography>
          <Typography>Gender: {form.Gender}</Typography>
          <Typography>State: {form.State}</Typography>
        </Box>
      ))}
    </Box>
  );
}
