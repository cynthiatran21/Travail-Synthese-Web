const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const stageSchema = new Schema({
    nomContact:{type: String, required: true},
    courrielContact: {type: String, required: true},
    telephoneContact: {type: String, required: true},
    nomEntreprise: {type: String, required: true},
    adresseEntreprise: {type: String, required: true},
    typeStage:{type: String, required: true},
    nbPostesDispo: {type: String, required: true},
    description: {type: String, required: true},
    remuneration: {type: String, required: true},
});

module.exports = mongoose.model("Stage", stageSchema);