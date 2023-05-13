import React, {useState, useContext} from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Modal from '../../shared/components/UIElements/Modal';
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
} from "../../shared/util/validators";
import "../../styles/Formulaire.css";
import "../../styles/AjouterStage.css";

const AjouterStage = () => {
  const { error, sendRequest, clearError } = useHttpClient();

  const [ajoutFonctionne, setAjoutFonctionne] = useState(true)
  const [show, setShow] = useState(false)




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
    console.log(formState.inputs);

    try {
      formState.inputs.typeStage.value =
        document.querySelector("#typeStage").value;
      formState.inputs.remuneration.value =
        document.querySelector("#remuneration").value;

      const reponseData = await sendRequest(
        "http://localhost:5000/api/stages",
        "POST",
        JSON.stringify({
          nomContact: formState.inputs.nomContact.value,
          courrielContact: formState.inputs.courrielContact.value,
          telephoneContact: formState.inputs.telephoneContact.value,
          nomEntreprise: formState.inputs.nomEntreprise.value,
          adresseEntreprise: formState.inputs.adresseEntreprise.value,
          typeStage: document.querySelector("#typeStage").value,
          nbPostesDispo: formState.inputs.nbPostesDispo.value,
          description: formState.inputs.description.value,
          remuneration: document.querySelector("#remuneration").value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setAjoutFonctionne(true);
      console.log(ajoutFonctionne + "devrait changer")
      console.log(reponseData);
    } catch (err) {
      setAjoutFonctionne(false)
      console.log(err);
    }
  };

  return (
    <div className="fond">
    <React.Fragment>      
      <form onSubmit={stageSubmitHandler} id="idForm">
        <Input
          id="nomContact"
          element="input"
          type="text"
          label="Nom de la personne contact: "
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nom valide."
          onInput={inputHandler}
        />
        <Input
          id="courrielContact"
          element="input"
          type="text"
          label="Courriel de la personne contact: "
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          errorText="Entrez un nom valide."
          onInput={inputHandler}
        />
        <Input
          id="telephoneContact"
          element="input"
          type="text"
          label="Téléphone de la personne contact: "
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
          label="Nom de l'entreprise: "
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez un nom valide."
          onInput={inputHandler}
        />
        <Input
          id="adresseEntreprise"
          element="input"
          type="text"
          label="Adresse de l'entreprise: "
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez une adresse valide."
          onInput={inputHandler}
        />
        <label>Type de stage: </label>
        <select
          id="typeStage"
        >
          <option value="Réseaux et sécurité">Réseaux et sécurité</option>
          <option value="Développement d'applications">
            Développement d'applications
          </option>
        </select>
        <Input
          type="number"
          id="nbPostesDispo"
          element="input"
          label="Nombre de postes disponibles: "
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(1)]}
          errorText="Entrez un nombre valide."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="input"
          type="text"
          label="Description du stage: "
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Entrez une description valide."
          onInput={inputHandler}
        />

        <label>Rémunération: </label>
        <select
          id="remuneration"
        >
          <option value="Salaire horaire">Salaire horaire</option>
          <option value="Montant unique pour le stage">
            Montant unique pour le stage
          </option>
          <option value="Aucune rémunération">Aucune rémunération</option>
        </select>

        <br></br>
        <div>
          <Button type="submit" disabled={!formState.isValid}  onClick={()=> setShow(true)}>
            Ajouter le stage
          </Button>
          
        </div>
      </form>

      {console.log(ajoutFonctionne)}
      {ajoutFonctionne
       ?<Modal title="Ajout réussi" onClose={() => setShow(false)} show={show}>
          <p>L'ajout a fonctionné</p>
       </Modal>


       :<Modal title="Ajout échoué" onClose={() => setShow(false)} show={show}>
       <p>L'ajout a échoué. Veuillez contacter le superviseur des stages Sylvain Labranche : sylvain.labranche@cmontmorency.qc.ca</p>
    </Modal>
      }
    </React.Fragment>
    </div>
  );
};

export default AjouterStage;
