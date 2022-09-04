const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

// Schema to create Post model
const userSchema = new Schema(
  {
    username: {
      type: String,
      default: "",
      unqiue: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: "",
      unqiue: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ]
  }
);

// Create a virtual property `tagCount` that gets the amount of comments per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our Post model
const User = model('user', userSchema);

module.exports = User;
