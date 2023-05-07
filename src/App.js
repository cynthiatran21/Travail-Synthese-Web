import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./shared/components/NavBar";
import Accueil from "./pages/Accueil";
import PagesInformatives from "./pages/pagesInformatives/PagesInformatives";
import DeroulementStagesEmp from "./pages/pagesInformatives/DeroulementStagesEmp";
import ProfilsCompetences from "./pages/pagesInformatives/ProfilsCompetences";
import DeroulementStagesEtu from "./pages/pagesInformatives/DeroulementStagesEtu";
import FAQ from "./pages/pagesInformatives/FAQ";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Accueil />} />
        <Route path="/PagesInformatives" exact element={<PagesInformatives />} />
        <Route path="/PagesInformatives/DeroulementStagesEmp" exact element={<DeroulementStagesEmp />} />
        <Route path="/PagesInformatives/ProfilsCompetences" exact element={<ProfilsCompetences />} />
        <Route path="/PagesInformatives/DeroulementStagesEtu" exact element={<DeroulementStagesEtu />} />
        <Route path="/PagesInformatives/FAQ" exact element={<FAQ />} />
      </Routes>
    </Router>
  );
};

export default App;
