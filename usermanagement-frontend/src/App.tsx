
// ----------------------------------------------------------------------

import { Router } from 'src/routes/sections';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { Toaster } from 'react-hot-toast';
import { LocalizationProvider } from './locales';
// import { ThemeProvider } from './theme/theme-provider';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <LocalizationProvider>
      <Toaster />
                <Router />
    </LocalizationProvider>
  );
}
