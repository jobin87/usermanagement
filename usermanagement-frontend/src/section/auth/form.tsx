import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Card,
  MenuItem,
  Stack,
  Typography
} from "@mui/material";

import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Field, Form } from "src/components/hook-form";
import { useFormContextData } from "src/context/form-context";
import { indianStates } from "src/mockdata/_map/states";
import { paths } from "src/routes/paths";

export type FormSchemaType = zod.infer<typeof FormSchema>;

export const FormSchema = zod.object({
  Name: zod
    .string()
    .min(1, { message: "Name is required!" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name must not contain special characters (except spaces).",
    }),
  State: zod.string().min(1, { message: "state is required!" }),
  Age: zod.preprocess(
    (val) => {
      const parsed = Number(val);
      return isNaN(parsed) ? undefined : parsed;
    },
    zod
      .number()
      .min(1, { message: "Age is required and must be greater than 0" }),
  ) as zod.ZodEffects<zod.ZodNumber, number>,
  Gender: zod.string().min(1, { message: "Gender is required!" }),
});

export function FormView() {
  const navigate = useNavigate();
  const { addForm } = useFormContextData();

  const defaultValues = {
    Name: "",
    Age: 0, // stored as number but we'll show "" in UI if 0
    Gender: "",
    State: "",
  };

  // ✅ You missed this
  const methods = useForm<FormSchemaType>({
    mode: "onSubmit",
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = methods;

  const onSubmit = handleSubmit((data) => {
    const parsedData = {
      ...data,
      Age: Number(data.Age),
      Gender: data.Gender,
      State: data.State,
      Name: data.Name,
    };
    addForm(parsedData); // Add form to context
    navigate(paths.dashboard.FormList);
    toast.success("Form submitted successfully!");
    console.log(parsedData);
    methods.reset(); // Optionally reset form after submission
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          minWidth: 400,
          borderRadius: 3,
          boxSizing: "border-box",
          p: 2,
        }}
        // elevation={0}
      >
        <Box>
          <Typography variant="h6" textAlign={"center"}>
            Register User
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ my: 1, mx: "auto", display: "block" }}
            textAlign={"center"}
          >
            Please enter your details
          </Typography>

          <Box display="grid" rowGap={1} sx={{ px: 2, py: 2 }}>
            {/* Name */}
            <Stack
              direction="column"
              alignItems="flex-start"
              justifyContent={"flex-start"}
              spacing={1}
            >
              <Typography variant="subtitle2" sx={{ minWidth: 50 }}>
                Name
              </Typography>
              <Field.Text name="Name" label="" size="small" fullWidth />
            </Stack>

            {/* Age */}
            <Stack
              direction="column"
              alignItems="flex-start"
              justifyContent={"flex-start"}
              spacing={1}
            >
              <Typography variant="subtitle2" sx={{ minWidth: 50 }}>
                Age
              </Typography>
              <Field.Text
                name="Age"
                label=""
                fullWidth
                size="small"
                type="number"
              />
            </Stack>

            {/* State */}
            <Stack direction="column" alignItems="flex-start" spacing={1}>
              <Typography variant="subtitle2" sx={{ minWidth: 50 }}>
                State
              </Typography>
              <Field.Select
                name="State"
                label=""
                size="small"
                fullWidth
                defaultValue={"kerala"}
                sx={{ maxWidth: { sm: 400 } }}
              >
                <MenuItem value="">Select your state</MenuItem>
                {indianStates.map((state) => (
                  <MenuItem key={state.value} value={state.label}>{state.value}</MenuItem>
                ))}
              </Field.Select>
            </Stack>

            {/* Gender */}
            <Stack
              direction={{ xs: "column" }}
              alignItems={{ sm: "flex-start" }}
              sx={{ mt: 1 }}
            >
              <Typography variant="subtitle2" sx={{ minWidth: { sm: 50 } }}>
                Gender
              </Typography>
              <Field.RadioGroup
                name="Gender"
                label=""
                slotProps={{
                  radio: {
                    size: "small",
                    sx: {
                      transform: "scale(0.7)",
                      "& svg": {
                        fontSize: 18,
                      },
                    },
                  },
                }}
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

          <Stack alignItems="center" sx={{ px: 2 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              Register
            </LoadingButton>
          </Stack>
        </Box>
      </Card>
    </Form>
  );
}
