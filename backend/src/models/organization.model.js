const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  logo: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
    trim: true,
  },

  state: {
    type: String,
    required: true,
    trim: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
});

const Organization = mongoose.model(
  "Organization",
  organizationSchema,
);

module.exports = Organization;