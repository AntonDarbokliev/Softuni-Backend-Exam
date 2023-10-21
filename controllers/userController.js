const { register, login } = require("../services/userService.js");
const { errorHelper } = require("../utils/errorHelpers.js");
// const animalService = require("../services/animalService.js");
// const { isAuthorized } = require("../middlewares/authMiddleware.js");



const userController = require("express").Router();

userController.get("/register", async (req, res) => {
  try {
    res.render("register", {
      title: "Register",
    });
  } catch (err) {
    const errors = errorHelper(err)
    res.render('register',{
      title : 'Register',
      errors
    })
  }
});

userController.post("/register", async (req, res) => {
  try {
    const token = await register(req.body);
    res.cookie('auth',token,{httpOnly : true})
    res.redirect('/')
  } catch (err) {
    const errors = errorHelper(err)
    res.render('register',{
      title : 'Register',
      errors
    })
    console.log(err);
  }
});

userController.get("/login", async (req, res) => {
  try {
    res.render("login", {
      title: "Login",
    });
  } catch (err) {
    const errors = errorHelper(err)
    res.render('login',{
      title : 'Login',
      errors
    })
  }
});

userController.post("/login", async (req, res) => {
  try {
    const token = await login(req.body);
    res.cookie('auth',token,{httpOnly : true})
    res.redirect('/')
  } catch (err) {
    const errors = errorHelper(err)
    res.render('login',{
      title : 'Login',
      errors
    })
    console.log(err);
  }
});

userController.get("/logout", async (req, res) => {
  res.clearCookie('auth')
  res.redirect('/')
});

// userController.get("/:id/profile",isAuthorized, async (req, res) => {
//   try{
//     const posts = (await animalService.getAll()).filter(post => post.owner.email === req.user.email )

//     res.render('my-posts',{
//       title : 'My Posts',
//       posts
//     })
    
//   }catch(err){
//     const errors = errorHelper(err)
//     res.render('home',{
//       title : 'Home',
//       errors
//     })
//   }
// });

module.exports = userController;
