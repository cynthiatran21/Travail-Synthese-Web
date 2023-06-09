import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NavBar from "./shared/components/NavBar";
import Accueil from "./pages/Accueil";
import PagesInformatives from "./shared/components/PagesInformatives";
import DeroulementStagesEmp from "./pages/pagesInformatives/DeroulementStagesEmp";
import ProfilsCompetences from "./pages/pagesInformatives/ProfilsCompetences";
import DeroulementStagesEtu from "./pages/pagesInformatives/DeroulementStagesEtu";
import FAQ from "./pages/pagesInformatives/FAQ";
import AjouterStage from "./stages/pages/AjouterStage";
import StagesDispo from "./stages/pages/StagesDispo";
import AjouterEtudiant from "./etudiants/pages/AjouterEtudiant";
import Etudiants from "./etudiants/pages/Etudiants";
import Footer from "./shared/components/Footer";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <PagesInformatives />
      <Routes>
        <Route path="/" exact element={<Accueil />} />
        <Route
          path="/PagesInformatives"
          exact
          element={<PagesInformatives />}
        />
        <Route
          path="/DeroulementStagesEmp"
          exact
          element={<DeroulementStagesEmp />}
        />
        <Route
          path="/ProfilsCompetences"
          exact
          element={<ProfilsCompetences />}
        />
        <Route
          path="/DeroulementStagesEtu"
          exact
          element={<DeroulementStagesEtu />}
        />
        <Route path="/FAQ" exact element={<FAQ />} />
        <Route path="/Stages/AjouterStage" exact element={<AjouterStage />} />
        <Route path="/Stages" exact element={<StagesDispo />} />
        <Route
          path="/Etudiants/AjouterEtudiant"
          exact
          element={<AjouterEtudiant />}
        />
        <Route path="/Etudiants" exact element={<Etudiants />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
