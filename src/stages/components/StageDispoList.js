import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import StageDispoItem from './StageDispoItem';
import Button from '../../shared/components/FormElements/Button';

const StageDispoList = props => {
  if (props.items.length === 0) {
    return (
      <div>
        <Card>
          <h2>Aucun stage disponible. En créer un?</h2>
          <Button to="/Stages/AjouterStage">Créer Stage</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul>
      {props.items.map(stage => (
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
      ))}
    </ul>
  );
};

export default StageDispoList;
