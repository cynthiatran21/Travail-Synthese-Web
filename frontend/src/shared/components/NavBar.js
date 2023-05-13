import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_momo.png";
import "../../styles/AjouterStage.css";
import "../../styles/NavBar.css";

function NavBar() {
    return (
      <div className="nav">
            <a href="https://www.cmontmorency.qc.ca/"><img src={logo} alt={logo}></img></a>
            <div className="nav-menu">
            <Link to="/">Page d'accueil</Link>
            <Link to="/PagesInformatives">Pages Informatives</Link>
            <Link to="/Stages/AjouterStage">Ajouter Stage</Link>
            <Link to="/Stages">Stages Disponibles</Link>
            <Link to="/Etudiants/AjouterEtudiant">Ajouter Etudiant</Link>
            <Link to="/Etudiants">Étudiants</Link>
            </div>
      </div>
    );
  }
  
  export default NavBar;