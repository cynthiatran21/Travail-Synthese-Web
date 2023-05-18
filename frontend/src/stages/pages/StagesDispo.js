import React, { useState, useEffect } from "react";
import StageDispoList from "../components/StageDispoList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "../../styles/Stages.css";

const StagesDispo = () => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [stagesDispo, setStagesDispo] = useState([]);
  const [longueur, setLongueur] = useState(0);

  const [stagesDispoProg, setStagesDispoProg] = useState([]);
  const [stagesDispoReseau, setStagesDispoReseau] = useState([]);

  const [longueurProg, setLongueurProg] = useState(0);
  const [longueurReseau, setLongueurReseau] = useState(0);

  useEffect(() => {
    const recupererStages = async () => {
      try {
        let tabTemp = [];

        if (
          document.querySelector("#typeStage").value === "Réseaux et sécurité"
        ) {
          const reponseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + "/stages/Réseaux et sécurité"
          );

          let long = reponseData.stages.length;

          setLongueurReseau(long);
          setLongueur(longueurReseau);

          for (let i = 0; i < longueurReseau; i++) {
            tabTemp.push(reponseData.stages[i]);
          }

          setStagesDispoReseau(tabTemp);
          setStagesDispo(stagesDispoReseau);
        } else if (
          document.querySelector("#typeStage").value ===
          "Développement d'application"
        ) {
          const reponseData = await sendRequest(
            "http://localhost:5000/api/stages/Développement d'application"
          );

          let long = reponseData.stages.length;

          setLongueurProg(long);
          setLongueur(longueurProg);

          for (let i = 0; i < longueurProg; i++) {
            tabTemp.push(reponseData.stages[i]);
          }

          setStagesDispoProg(tabTemp);
          setStagesDispo(stagesDispoProg);
        }
      } catch (err) {
        console.log(err);
      }
    };
    recupererStages();
  }, [sendRequest, stagesDispo, longueur]);

  return (
    <div>
      <h1 className="labelStage">Voici la liste des stages disponibles</h1>
      <div className="filter">
        <label>Filtrer par profil de sortie: </label>
        <select id="typeStage">
          <option value="Réseaux et sécurité">Réseaux et sécurité</option>
          <option value="Développement d'application">
            Développement d'application
          </option>
        </select>
      </div>
      <StageDispoList stagesDispo={stagesDispo} longueur={longueur} />
    </div>
  );
};

export default StagesDispo;
