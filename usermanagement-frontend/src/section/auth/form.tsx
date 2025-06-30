import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Card,
  Stack,
  Typography,
  MenuItem,
  Dialog,
} from "@mui/material";

import { useState } from "react";
import { Field, Form } from "src/components/hook-form";
import { useAppDispatch } from "src/store";
import { useRouter } from "src/routes/hooks";

export type FormSchemaType = zod.infer<typeof FormSchema>;

export const FormSchema = zod.object({
  Name: zod.string().min(1, { message: "Name is required!" }),
  State: zod
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email must be a valid email address!" }),
  Age: zod.string().min(1, { message: "Age is required!" }),
  Gender: zod.string().min(1, { message: "Gender is required!" }),
});

export function FormView() {
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const defaultValues = {
    Name: "",
    Age: "",
    Gender: "",
    State: "",
  };

  const methods = useForm<FormSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async () => {
    const formData = methods.getValues();
    // Submit logic here
  });

  const handleResendVerification = async () => {
    // Handle resend logic here
  };

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Card
          sx={{
            width: 229,
            maxWidth: 1100,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "red",
            p:{
              xs:2,
              md:14
            }
          }}
        >
         <Box>
           <Typography variant="h5" gutterBottom>
            Register User
          </Typography>

          <Box mt={3} display="grid" rowGap={3}>
            {/* Name */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              spacing={1}
            >
              <Typography sx={{ minWidth: { sm: 80 } }}>Name</Typography>
              <Field.Text
                name="Name"
                label=""
                fullWidth
                sx={{ maxWidth: { sm: 400 } }}
              />
            </Stack>

            {/* Age */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              spacing={1}
            >
              <Typography sx={{ minWidth: { sm: 80 } }}>Age</Typography>
              <Field.Text
                name="Age"
                label=""
                fullWidth
                sx={{ maxWidth: { sm: 200 } }}
              />
            </Stack>

            {/* State */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              spacing={1}
            >
              <Typography sx={{ minWidth: { sm: 80 } }}>State</Typography>
              <Field.Select
                name="State"
                label=""
                fullWidth
                sx={{ maxWidth: { sm: 400 } }}
              >
                <MenuItem value="">Select your state</MenuItem>
                <MenuItem value="kerala">Kerala</MenuItem>
                <MenuItem value="tamil-nadu">Tamil Nadu</MenuItem>
                <MenuItem value="karnataka">Karnataka</MenuItem>
              </Field.Select>
            </Stack>

            {/* Gender */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ sm: "center" }}
              spacing={1}
            >
              <Typography sx={{ minWidth: { sm: 80 } }}>Gender</Typography>
              <Field.RadioGroup
                name="Gender"
                label=""
                row
                options={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                  { label: "Other", value: "Other" },
                ]}
                sx={{ maxWidth: { sm: 400 } }}
              />
            </Stack>
          </Box>

          <Stack alignItems="center" sx={{ mt: 4 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ py: 1.5, width: 200 }}
            >
              Register
            </LoadingButton>
          </Stack>

         </Box>
        </Card>
      </Form>

      <Dialog open={isSignUpSuccess}>
        <Box px={3} pt={2} pb={2.5}>
          <Stack spacing={2}>
            <Typography variant="h4">Registration Successful</Typography>
            <Typography variant="body1">
              A verification email has been sent to your email address. Please
              verify to continue.
            </Typography>
            <LoadingButton
              variant="outlined"
              onClick={handleResendVerification}
              loading={false}
            >
              Resend Verification Email
            </LoadingButton>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}
