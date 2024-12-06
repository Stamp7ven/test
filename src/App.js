import React from 'react';
import './App.css';
import Interface from './main/Interface';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';

function AppContent() {
  const { darkMode } = useDarkMode();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Interface />
      </div>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}
