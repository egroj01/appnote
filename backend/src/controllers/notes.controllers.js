const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.getNotes = async (req, res) => {
  const notes = await Note.find(); // cosulto la DB con el find creo mi arreglo [{ }, { }, { }]
  console.log(`Notas consultadas:
  ${notes}`)
  res.json(notes) // con el res lo mando al front
}

notesCtrl.createNote = async (req, res) => {
  const { title, date, content, author, } = req.body;
  //console.log(req.body);
  const newNote = new Note({
    title,
    date,
    content,
    author,
  });
  await newNote.save();
  console.log(`Nota creada:
  ${newNote}`)
  res.json(newNote)
}

notesCtrl.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  console.log(`Nota consultada:
  ${note}`)
  res.json(note)
}

notesCtrl.updateNote = async (req, res) => {
  const {title, content, author } = req.body;
  const note = await Note.findOneAndUpdate({_id:req.params.id}, {
    title,
    author,
    content,
  })
  console.log(`Nota Actualizada:
  ${note}`)
  res.json(note)
}

notesCtrl.deleteNote = async (req, res) => {
  const note = await Note.findByIdAndDelete({_id:req.params.id});
  console.log(`Nota Eliminada:
  ${note}`)
  res.json(note)
}

module.exports = notesCtrl;