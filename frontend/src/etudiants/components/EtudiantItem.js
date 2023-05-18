import React, { useState, useEffect, useRef } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

import "../../styles/Etudiants.css";

const EtudiantItem = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();

  const [assignationFonctionne, setAssignationFonctionne] = useState(true);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [stagesDispo, setStagesDispo] = useState([]);
  const [longueur, setLongueur] = useState(0);

  const [stagesDispoProg, setStagesDispoProg] = useState([]);
  const [stagesDispoReseau, setStagesDispoReseau] = useState([]);

  const [longueurProg, setLongueurProg] = useState(0);
  const [longueurReseau, setLongueurReseau] = useState(0);

  const [formState, inputHandler] = useForm(
    {
      stage: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  const [showOnce, setShowOnce] = useState(0);
  const selectRef = useRef();

  useEffect(() => {
    const recupererStages = async () => {
      try {
        let tabTemp = [];

        if (props.profilSortie === "Réseaux et sécurité") {
          const reponseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + "/stages/Réseaux et sécurité"
          );

          let long = reponseData.stages.length;

          setLongueurReseau(long);

          let longTemp = 0;

          for (let i = 0; i < longueurReseau; i++) {
            if (
              reponseData.stages[i].stagiaires.length <
              reponseData.stages[i].nbPostesDispo
            ) {
              tabTemp.push(reponseData.stages[i]);
              longTemp++;
            }
          }

          setLongueur(longTemp);
          setStagesDispoReseau(tabTemp);
          setStagesDispo(stagesDispoReseau);
        } else if (props.profilSortie === "Développement d'applications") {
          const reponseData = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + "stages/Développement d'application"
          );

          let long = reponseData.stages.length;

          setLongueurProg(long);

          let longTemp = 0;

          for (let i = 0; i < longueurProg; i++) {
            if (
              reponseData.stages[i].stagiaires.length <
              reponseData.stages[i].nbPostesDispo
            ) {
              tabTemp.push(reponseData.stages[i]);
              longTemp++;
            }
          }

          setLongueur(longTemp);
          setStagesDispoProg(tabTemp);
          setStagesDispo(stagesDispoProg);
        }
      } catch (err) {
        console.log(err);
      }
    };
    recupererStages();
  }, [sendRequest, stagesDispo, longueur]);

  useEffect(() => {
    if (show && showOnce < 1) {
      const select = selectRef.current;
      if (select) {
        for (let i = 0; i < longueur; i++) {
          var option = document.createElement("option");
          option.text = stagesDispo[i].nomEntreprise;
          option.value = stagesDispo[i]._id;
          select.add(option, undefined);
        }
        setShowOnce(showOnce + 1);
      }
    }
  }, [show, longueur, stagesDispo]);

  useEffect(() => {
    if (!show) {
      setShowOnce(0);
    }
  }, [show, longueur, stagesDispo]);

  const choixStageHandler = async (event) => {
    event.preventDefault();

    try {
      const reponseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL +  "/etudiants",
        "PATCH",
        JSON.stringify({
          idStage: document.querySelector("#stage").value,
          idEtudiant: props.cle,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      setAssignationFonctionne(true);
    } catch (err) {
      setAssignationFonctionne(false);
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div onClick={() => setShow(true)} className="etudiantItem">
        <h1>{props.nomEtudiant}</h1>
        <p>Numéro de DA: {props.noDA}</p>
        <p>Courriel: {props.courrielEtudiant}</p>
        <p>Profil de sortie: {props.profilSortie}</p>
      </div>

      <Modal
        title="Assigner un étudiant à un stage"
        onClose={() => setShow(false)}
        show={show}
      >
        <p>Choisir un stage</p>
        <form onSubmit={choixStageHandler}>
          <label>Stages disponibles: </label>
          <select ref={selectRef} id="stage"></select>

          <br></br>
          <Button id="buttonStage" type="submit" disabled={!formState.isValid}>
            Assigner le stage à l'étudiant
          </Button>
        </form>

        {assignationFonctionne ? (
          <p></p>
        ) : (
          <p>
            L'assignation a échoué. Veuillez contacter le superviseur des stages
            Sylvain Labranche : sylvain.labranche@cmontmorency.qc.ca
          </p>
        )}
      </Modal>
    </React.Fragment>
  );
};

export default EtudiantItem;
