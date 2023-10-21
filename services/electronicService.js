const Electronic = require("../models/Electronic.js");

async function create(electronicData, userId) {
  const creature = {
    name: electronicData.name,
    type: electronicData.type,
    damages: electronicData.damages,
    imageUrl: electronicData.imageUrl,
    description: electronicData.description,
    production: electronicData.production,                    // CHANGE PROPERTIES ACCORDING TO THE TASK
    exploitation: electronicData.exploitation,                    // CHANGE PROPERTIES ACCORDING TO THE TASK
    price: electronicData.price,                    // CHANGE PROPERTIES ACCORDING TO THE TASK
    buyingList: electronicData.buyingList,
    owner: userId,
  };
  const result = await Electronic.create(creature);

  return result;
}


async function getAll() {
  return Electronic.find({}).lean().populate('owner').populate('buyingList');
}

async function getById(id) {
  return Electronic.findById(id).lean().populate('owner').populate('buyingList');
}

async function find(location) {
  return Electronic.find({ location: { $regex: location, $options: "i" } }).lean();
}

async function edit(id, data) {
  return Electronic.updateOne({ _id: id }, { $set: data }, { runValidators: true });
}

async function del(id) {
  return Electronic.findByIdAndDelete(id);
}

async function buy(electronicId,userId){
  return Electronic.findByIdAndUpdate(electronicId,{$push : {buyingList : userId}})    // CHANGE FUNCTION NAME AND PROPERTIES ACCORDING TO THE TASK
}

module.exports = {
  create,
  getAll,
  getById,
  find,
  edit,
  del,
  buy,
};
