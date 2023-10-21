// const { getAll } = require("../services/animalService.js");

const { errorHelper } = require("../utils/errorHelpers.js");

const homeController = require("express").Router();

homeController.get("/", async (req, res) => {
  try {
    res.render("home", {
      title: "Home",
      
    });
  } catch (err) {
    const errors = errorHelper(err)
    res.render('home',{
      title : 'Home',
      errors
    })
  }
});

module.exports = homeController;
