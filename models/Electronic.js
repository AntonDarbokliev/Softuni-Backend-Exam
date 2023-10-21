const { Schema, Types, model, default: mongoose } = require("mongoose");

const electronicSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: [10, "Name should be at least 10 characters long"],
  },
  type: {
    type: String,
    required: true,
    minLength: [2, "Type should be at least 2 characters long"],
  }, //ADJUST PROPERTIES ACCORDING TO THE TASK
  damages: {
    type: String,
    required: true,
    minLength: [10, "Damages field should be at least 10 characters long"],
  },
  imageUrl: { 
    type: String,
     required: [true,'Image url is required'],
     validate: {
      validator: function (value) {
        return /^https?:\/\//.test(value);
      },
      message: "Image url should start with either http:// or https://",
    },
     },
  description: {
     type: String,
      required: true,
      minLength: [10, "Damages field should be at least 10 characters long"],
      maxLength: [200, "Damages field shouldn't be more than 200 characters long"],
    },
  production: {
     type: Number,
      required: true,
      min: [1900,'Production year can\'t be older than 1900'],
      max: [2023,'Production year can\'t be more recent than 2023']
    },
  exploitation: {
     type: Number,
      required: true,
      min: [1,'Exploitation can\'t be less than 1 ']
    },
  price: { 
    type: Number,
     required: true,
     min: [1, 'Price can\'t be less than one']
     },
  buyingList: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: { type: Types.ObjectId, ref: "User" },
});

const Electronic = model("Electronic", electronicSchema);
module.exports = Electronic;
