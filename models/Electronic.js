const { Schema, Types, model, default: mongoose } = require("mongoose");

const creatureSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },              //ADJUST PROPERTIES ACCORDING TO THE TASK
  damages: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  production: { type: Number, required: true },
  exploitation: { type: Number, required: true },
  price: { type: Number, required: true },
  buyingList: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: { type: Types.ObjectId , ref : 'User'},
});

const Electronic = model('Electronic', creatureSchema)
module.exports = Electronic  