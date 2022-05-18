import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { WelcomePage } from "./components/WelcomePage";
import "./App.css";
import { Info } from "./controllers/info";
import { useEffect, useContext, useState, createContext } from "react";
import { SearchResult } from "./components/SearchResult";


export const mainProvider = createContext();
function App() {
  
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await Info.isUserLogin(navigate);
    })();
  }, []);
  return (
    <Routes>
      <Route path={`/homepage/:user_id/`} element={<Homepage />} />
      <Route path="/" element={<WelcomePage />} />
      <Route
        path="/searchResult/:user_id/:userName"
        element={<SearchResult />}
      />
    </Routes>
  );
}

export default App;
