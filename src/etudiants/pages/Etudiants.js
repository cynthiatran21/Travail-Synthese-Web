import React from 'react';
import EtudiantList from "../components/EtudiantList";

function Etudiants(){
    return (
          <div>
            <h1>Voici la liste des étudiants qui souhaitent appliquer à un stage.</h1>
            <EtudiantList />
          </div>
      );
}

export default Etudiants;