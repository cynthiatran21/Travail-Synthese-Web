const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/etudiant");

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
    stage: ''
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

exports.ajouterEtudiant = ajouterEtudiant;