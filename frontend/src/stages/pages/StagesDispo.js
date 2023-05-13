import React, { useState, useEffect } from 'react';
import StageDispoList from "../components/StageDispoList";
import { useHttpClient } from "../../shared/hooks/http-hook";

const StagesDispo = () => {
  const {error, sendRequest, clearError } = useHttpClient();
  const [stagesDispo, setStagesDispo] = useState();
  const [profilFiltre, setProfilFiltre] = useState("Réseaux et sécurité");

  useEffect(() => {
    const recupererStages = async () => {
      try{
        const reponseData = await sendRequest("http://localhost:5000/api/stages/Réseaux et sécurité")
        setStagesDispo(reponseData.stages);
      } catch (err) {
        
      }
    };
    recupererStages();
  }, [sendRequest]);
  
  const handleProfilFiltre = (event) => {
    setProfilFiltre(event.target.value);
  };
  
    return (
          <div>
            <h1>Voici la liste des cours enseignés au cégep</h1>
            <div className="filter">
            <label>Filtrer par profil de sortie: </label>
            <select value={profilFiltre} onChange={handleProfilFiltre}>
              <option value="Réseaux et sécurité">Réseaux et sécurité</option>
              <option value="Développement d'application">Développement d'application</option>
            </select>
          </div>
            {stagesDispo && <StageDispoList stagesDispo={stagesDispo} />}
          </div>
      );
    };

export default StagesDispo;