const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Stage = require("../models/stage");

const ajouterStage = async (requete, reponse, next) => {
  const { nomContact, courrielContact, nomEntreprise, adresseEntreprise, typeStage, nbPostesDispo, description, remuneration } = requete.body;
  const nouvStage = new Stage({
    nomContact,
    courrielContact,
    nomEntreprise,
    adresseEntreprise,
    typeStage,
    nbPostesDispo,
    description,
    remuneration
  });

  try {

    
    await nouvStage.save();
  } catch (err) {
    const erreur = new HttpErreur("Création du stage échouée", 500);
    return next(erreur);
  }
  reponse.status(201).json({ stage: nouvStage });
};

exports.ajouterStage = ajouterStage;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   