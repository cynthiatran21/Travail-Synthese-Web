const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiant");
const Stage = require("../models/stage");

const ajouterEtudiant = async (requete, reponse, next) => {
  const { noDA, nomEtudiant, courrielEtudiant, profilSortie } = requete.body;

  let etudiantExiste;

  try {
    etudiantExiste = await Etudiant.findOne({ noDA: noDA });
  } catch {
    return next(new HttpErreur("Échec vérification etudiant existe", 500));
  }

  if (etudiantExiste) {
    return next(
      new HttpErreur("L'étudiant existe déjà", 422)
    );
  }

  let nouvEtudiant = new Etudiant({
    noDA,
    nomEtudiant,
    courrielEtudiant,
    profilSortie,
    stage:[]
  });

  try {
    await nouvEtudiant.save();
  } catch (err) {
    console.log(err);
    return next(new HttpErreur("Création de l'étudiant échouée", 422));
  }
  reponse
    .status(201)
    .json({ etudiant: nouvEtudiant.toObject({ getter: true }) });
};


const assignerStage = async (requete, reponse, next) => {
  const { nomContact, courrielContact, nomEntreprise, typeStage } = requete.body;
  const etudiantId = requete.params.etudiantId;

  let etudiant;

  try {
    etudiant = await Etudiant.findById(etudiantId);
  } catch {
    return next(
      new HttpErreur("L'étudiant n'existe pas", 500)
    );
  }

  try{
    if (etudiant.stage.length === 0) {
      next(
        new HttpErreur("L'étudiant est déjà assigné un stage", 500)
      );
    } else {
      let stage;
      stage = await Stage.findOne({ nomContact: nomContact, courrielContact: courrielContact, nomEntreprise: nomEntreprise,  typeStage: typeStage })
      etudiant.stage.push(stage);
      await etudiant.save();
    }
  } catch (err){
    console.log(err);
    return next(
      new HttpErreur("Erreur lors de l'assignation d'un étudiant à un stage", 500)
    );
  }

  reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) });
};

exports.ajouterEtudiant = ajouterEtudiant;
exports.assignerStage = assignerStage;