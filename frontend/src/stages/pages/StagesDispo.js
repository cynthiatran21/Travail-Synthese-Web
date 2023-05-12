import React, { useState, useEffect } from 'react';
import StageDispoList from "../components/StageDispoList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const StageDispo = () => {
  const {error, sendRequest, clearError } = useHttpClient();
  const [stagesDispo, setStagesDispo] = useState();

  useEffect(() => {
    const recupererStages = async () => {
      try{
        const reponseData = await sendRequest("http://localhost:5000/api/stages")
        setStagesDispo(reponseData.staagesDispo);
      } catch (err) {
        
      }
    };
    recupererStages();
  }, [sendRequest]);
  
  const [profilFiltre, setProfilFiltre] = useState("Tout");

  const handleProfilFiltre = (event) => {
    setProfilFiltre(event.target.value);
  };

  const profilsCibles =
    profilFiltre === "Tout"
      ? stagesDispo
      : stagesDispo.filter(
          (stagesDispo) => stagesDispo.profilSortie === profilFiltre
        );

    return (
          <div>
            <h1>Voici la liste des cours enseignés au cégep</h1>
            <div className="filter">
            <label>Filtrer par profil de sortie: </label>
            <select value={profilFiltre} onChange={handleProfilFiltre}>
              <option value="Tout">Tous les profils de sortie</option>
              <option value="Réseaux et sécurité">Réseaux et sécurité</option>
              <option value="Développement d'application">Développement d'application</option>
            </select>
          </div>
            {stagesDispo && <StageDispoList profilsCibles={profilsCibles} />}
          </div>
      );
    };

export default StageDispo;