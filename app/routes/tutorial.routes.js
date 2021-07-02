module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Création du tutoriel
    router.post("/", tutorials.create);
  
    // Lecture de tous les tutoriels
    router.get("/", tutorials.findAll);
  
    // Lecture de tous les tutoriels publiés
    router.get("/published", tutorials.findAllPublished);
  
    // Lecture du tutoriel selon l'id
    router.get("/:id", tutorials.findOne);
  
    // Modification du tutoriel selon l'id
    router.put("/:id", tutorials.update);
  
    // Suppression du tutoriel selon l'id
    router.delete("/:id", tutorials.delete);
  
    // Suppression de tous les tutoriels
    router.delete("/", tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
  };