import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Thankyou from "./components/thankyou/Thankyou";
import { initGA, logPageView } from "./analytics";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView();
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/success" element={<Thankyou />} />
    </Routes>
  );
}

export default App;
