import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_momo.png";

function NavBar() {
    return (
      <div>
            <Link to="/">
            <img src={logo} alt={logo}></img>
            </Link>
            <Link to="/">Page d'accueil</Link>
            <Link to="/PagesInformatives">Pages Informatives</Link>
            <Link to="/Stages/AjouterStage">Ajouter Stage</Link>
            <Link to="/Stages">Stages Disponibles</Link>
            <Link to="/Etudiants/AjouterEtudiant">Ajouter Etudiant</Link>
            <Link to="/Etudiants">Étudiants</Link>
      </div>
    );
  }
  
  export default NavBar;