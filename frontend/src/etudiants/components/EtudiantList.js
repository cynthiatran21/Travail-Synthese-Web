import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import EtudiantItem from './EtudiantItem';
import Button from '../../shared/components/FormElements/Button';

function EtudiantList ({etudiantsDispo, longueur}) {

  if (longueur === 0) {
    return (
      <div>
        <Card>
          <h2>Aucun étudiant se cherchant un stage. S'inscrire?</h2>
          <Button to="/Etudiants/AjouterEtudiant">S'inscrire</Button>
        </Card>
      </div>
    );
  }

  console.log("essai")
  console.log(etudiantsDispo);
  return (
    <ul>
      {etudiantsDispo.map((etu, index) => (
        <Card key={index}>
          <EtudiantItem
            key={etu.id}
            noDA={etu.noDA}
            nomEtudiant={etu.nomEtudiant}
            courrielEtudiant={etu.courrielEtudiant}
            profilSortie={etu.profilSortie}
        />
        </Card>
      ))}
    </ul>
  );
};

export default EtudiantList;
