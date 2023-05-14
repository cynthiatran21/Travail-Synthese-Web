import React, { useState, useEffect} from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

import "../../styles/Etudiants.css"

const EtudiantItem = props => {
  const { error, sendRequest, clearError } = useHttpClient();

  const [assignationFonctionne, setAssignationFonctionne] = useState(true)
  const [show, setShow] = useState(false)

  const [formState, inputHandler] = useForm(
    {
      satge: {
          value: '',
          isValid: true
      }
    },
    true
  );


  const choixStageHandler  = async event =>  {
    // event.preventDefault();
    // console.log(formState.inputs); // send this to the backend!

    // formState.inputs.profilSortie.value = document.querySelector("#profilSortie").value;
    

    // try {
    //   const reponseData = await sendRequest(
    //     "http://localhost:5000/api/etudiants",
    //     "POST",
    //     JSON.stringify({
    //       noDA: formState.inputs.noDA.value,
    //       nomEtudiant: formState.inputs.nomEtudiant.value,
    //       courrielEtudiant: formState.inputs.courrielEtudiant.value,
    //       profilSortie: document.querySelector("#profilSortie").value,
    //     }),
    //     {
    //       "Content-Type": "application/json",
    //     }
    //   );
    //   setAjoutFonctionne(true);
    //   console.log(reponseData);
      
    // } catch (err) {
    //   setAjoutFonctionne(false);
    //   console.log(err);
    // }
  };











  





  return (
    <React.Fragment>
      <div onClick={()=> setShow(true)} className="etudiantItem">
        <h1 >{props.nomEtudiant}</h1>
        <p>Numéro de DA: {props.noDA}</p>
        <p>Courriel: {props.courrielEtudiant}</p>
        <p>Profil de sortie: {props.profilSortie}</p>
      </div>

      
      <Modal title="Assigner un étudiant à un stage" onClose={() => setShow(false)} show={show}>
        <p>Choisir un stage</p>
        <form onSubmit={choixStageHandler}>
          <label>Profil de sortie de l'étudiant: </label>
          <select
            id="stage"
          >
            <option value="Réseaux et sécurité">Réseaux et sécurité</option>
            <option value="Développement d'applications">Développement d'applications</option>
          </select>

          <br></br>
          <Button type="submit" disabled={!formState.isValid}>
            Assigner le stage à l'étudiant
          </Button>
        </form>
      </Modal>
    </React.Fragment>
  );
};

export default EtudiantItem;
