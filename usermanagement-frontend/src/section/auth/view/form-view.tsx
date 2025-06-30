import { Box } from '@mui/material';
import { FormView } from '../form';

export function FormPageView() {
  return (
    <Box
      sx={{
      
        bgcolor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FormView />
    </Box>
  );
}
