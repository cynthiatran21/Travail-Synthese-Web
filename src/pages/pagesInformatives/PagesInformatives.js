import React from "react";
import { Link } from "react-router-dom";

function PagesInformatives() {
    return (
      <div>
            <Link to="/">Page d'accueil</Link>
            <Link to="/PagesInformatives/DeroulementStagesEmp">Déroulement des stages - Employeurs</Link>
            <Link to="/PagesInformatives/ProfilsCompetences">Profils et compétences des stagiaires</Link>
            <Link to="/PagesInformatives/DeroulementStagesEtu">Déroulement des stages - Étudiants</Link>
            <Link to="/PagesInformatives/FAQ">Foire aux queston - FAQ</Link>
      </div>
    );
  }
  
  export default PagesInformatives;