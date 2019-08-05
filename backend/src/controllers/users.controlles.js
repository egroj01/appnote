const usersCtrl = {};

const User = require('../models/User');

usersCtrl.getUsers = async (req, res) => {
  const users = await User.find(); // cosulto la DB con el find creo mi arreglo [{ }, { }, { }]
  console.log(`Usuarios consultadas:
  ${users}`)
  res.json(users) // con el res lo mando al front
}

usersCtrl.createUser = async (req, res) => {
  const { username } = req.body;
  //console.log(req.body);
  const newUser = new User({
    username
  });
  await newUser.save();
  console.log(`Usuario creado:
  ${newUser}`)
  res.json(newUser)
}

usersCtrl.getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(`Usuario consultado:
  ${user}`)
  res.json(user)
}

usersCtrl.updateUser = async (req, res) => {
  const { username } = req.body;
  const user = await User.findOneAndUpdate({_id:req.params.id}, {
    username
  })
  console.log(`Usuario Actualizado:
  ${user}`)
  res.json(user)
}

usersCtrl.deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({_id:req.params.id});
  console.log(`Usuario Eliminado:
  ${user}`)
  res.json(user)
}

module.exports = usersCtrl;