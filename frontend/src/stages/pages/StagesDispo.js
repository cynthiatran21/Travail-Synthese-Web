import React, { useState, useEffect } from 'react';
import StageDispoList from "../components/StageDispoList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "../../styles/Stages.css"

const StagesDispo = () => {
  const {error, sendRequest, clearError } = useHttpClient();
  const [stagesDispo, setStagesDispo] = useState([]);
  const [longueur, setLongueur] = useState([]);
  //const [profilFiltre, setProfilFiltre] = useState("Réseaux et sécurité");

  useEffect(() => {
    const recupererStages = async () => {
      try{
        let tabTemp=[];

        if(document.querySelector("#typeStage").value === "Réseaux et sécurité"){
          const reponseData = await sendRequest("http://localhost:5000/api/stages/Réseaux et sécurité")
        
          let long = reponseData.stages.length;
  
          setLongueur(long);
  
          for (let i = 0; i < longueur; i++) {
            tabTemp.push(reponseData.stages[i]);
          }
          
          setStagesDispo(tabTemp);
        } else if(document.querySelector("#typeStage").value === "Développement d'application"){
          const reponseData = await sendRequest("http://localhost:5000/api/stages/Développement d'applications")
        
          let long = reponseData.stages.length;

          setLongueur(long);

          for (let i = 0; i < longueur; i++) {
            tabTemp.push(reponseData.stages[i]);
          }
        
          setStagesDispo(tabTemp);
        }
        
      } catch (err) {
        console.log(err);
      }
    };
    recupererStages();
  }, [sendRequest, stagesDispo, longueur]);
  
  // const handleProfilFiltre = (event) => {
  //   setProfilFiltre(event.target.value);
  // };
  
    return (
          <div>
            <h1 className="labelStage">Voici la liste des stages disponibles</h1>
            <div className="filter">
            <label>Filtrer par profil de sortie: </label>
            <select id="typeStage">
              <option value="Réseaux et sécurité">Réseaux et sécurité</option>
              <option value="Développement d'application">Développement d'application</option>
            </select>
          </div>
            <StageDispoList stagesDispo={stagesDispo} longueur={longueur}/>
          </div>
      );
    };

export default StagesDispo;