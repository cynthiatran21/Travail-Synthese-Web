const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const etudiantSchema = new Schema({
    noDA:{type: String, required: true},
    nomEtudiant: {type: String, required: true},
    courrielEtudiant: {type: String, required: true},
    profilSortie: {type: String, required: true}
});

module.exports = mongoose.model("Etudiant", etudiantSchema);