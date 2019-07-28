const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({},{ strict: false });
module.exports = mongoose.model("Note", NoteSchema);