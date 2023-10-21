const { isAuthorized } = require("../middlewares/authMiddleware.js");
const electronicService = require("../services/electronicService.js");
const { errorHelper } = require("../utils/errorHelpers.js");

const creatureController = require("express").Router();

creatureController.get("/create", isAuthorized, (req, res) => {
  res.render("create", {
    title: "Add electronic",
  });
});

creatureController.post("/create", isAuthorized, async (req, res) => {
  try {
    await electronicService.create(req.body, req.user._id);
    res.redirect("/");
  } catch (err) {
    const errors = errorHelper(err);
    res.render("create", {
      title: "Create",
      errors,
    });
  }
});

creatureController.get("/catalog", async (req, res) => {
  try {
    const electronics = await electronicService.getAll();
    res.render("catalog", {
      title: "Electronics Posts",
      electronics,
    });
  } catch (err) {
    const errors = errorHelper(err);
    res.render("create", {
      title: "Create",
      errors,
    });
  }
});

creatureController.get("/:id/details", async (req, res) => {
  try {
    const electronic = await electronicService.getById(req.params.id);
    const isOwner = req.user?._id == electronic.owner._id;
    let hasBought = false;
    const parsedBuys = JSON.parse(JSON.stringify(electronic.buyingList));
    const idArr = parsedBuys.map((x) => x._id);
    if (idArr.includes(req.user?._id)) {
      //CHANGE PROPERTIES ACCORDING TO THE TASK
      hasBought = true;
    }

    // const votesString = parsedBuys.map(x => x.email).join(', ')

    res.render("details", {
      title: "Details",
      electronic,
      isOwner,
      hasBought,
      // votesString,
      parsedBuys,
    });
  } catch (err) {
    const errors = errorHelper(err);
    res.render("details", {
      title: "Details",
      errors,
    });
    console.log(err);
  }
});

creatureController.get("/:id/buy", isAuthorized, async (req, res) => {
  const electronicId = req.params.id;
  const userId = req.user._id;
  try {
    await electronicService.buy(electronicId, userId);
    res.redirect(`/electronic/${electronicId}/details`);
  } catch (err) {
    const errors = errorHelper(err);
    res.render("details", {
      title: "Details",
      errors,
    });
  }
});

creatureController.get("/:id/edit", isAuthorized, async (req, res) => {
  try {
    const id = req.params.id;
    const electronic = await electronicService.getById(id);

    const isOwner = req.user?._id == electronic.owner._id;
    if (!isOwner) throw new Error("You are not the owner of this electronic");

    res.render("edit", {
      title: "Edit",
      electronic,
    });
  } catch (err) {
    const errors = errorHelper(err);
    res.render("edit", {
      title: "Animal Edit",
      electronic,
      errors,
    });
  }
});

creatureController.post("/:id/edit", isAuthorized, async (req, res) => {
  try {
    const id = req.params.id;
    const electronic = await electronicService.getById(id)
    const electronicData = req.body;
    const isOwner = req.user?._id == electronic.owner._id;

    if (!isOwner) throw new Error("You are not the owner of this electronic");
    
    await electronicService.edit(id, electronicData);

    res.redirect(`/electronic/${id}/details`);
  } catch (err) {
    const errors = errorHelper(err);
    res.render("edit", {
      title: "Edit",
      errors,
    });
  }
});

// creatureController.get('/:id/delete',isAuthorized, async (req,res) => {
//   const id = req.params.id
// try{
//   await electronicService.del(id)
//   res.redirect('/electronic/catalog')
// }catch(err){
//   const errors = errorHelper(err)
//     res.render("details", {
//       title: "Details",
//       errors
//     });
// }
// })

module.exports = creatureController;
