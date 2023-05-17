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
            "http://localhost:5000/api/stages/Réseaux et sécurité"
          );

          let long = reponseData.stages.length;

          setLongueurReseau(long);
          setLongueur(longueurReseau);

          for (let i = 0; i < longueurReseau; i++) {
            if (
              reponseData.stages[i].stagiaires.length <
              reponseData.stages[i].nbPostesDispo
            ) {
              tabTemp.push(reponseData.stages[i]);
            }
          }

          setStagesDispoReseau(tabTemp);
          setStagesDispo(stagesDispoReseau);
        } else if (props.profilSortie === "Développement d'applications") {
          const reponseData = await sendRequest(
            "http://localhost:5000/api/stages/Développement d'application"
          );

          let long = reponseData.stages.length;

          setLongueurProg(long);
          setLongueur(longueurProg);

          for (let i = 0; i < longueurProg; i++) {
            if (
              reponseData.stages[i].stagiaires.length <
              reponseData.stages[i].nbPostesDispo
            ) {
              tabTemp.push(reponseData.stages[i]);
            }
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

  useEffect(() => {
    if (show && showOnce < 1) {
      const select = selectRef.current;
      if (select) {
        console.log(longueur);
        console.log(showOnce);
        for (let i = 0; i < longueur; i++) {
          var option = document.createElement("option");
          option.text = stagesDispo[i].nomEntreprise;
          //option.value = stagesDispo[i];
          //console.log(option.value)
          console.log("TEST_____________________________________");
          console.log(option);
          console.log(select);
          console.log("TEST______________________________________");
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
    //assigner le stage a letudiant : ajouter l'etudiant a la liste de stagiaires, ajouter le stage a l'etudiant

    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!

    console.log("BLABLA__________________________________")
    console.log(document.querySelector("#stage").value)

    //formState.inputs.profilSortie.value = document.querySelector("#profilSortie").value;

    /*try {

      //router.patch("/:etudiantId", controleursEtudiant.assignerStage);
      const reponseData = await sendRequest(
        "http://localhost:5000/api/etudiants",
        "PATCH",
        JSON.stringify({
          nomContact: formState.inputs.noDA.value,
          courrielContact: formState.inputs.nomEtudiant.value,
          nomEntreprise: formState.inputs.courrielEtudiant.value,
          adresseEntreprise: document.querySelector("#profilSortie").value,
          typeStage: formState.inputs.courrielEtudiant.value,
          nbPostesDispo: formState.inputs.courrielEtudiant.value,
          description: formState.inputs.courrielEtudiant.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      //setAjoutFonctionne(true);
      console.log(reponseData);
    } catch (err) {
      //setAjoutFonctionne(false);
      console.log(err);
    }*/
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
      </Modal>
    </React.Fragment>
  );
};

export default EtudiantItem;
