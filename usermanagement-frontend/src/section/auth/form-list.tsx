import {
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { MoreVert } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useFormContextData } from "src/context/form-context";
import { Field } from "src/components/hook-form";
import { indianStates } from "src/mockdata/_map/cities";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, FormSchemaType } from "./form";
import { FormProvider, useForm } from "react-hook-form";

export const FormListPage = () => {
  const { formList, setFormList } = useFormContextData(); // ensure `setFormList` is exposed in your context
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (editData) {
      methods.reset({
        Name: editData?.Name || "",
        Age: editData?.Age || 0,
        Gender: editData?.Gender || "",
        State: editData?.State || "",
      });
    }
  }, [editData]);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (selectedIndex !== null) {
      setEditData({ ...formList[selectedIndex] });
    }
    handleCloseMenu();
  };

  const handleDelete = () => {
    setConfirmDelete(true);
    handleCloseMenu();
  };

  const confirmDeleteAction = () => {
    if (selectedIndex !== null) {
      const updated = [...formList];
      updated.splice(selectedIndex, 1);
      setFormList(updated);
    }
    setConfirmDelete(false);
  };

  const handleEditSave = () => {
    if (selectedIndex !== null && editData) {
      const updated = [...formList];
      updated[selectedIndex] = editData;
      setFormList(updated);
    }
    setEditData(null);
  };

  if (formList.length === 0) {
    return (
      <Typography sx={{ mt: 3 }} align="center">
        No forms submitted yet.
      </Typography>
    );
  }
  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "80%",
        },
        mb: 2,
        p: {
          xs: 2,
          md: 0,
        },
      }}
    >
      <Typography sx={{ mt: 4 }} variant="h6" gutterBottom>
        Submitted Forms List
      </Typography>
      <Divider
        sx={{
          mb: {
            xs: 0,
            md: 3,
          },
        }}
      />

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>State</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formList.map((form, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{form.Name}</TableCell>
                <TableCell>{form.Age}</TableCell>
                <TableCell>{form.Gender}</TableCell>
                <TableCell>{form.State}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleOpenMenu(e, index)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog
        open={!!editData}
        onClose={() => setEditData(null)}
        maxWidth="xs"
        fullWidth
      >
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((formValues) => {
              if (selectedIndex !== null) {
                const updated = [...formList];
                updated[selectedIndex] = {
                  Name: formValues.Name,
                  Age: Number(formValues.Age),
                  Gender: formValues.Gender,
                  State: formValues.State,
                };
                setFormList(updated);
                setEditData(null);
              }
            })}
          >
            <DialogTitle>Edit Form</DialogTitle>
            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                pt: 3,
                px: 2,
              }}
            >
              <Field.Text name="Name" label="Name" fullWidth margin="normal" />
              <Field.Text name="Age" label="Age" type="number" fullWidth />
              <Field.Select name="Gender" label="Gender" fullWidth>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Field.Select>
              <Field.Select name="State" label="State" fullWidth>
                <MenuItem value="">Select your state</MenuItem>
                {indianStates.map((state) => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.label}
                  </MenuItem>
                ))}
              </Field.Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditData(null)}>Cancel</Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this form?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={confirmDeleteAction}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
