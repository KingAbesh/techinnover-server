const mongoose = require("mongoose");

const eCollectionSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    familyMembers: [
      {
        name: {
          type: String,
          required: true,
        },
        relationship: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

eCollectionSchema.set("toJSON", {
  transform(_doc, result) {
    const ret = {
      id: result._id,
      firstname: result.firstname,
      lastname: result.lastname,
      email: result.email,
      age: result.age,
      birth_date: result.birth_date,
      avatar: result.avatar,
      familyMembers: result.familyMembers,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
    return ret;
  },
});

module.exports = mongoose.model("ECollection", eCollectionSchema);
