const cookieParser = require("cookie-parser");
const homeController = require("../controllers/homeController.js");
// const userController = require("../controllers/userController.js");
// const { auth } = require("../middlewares/authMiddleware.js");
// const creatureController = require("../controllers/creatureController.js");
module.exports = (app) => {
  app.use(cookieParser())
//   app.use(auth)
  app.use(homeController);
//   app.use("/user", userController);
//   app.use("/creature", creatureController);
//   app.use('*',(req,res)=>{
//     res.render('404')
//   })


};
