import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import StageDispoItem from './StageDispoItem';
import Button from '../../shared/components/FormElements/Button';
import "../../styles/Stages.css"

function StageDispoList ({stagesDispo, longueur}) {
  if (longueur === 0) {
    return (
      <div className="aucunStage">
          <h2>Aucun stage disponible. En ajouter un?</h2>
          <Button to="/Stages/AjouterStage">Ajouter un stage</Button>
      </div>
    );
  }

  return (
    <div className="stagesList">
      {stagesDispo.map((stage, index) => (
        <Card key={index}>
        <StageDispoItem
          key={stage.id}
          nomContact={stage.nomContact}
          courrielContact={stage.courrielContact}
          nomEntreprise={stage.nomEntreprise}
          adresseEntreprise={stage.adresseEntreprise}
          typeStage={stage.typeStage}
          nbPostesDispo={stage.nbPostesDispo}
          description={stage.description}
        />
        </Card>
      ))}
    </div>
  );
};

export default StageDispoList;
