import React from 'react'
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from "../../shared/components/UIElements/ErrorModal"
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_MAXLENGTH
  } from '../../shared/util/validators';

const AjouterEtudiant = () => {
    const { error, sendRequest, clearError } = useHttpClient();
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
            isValid: false
          }
      },
      false
    );
  
    const etudiantSubmitHandler  = async event =>  {
      event.preventDefault();
      console.log(formState.inputs); // send this to the backend!
  
      try {
        const reponseData = await sendRequest(
          "http://localhost:5000/api/etudiants",
          "POST",
          JSON.stringify({
            noDA: formState.inputs.noDA.value,
            nomEtudiant: formState.inputs.nomEtudiant.value,
            courrielEtudiant: formState.inputs.courrielEtudiant.value,
            profilSortie: formState.inputs.profilSortie.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
  
        console.log(reponseData);
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
      <form onSubmit={etudiantSubmitHandler}>
        <Input
          id="noDA"
          element="input"
          type="text"
          label="Numéro de DA de l'étudiant"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(10)]}
          errorText="Entrez un numéro de DA valide."
          onInput={inputHandler}
        />
        <Input
          id="nomEtudiant"
          element="input"
          type="text"
          label="Nom de l'étudiant"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nom valide."
          onInput={inputHandler}
        />
        <Input
          id="courrielEtudiant"
          element="input"
          type="text"
          label="Courriel de l'étudiant"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un courriel valide."
          onInput={inputHandler}
        />
        <Input
          id="profilSortie"
          element="input"
          type="text"
          label="Profil de sortie de l'étudiant"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un profil de sortie valide."
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Ajouter l'étudiant
        </Button>
      </form>
      </React.Fragment>
    );
  };
  
  export default AjouterEtudiant;