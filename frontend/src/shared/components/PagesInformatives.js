import React from "react";
import { Link } from "react-router-dom";
import "../../styles/PagesInformatives.css"
function PagesInformatives() {
    return (
      <div className="pagesInformatives">
            <Link to="/">Page d'accueil</Link>
            <Link to="/DeroulementStagesEmp">Déroulement des stages - Employeurs</Link>
            <Link to="/ProfilsCompetences">Profils et compétences des stagiaires</Link>
            <Link to="/DeroulementStagesEtu">Déroulement des stages - Étudiants</Link>
            <Link to="/FAQ">Foire aux queston - FAQ</Link>
      </div>
    );
  }
  
  export default PagesInformatives;