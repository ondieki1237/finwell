const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  kycData: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profession: { type: String },
    contact: { type: String },
    country: { type: String },
  },
});


userSchema.pre('save',async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN}
  );
  return token;
}
const User=mongoose.model('User',userSchema);
module.exports=User;