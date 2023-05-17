import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import EtudiantItem from "./EtudiantItem";
import Button from "../../shared/components/FormElements/Button";
import "../../styles/Etudiants.css";

function EtudiantList({ etudiantsDispo, longueur }) {
  if (longueur === 0) {
    return (
      <div className="aucunEtudiant">
        <h2>Aucun étudiant se cherchant un stage. S'inscrire?</h2>
        <Button to="/Etudiants/AjouterEtudiant">S'inscrire</Button>
      </div>
    );
  }

  return (
    <div className="etudiantsList">
      {etudiantsDispo.map((etu, index) => (
        <Card key={index}>
          <EtudiantItem
            key={etu.id}
            cle={etu._id}
            noDA={etu.noDA}
            nomEtudiant={etu.nomEtudiant}
            courrielEtudiant={etu.courrielEtudiant}
            profilSortie={etu.profilSortie}
          />
        </Card>
      ))}
    </div>
  );
}

export default EtudiantList;
