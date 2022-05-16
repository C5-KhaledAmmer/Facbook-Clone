import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Homepage } from "./components/Homepage";
import { WelcomePage } from "./components/WelcomePage";
import { SuggestionsFriend } from "./components/Homepage/SuggestionsFriend";
import "./App.css";
import { Info } from "./controllers/info";
import { useEffect } from "react";
import { SearchResult } from "./components/SearchResult";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    (async ()=>{
      await Info.isUserLogin(navigate);
    })()
   
  }, []);
  return (
   
    <Routes>
      <Route path={`/homepage/:token/:user_id`} element={<Homepage />} />
      <Route path="/" element={<WelcomePage />} />
      <Route path="/searchResult/:user_id/:userName" element={<SearchResult/>}/>
    </Routes>
  );
}

export default App;
