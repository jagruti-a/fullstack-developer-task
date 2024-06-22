import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Search from './Search';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Search />
      </div>
    </ThemeProvider>
  );
}

export default App;
