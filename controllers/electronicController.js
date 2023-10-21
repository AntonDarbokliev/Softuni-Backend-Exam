const { isAuthorized } = require("../middlewares/authMiddleware.js");
const electronicService = require("../services/electronicService.js");

const creatureController = require("express").Router();


creatureController.get("/create",isAuthorized, (req, res) => {
    res.render("create", {
      title: "Add creature",
    });
  });

creatureController.post("/create",isAuthorized, async (req, res) => {
    try {
      await electronicService.create(req.body,req.user._id);
      res.redirect("/");
    } catch (err) {
      const errors = errorHelper(err)
      res.render('create',{
        title : 'Create',
        errors
      });
      console.log(err);
    }
  });

//   creatureController.get("/catalog", async (req, res) => {
//     try {
//       const creatures = await electronicService.getAll();
//       res.render("all-posts", {
//         title: "Creature Posts",
//         creatures,
//       });
//     } catch (err) {
//       res.render("all-posts", {
//         title: "Creature Posts",
//       });
//     }
//   });

//  creatureController.get("/:id/details", async (req, res) => {
//   try {
//     const creature = await electronicService.getById(req.params.id);
//     const isOwner = req.user?._id == creature.owner._id
//     let hasVoted = false;
//     const parsedVotes = JSON.parse(JSON.stringify(creature.votes))
//     const idArr = parsedVotes.map(x => x._id)
//     if (idArr.includes(req.user?._id)) {           //CHANGE PROPERTIES ACCORDING TO THE TASK
//         hasVoted = true
//     }

//     const votesString = parsedVotes.map(x => x.email).join(', ')

//     res.render("details", {
//       title: "Details",
//       creature,
//       isOwner,
//       hasVoted,
//       votesString,
//       parsedVotes
//     });
//   } catch (err) {
//     const errors = errorHelper(err)
//     res.render('details',{
//       title : 'Details',
//       errors
//     });
//   }
// });


// creatureController.get('/:id/vote', isAuthorized,async (req,res) => {
//   const creatureId = req.params.id
//   const userId = req.user._id 
// try{
  
//   await electronicService.vote(creatureId,userId)
//   res.redirect(`/creature/${creatureId}/details`)
// }catch(err){
//   const errors = errorHelper(err)
//   res.render('details',{
//     title : 'Details',
//     errors,
//   })
// }
// })

// creatureController.get("/:id/edit",isAuthorized,async (req, res) => {
//   try {
//     const id = req.params.id;
//     const creature = await electronicService.getById(id)
   
//     res.render("edit", {
//       title: "Edit",
//       creature
//     });
//   } catch (err) {
//     const errors = errorHelper(err)
//     res.render("edit", {
//       title: "Animal Edit",
//       creature,
//       errors
//     });
//   }
// });

// creatureController.post("/:id/edit",isAuthorized, async (req, res) => {
//   try {
//     const id = req.params.id;
//     const animalData = req.body
//     await electronicService.edit(id,animalData)
//     res.redirect(`/creature/${id}/details`)
   
//   } catch (err) {
//     const errors = errorHelper(err)
//     res.render("edit", {
//       title: "Edit",
//       errors
//     });
//   }
// });

// creatureController.get('/:id/delete',isAuthorized, async (req,res) => {
//   const id = req.params.id
// try{
//   await electronicService.del(id)
//   res.redirect('/creature/catalog')
// }catch(err){
//   const errors = errorHelper(err)
//     res.render("details", {
//       title: "Details",
//       errors
//     });
// }
// })

  module.exports = creatureController
  