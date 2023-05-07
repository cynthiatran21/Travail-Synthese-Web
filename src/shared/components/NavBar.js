import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
      <div>
            <Link to="/">Page d'accueil</Link>
            <Link to="/PagesInformatives">Pages Informatives</Link>
            <Link to="/Stages/AjouterStage">Ajouter Stage</Link>
      </div>
    );
  }
  
  export default NavBar;
  