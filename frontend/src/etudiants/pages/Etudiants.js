import React, { useState, useEffect } from 'react';
import EtudiantList from "../components/EtudiantList";
import { useHttpClient } from "../../shared/hooks/http-hook";


const EtudiantsDispo = () => {
  const {error, sendRequest, clearError } = useHttpClient();
  const [etudiantsDispo, setEtudiantsDispo] = useState([]);
  const [tabTemp, setTabTemp] = useState([]);
  const [longueur, setLongueur] = useState([]);

  useEffect(() => {
    const recupererEtudiants = async () => {
      try{

        
        const reponseData = await sendRequest("http://localhost:5000/api/etudiants")

        let longueur = reponseData.etudiants.length;
        

        for (let i = 0; i < longueur; i++) {
          tabTemp.push(reponseData.etudiants[i]);
        }

        setEtudiantsDispo(tabTemp);
      } catch (err) {
        console.log(err);
      }
    };
    recupererEtudiants();
  }, [sendRequest]);


  
  console.log("EtudiantsDispo " + etudiantsDispo);

    return (
      <div>
        <h1>Voici la liste des étudiants</h1>
           <EtudiantList etudiantsDispo={tabTemp} longueur={longueur} />
      </div>
      );
    };

export default EtudiantsDispo;