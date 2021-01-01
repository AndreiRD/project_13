const User = require('../models/user');

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Не удалось начать поиск пользователя' }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Не удалось выгрузить карточки' }));
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Не удалось создать пользователя' }));
};
