const express = require("express");
const controleursStage = require("../controllers/stages-controleurs")
const router = express.Router();


router.get('/', controleursStage.afficherStages);

router.post('/', controleursStage.ajouterStage);

module.exports = router;
