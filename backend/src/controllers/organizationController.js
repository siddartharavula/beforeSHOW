const Organization = require("../models/organization.model");

const createOrganization = async (req, res) => {
  try {
    const { name, city, state, logo } = req.body;

    if (!name || !city || !state || !logo) {
      return res.status(400).json({
        message: "Name, city, state and logo are required",
      });
    }

    const existingOrganization = await Organization.findOne({
      name,
    });

    if (existingOrganization) {
      return res.status(409).json({
        message: "Organization already exists",
      });
    }

    const organization = await Organization.create({
      name,
      city,
      state,
      logo,
    });

    return res.status(201).json({
      message: "Organization created successfully",
      organization,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


const getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({
      isActive: true,
    });

    return res.status(200).json({
      organizations,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findOne({
      _id: req.params.id,
      isActive: true,
    });

    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    return res.status(200).json({
      organization,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
};