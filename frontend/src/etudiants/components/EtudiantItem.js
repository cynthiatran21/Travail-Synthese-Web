import React from 'react';
import "../../styles/Etudiants.css"

const EtudiantItem = props => {
  return (
    <React.Fragment>
      <div className="etudiantItem">
      <h1>{props.nomEtudiant}</h1>
            <p>Numéro de DA: {props.noDA}</p>
            <p>Courriel: {props.courrielEtudiant}</p>
            <p>Profil de sortie: {props.profilSortie}</p>
          </div>
    </React.Fragment>
  );
};

export default EtudiantItem;
