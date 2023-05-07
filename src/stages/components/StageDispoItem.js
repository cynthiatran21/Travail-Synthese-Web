import React from 'react';

import Card from '../../shared/components/UIElements/Card';

const StageDispoItem = props => {
  return (
    <React.Fragment>
      <li>
        <Card>
          <div>
            <h2>{props.nomContact}</h2>
            <h3>{props.courrielContact}</h3>
            <p>{props.nomEntreprise}</p>
            <p>{props.adresseEntreprise}</p>
            <p>{props.typeStage}</p>
            <p>{props.nbPostesDispo}</p>
            <p>{props.description}</p>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default StageDispoItem;
