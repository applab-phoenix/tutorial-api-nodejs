const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Contenu absent!"
        });
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur survenue lors de la création du tutoriel."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur survenue lors de la recupération."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la recupération du tutoriel avec l'id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutoriel est mis à jour avec succès."
                });
            } else {
                res.send({
                    message: `Impossible de modifier le tutoriel avec l'id=${id}. Tutoriel absent ou req.body n'est pas fourni!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Erreur lors de la modification avec l'id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutoriel est supprimé avec succès!"
                });
            } else {
                res.send({
                    message: `Impossible de supprimer le tutoriel avec l'id=${id}. Tutoriel absent!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Impossible de supprimer le tutoriel avec l'id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Les tutoriels ont été supprimés avec succès!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur survenue lors de la suppression."
            });
        });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erreur survenue lors de la recupération."
            });
        });
};