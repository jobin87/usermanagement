import { Box } from '@mui/material';
import { FormView } from '../form';

export function FormPageView() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,                 // ✅ Add safe horizontal padding for small screens
        boxSizing: 'border-box', // ✅ Prevent overflow from padding
        overflow: 'auto',        // ✅ Prevent layout-breaking overflows
      }}
    >
      <FormView />
    </Box>
  );
}
