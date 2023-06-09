const express = require("express");
const controleursEtudiant = require("../controllers/etudiants-controleurs");
const router = express.Router();

router.post("/", controleursEtudiant.ajouterEtudiant);
router.patch("/", controleursEtudiant.assignerStage);
router.get("/", controleursEtudiant.getEtudiants);

module.exports = router;
