const Cards = require('../models/card');

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: 'Не удалось достать карточки' }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Cards.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Не удалось создать карточку' }));
};

module.exports.deleteCard = (req, res) => {
  Cards.findById(req.params.id).populate('owner')
    .then((card) => {
      if (!card) {
        res.status(404).json({ message: 'Карта не найдена' });
      }
      Cards.findByIdAndRemove(req.params.id)
        .then((obj) => res.send({ data: obj }))
        .catch(err => res.status(500).send({ message: 'Не удалось удалить карточку' }));
    })
    .catch(err => res.status(500).send({ message: 'Не удалось начать поиск карточки' }));
};