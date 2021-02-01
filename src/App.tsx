import React from 'react';
import GlobalStyle from "./styles/global"
import AppProvider from "./hooks/index"
import Routes from "./routes/index"
import {BrowserRouter} from "react-router-dom"


const App:React.FC = ()=>(
  <BrowserRouter>
    <GlobalStyle></GlobalStyle>
    <AppProvider >
      
        <Routes></Routes>
      
    </AppProvider>
  </BrowserRouter>  
)

export default App;
