const crypto = require('crypto')
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'please tell us your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: String,
  role: {
  type:String,
  enum: ['user','guide','lead-guide','admin'],
  default: 'user'
  },
  password: {
    type: String,
    required: [true, 'please tell us your pass'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your pass'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'password are not same',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken :String,
  passwordResetExpires: Date
});

userSchema.pre('save', async function (next) {
  //only run  this function if password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function(next){
 if (!this.isModified("password") || this.isNew) return next();

 this.passwordChangedAt =Date.now() - 1000;
 next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log("sgdd",changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};
userSchema.methods.createPasswordResetToken =function(){
 const resetToken = crypto.randomBytes(32).toString('hex');
 this.passwordResetToken = crypto
 .createHash('sha256')
 .update(resetToken)
 .digest('hex');
console.log({},this.passwordResetToken)
 this.resetToken = Date.now() + 10 * 60 * 1000;
console.log(resetToken)
 return resetToken;
}
const User = mongoose.model('user', userSchema);

module.exports = User;
