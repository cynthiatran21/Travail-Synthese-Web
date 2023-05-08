import React from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";

const AjouterStage = () => {
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      nomContact: {
        value: "",
        isValid: false,
      },
      courrielContact: {
        value: "",
        isValid: false,
      },
      telephoneContact: {
        value: "",
        isValid: false,
      },
      nomEntreprise: {
        value: "",
        isValid: false,
      },
      adresseEntreprise: {
        value: "",
        isValid: false,
      },
      typeStage: {
        value: "",
        isValid: true,
      },
      nbPostesDispo: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      remuneration: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const stageSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!

    try {
      const reponseData = await sendRequest(
        "http://localhost:27017/api/stages",
        "POST",
        JSON.stringify({
          nomContact: formState.inputs.nomContact.value,
          courrielContact: formState.inputs.courrielContact.value,
          telephoneContact: formState.inputs.telephoneContact.value,
          nomEntreprise: formState.inputs.nomEntreprise.value,
          adresseEntreprise: formState.inputs.adresseEntreprise.value,
          typeStage: formState.inputs.typeStage.value,
          nbPostesDispo: formState.inputs.nbPostesDispo.value,
          description: formState.inputs.description.value,
          remuneration: formState.inputs.remuneration.value,
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
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={stageSubmitHandler}>
        <Input
          id="nomContact"
          element="input"
          type="text"
          label="Nom de la personne contact"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nom valide."
          onInput={inputHandler}
        />
        <Input
          id="courrielContact"
          element="input"
          type="text"
          label="Courriel de la personne contact"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nom valide."
          onInput={inputHandler}
        />
        <Input
          id="telephoneContact"
          element="input"
          type="text"
          label="Téléphone de la personne contact"
          validators={[
            VALIDATOR_REQUIRE(),
            VALIDATOR_MINLENGTH(10),
            VALIDATOR_MAXLENGTH(10),
          ]}
          errorText="Entrez un numéro de téléphone valide."
          onInput={inputHandler}
        />
        <Input
          id="nomEntreprise"
          element="input"
          type="text"
          label="Nom de l'entreprise"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nom valide."
          onInput={inputHandler}
        />
        <Input
          id="adresseEntreprise"
          element="input"
          type="text"
          label="Adresse de l'entreprise"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez une adresse valide."
          onInput={inputHandler}
        />
        <select
          id="typeStage"
          label="Type de stage"
          errorText="Sélectionnez un type de stage."
          onChange={inputHandler}
        >
          <option>Réseaux et sécurité</option>
          <option>Développement d'applications</option>
        </select>
        <Input
          id="nbPostesDispo"
          element="input"
          type="text"
          label="Nombre de postes disponibles"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nombre valide."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="input"
          type="text"
          label="Description du stage"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez une description valide."
          onInput={inputHandler}
        />
        <select
          id="remuneration"
          label="Rémunération"
          errorText="Sélectionnez un type de rémunération."
          onChange={inputHandler}
        >
          <option>Salaire horaire</option>
          <option>Montant unique pour le stage</option>
          <option>Aucune rémunération</option>
        </select>

        <Button type="submit" disabled={!formState.isValid}>
          Ajouter le stage
        </Button>
      </form>
    </React.Fragment>
  );
};

export default AjouterStage;
