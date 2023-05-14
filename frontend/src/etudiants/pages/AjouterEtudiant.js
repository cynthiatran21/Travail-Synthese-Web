import React, { useState} from 'react'
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_MAXLENGTH,
    VALIDATOR_EMAIL
  } from '../../shared/util/validators';
import "../../styles/Formulaire.css";

const AjouterEtudiant = () => {
    const { error, sendRequest, clearError } = useHttpClient();

    const [ajoutFonctionne, setAjoutFonctionne] = useState(true)
    const [show, setShow] = useState(false)

    const [formState, inputHandler] = useForm(
      {
        noDA: {
          value: '',
          isValid: false
        },
        nomEtudiant: {
          value: '',
          isValid: false
        },
        courrielEtudiant: {
          value: '',
          isValid: false
        },
        profilSortie: {
            value: '',
            isValid: true
        }
      },
      false
    );
  
    const etudiantSubmitHandler  = async event =>  {
      event.preventDefault();
      console.log(formState.inputs); // send this to the backend!
  
      formState.inputs.profilSortie.value = document.querySelector("#profilSortie").value;
      

      try {
        const reponseData = await sendRequest(
          "http://localhost:5000/api/etudiants",
          "POST",
          JSON.stringify({
            noDA: formState.inputs.noDA.value,
            nomEtudiant: formState.inputs.nomEtudiant.value,
            courrielEtudiant: formState.inputs.courrielEtudiant.value,
            profilSortie: document.querySelector("#profilSortie").value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setAjoutFonctionne(true);
        console.log(reponseData);
        
      } catch (err) {
        setAjoutFonctionne(false);
        console.log(err);
      }
    };
  
    return (
      <React.Fragment>
        <form onSubmit={etudiantSubmitHandler}>
        <Input
          id="noDA"
          element="input"
          type="text"
          label="Numéro de DA de l'étudiant: "
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(9), VALIDATOR_MAXLENGTH(9)]}
          errorText="Entrez un numéro de DA valide."
          onInput={inputHandler}
        />
        <Input
          id="nomEtudiant"
          element="input"
          type="text"
          label="Nom de l'étudiant: "
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nom valide."
          onInput={inputHandler}
        />
        <Input
          id="courrielEtudiant"
          element="input"
          type="text"
          label="Courriel de l'étudiant: "
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Entrez un courriel valide."
          onInput={inputHandler}
        />
        <label>Profil de sortie de l'étudiant: </label>
        <select
          id="profilSortie"
        >
          <option value="Réseaux et sécurité">Réseaux et sécurité</option>
          <option value="Développement d'applications">Développement d'applications</option>
        </select>

      <br></br>
        <Button type="submit" disabled={!formState.isValid} onClick={()=> setShow(true)}>
          Ajouter l'étudiant
        </Button>
      </form>
      {ajoutFonctionne
       ?<Modal title="Ajout réussi" onClose={() => setShow(false)} show={show}>
          <p>L'ajout a fonctionné</p>
       </Modal>

       :<Modal title="Ajout échoué" onClose={() => setShow(false)} show={show}>
       <p>L'ajout a échoué. Veuillez contacter le superviseur des stages Sylvain Labranche : sylvain.labranche@cmontmorency.qc.ca</p>
        </Modal>
      }
      </React.Fragment>
    );
  };
  
  export default AjouterEtudiant;