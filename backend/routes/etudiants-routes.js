const express = require("express");
const controleursEtudiant = require("../controllers/etudiants-controleurs")
const router = express.Router();

router.post('/', controleursEtudiant.ajouterEtudiant);

module.exports = router;
