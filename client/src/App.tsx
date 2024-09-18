import React, { useState, createContext, useMemo, ReactNode } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ThreeDScene from './components/ThreeDScene';
import Menu from './components/Menu';

interface ColorModeContextType {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({ toggleColorMode: () => {} });

const App: React.FC = () => {
  const [width, setWidth] = useState<number>(1);
  const [height, setHeight] = useState<number>(1);
  const [depth, setDepth] = useState<number>(1);

  const [mode, setMode] = useState<'light' | 'dark'>('dark'); 
  const colorMode = useMemo<ColorModeContextType>(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#2F2F2F', 
                },
                text: {
                  primary: '#ffffff', 
                },
              }
            : {
                background: {
                  default: '#ffffff', 
                },
              }),
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                '& label': {
                  color: mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: mode === 'dark' ? '#ffffff' : '#000000',
                  },
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App" style={{ display: 'flex', height: '100vh' }}>
          <div style={{ width: '20%', backgroundColor: theme.palette.background.default }}>
            <Menu setWidth={setWidth} setHeight={setHeight} setDepth={setDepth} />
          </div>
          <div style={{ width: '80%' }}>
            <ThreeDScene width={width} height={height} depth={depth} isDarkMode={mode === 'dark'} />
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;

