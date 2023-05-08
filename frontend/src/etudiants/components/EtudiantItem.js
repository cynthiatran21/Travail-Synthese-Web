import React from 'react';

import Card from '../../shared/components/UIElements/Card';

const EtudiantItem = props => {
  return (
    <React.Fragment>
      <li>
        <Card>
          <div>
            <h2>{props.noDA}</h2>
            <h3>{props.nomEtudiant}</h3>
            <p>{props.courrielEtudiant}</p>
            <p>{props.profilSortie}</p>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default EtudiantItem;
