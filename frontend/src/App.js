import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { WelcomePage } from "./components/WelcomePage";
import "./App.css";
import { Info } from "./controllers/info";
import { useEffect, useContext, useState, createContext } from "react";
import { SearchResult } from "./components/SearchResult";
import { UserProfile } from "./components/UserProfile";


export const mainProvider = createContext();
function App() {
  
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await Info.isUserLogin(navigate,true);
    })();
  }, []);
  return (
    <Routes>
      <Route path="/:userId/profile" element={<UserProfile/>}></Route>
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
