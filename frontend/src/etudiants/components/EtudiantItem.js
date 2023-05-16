import React, { useState, useEffect } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

import StagesDispo from "../../stages/pages/StagesDispo";

import "../../styles/Etudiants.css";

const EtudiantItem = (props) => {
  const { error, sendRequest, clearError } = useHttpClient();

  const [assignationFonctionne, setAssignationFonctionne] = useState(true);
  const [show, setShow] = useState(false);

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

  const x = document.querySelector("#stage");

  useEffect(() => {
    const recupererStages = async () => {
      try {
        let tabTemp = [];

        if (props.profilSortie === "Réseaux et sécurité") {
          const reponseData = await sendRequest(
            "http://localhost:5000/api/stages/Réseaux et sécurité"
          );

          let long = reponseData.stages.length;

          setLongueurReseau(long);
          setLongueur(longueurReseau);

          for (let i = 0; i < longueurReseau; i++) {
            tabTemp.push(reponseData.stages[i]);
          }

          setStagesDispoReseau(tabTemp);
          setStagesDispo(stagesDispoReseau);
        } else if (props.profilSortie === "Développement d'application") {
          const reponseData = await sendRequest(
            "http://localhost:5000/api/stages/Développement d'applications"
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

  

  // var x = document.getElementById("stage");
  // var option = document.createElement("option");

  // for (let i = 0; i < longueur; i++) {
  //   var option = document.createElement("option");
  //   option.text = stagesDispo[i].nomEntreprise;
  //   x.add(option, x[i]);
  // }

  function afficherOptions() {
    setShow(true);
    console.log("TEST_______________________________________________________-");
    console.log(document.querySelector("#buttonStage"))
  console.log(stagesDispo);
  console.log("TEST_______________________________________________________-");
    
    for (let i = 0; i < longueur; i++) {
      var option = document.createElement("option");
      option.text = stagesDispo[i].nomEntreprise;
      console.log(option)
      console.log(x)
      //x.add(option, x[i]);
   
        $('#stage').append(`<option value="${option}">${option}</option>`);
      
    }
  }

  const choixStageHandler = async (event) => {
    //test
  };

  return (
    <React.Fragment>
      <div onClick={() => afficherOptions()} className="etudiantItem">
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
          <select id="stage">
          </select>

          <br></br>
          <Button id="buttonStage" type="submit" disabled={!formState.isValid}>
            Assigner le stage à l'étudiant
          </Button>
        </form>
      </Modal>
      
    </React.Fragment>
  );
};

export default EtudiantItem;
