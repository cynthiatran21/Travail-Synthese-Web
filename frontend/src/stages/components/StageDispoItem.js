import React from "react";
import "../../styles/Stages.css";

const StageDispoItem = (props) => {
  return (
    <React.Fragment>
      <div className="stageItem">
        <h1>{props.nomEntreprise}</h1>
        <p>Nom de la personne contact: {props.nomContact}</p>
        <p>Courriel de la personne contact: {props.courrielContact}</p>
        <p>Adresse de l'entreprise: {props.adresseEntreprise}</p>
        <p>Type de stage: {props.typeStage}</p>
        <p>Nombre de poste(s) disponible(s): {props.nbPostesDispo}</p>
        <p>Description: {props.description}</p>
      </div>
    </React.Fragment>
  );
};

export default StageDispoItem;
