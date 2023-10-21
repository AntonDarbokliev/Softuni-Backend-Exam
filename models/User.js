const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");

//DON'T FORGET TO ALTER USER SCHEMA PROPERTIES DEPENDING ON THE TASK

const userSchema = new Schema({
  username: {
    type : String,
    required : [true, 'Username is required'],
    minLength: [3, "Username should be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    minLength: [10, "Email should be at least 10 characters long"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [4, "Password should be at least 4 characters long"],
    validate: {
      validator: function (value) {
        return /^[A-Za-z0-9]+$/.test(value);
      },
      message: "Password can only use english letters and numbers",
    },
  },
});

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) throw new Error('The password is not correct.')
})

userSchema.pre("save", async function () {
  const hash = await bcrypt.hash(this.password, 10);      //PRE SAVE HOOK FOR HASHING PASSWORDS BEFORE SENDING TO DB
  this.password = hash;
});

const User = model("User", userSchema);
module.exports = User;
