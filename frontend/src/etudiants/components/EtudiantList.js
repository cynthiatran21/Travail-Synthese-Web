import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import EtudiantItem from './EtudiantItem';
import Button from '../../shared/components/FormElements/Button';

const EtudiantList = props => {
  console.log(props);
  if (props.items.length === 0) {
    return (
      <div>
        <Card>
          <h2>Aucun étudiant se cherchant un stage. S'inscrire?</h2>
          <Button to="/Etudiants/AjouterEtudiant">S'inscrire</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul>
      {props.items.map(etu => (
        <EtudiantItem
          key={etu.id}
          noDA={etu.noDA}
          nomEtudiant={etu.nomEtudiant}
          courrielEtudiant={etu.courrielEtudiant}
          profilSortie={etu.profilSortie}
        />
      ))}
    </ul>
  );
};

export default EtudiantList;
