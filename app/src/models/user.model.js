const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'CLIENT', 'AGENT'],
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'DELETED'],
      default: 'ACTIVE',
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          if (value.length < 8) {
            throw new Error('Password must be at least 8 characters long');
          }

          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isPhoneTaken = async function (phone, excludeUserId) {
  const user = await this.findOne({ phone, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;

  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
