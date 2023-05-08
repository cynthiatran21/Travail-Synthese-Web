const express = require("express");
const controleursEtudiant = require("../controllers/etudiants-controleurs")
const router = express.Router();

router.get('/', controleursEtudiant.afficherEtudiants);

router.post('/', controleursEtudiant.ajouterEtudiant);

module.exports = router;
