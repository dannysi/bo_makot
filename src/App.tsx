import './App.scss';
import {  createTheme,  ThemeProvider } from '@material-ui/core';
import UsernameForm from './UsernameForm'
import store from './Store'
import { observer } from 'mobx-react';
function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 
  const theme =
      createTheme({
        palette: {
          type: 'dark'
        },
  })
  
  const page = store.userName? "Chat Page HERE" : <UsernameForm/>
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          {page}
        </ThemeProvider>

      </header>
    </div>
  );
}

export default observer(App);
