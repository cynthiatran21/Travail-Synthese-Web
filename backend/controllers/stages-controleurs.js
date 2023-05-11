const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Stage = require("../models/stage");

const ajouterStage = async (requete, reponse, next) => {
  const { nomContact, courrielContact, telephoneContact, nomEntreprise, adresseEntreprise, typeStage, nbPostesDispo, description, remuneration } = requete.body;
  
  let stageExiste;

  try {
    stageExiste = await Stage.findOne({ nomEntreprise: nomEntreprise,  typeStage: typeStage, description: description});
  } catch {
    return next(new HttpErreur("Échec vérification stage existe", 500));
  }

  if (stageExiste) {
    return next(
      new HttpErreur("Le stage existe déjà", 422)
    );
  }
  
  const nouvStage = new Stage({
    nomContact,
    courrielContact,
    telephoneContact,
    nomEntreprise,
    adresseEntreprise,
    typeStage,
    nbPostesDispo,
    description,
    remuneration,
    stagiaires: []
  });

  try {
    await nouvStage.save();
  } catch (err) {
    const erreur = new HttpErreur("Création du stage échouée", 500);
    console.log(err)
    return next(erreur);
  }
  reponse.status(201).json({ stage: nouvStage });
};

exports.ajouterStage = ajouterStage;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   