import React, { useState, useEffect } from "react";
import EtudiantList from "../components/EtudiantList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "../../styles/Etudiants.css";

const EtudiantsDispo = () => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [etudiantsDispo, setEtudiantsDispo] = useState([]);
  const [longueur, setLongueur] = useState([]);

  useEffect(() => {
    const recupererEtudiants = async () => {
      try {
        let tabTemp = [];
        const reponseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/etudiants"
        );

        let long = reponseData.etudiants.length;

        setLongueur(long);

        for (let i = 0; i < longueur; i++) {
          tabTemp.push(reponseData.etudiants[i]);
        }

        setEtudiantsDispo(tabTemp);
      } catch (err) {
        console.log(err);
      }
    };
    recupererEtudiants();
  }, [sendRequest, etudiantsDispo, longueur]);

  return (
    <div>
      <h1 className="labelEtudiant">Voici la liste des étudiants</h1>
      <h3 className="labelEtudiant">
        Pour assigner un stage à un étudiant, cliquer sur celui-ci
      </h3>
      <EtudiantList etudiantsDispo={etudiantsDispo} longueur={longueur} />
    </div>
  );
};

export default EtudiantsDispo;
