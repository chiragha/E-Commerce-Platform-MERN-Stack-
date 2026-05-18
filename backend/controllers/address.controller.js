import { Address } from "../models/address.model.js";

// SAVE ADDRESS
export const saveAddress = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      fullName,
      mobileNumber,
      pincode,
      city,
      state,
      country,
      addressLine,
      landmark,
    } = req.body;

    const address = await Address.create({
      userId,
      fullName,
      mobileNumber,
      pincode,
      city,
      state,
      country,
      addressLine,
      landmark,
    });

    res.status(201).json({
      message: "Address saved successfully",
      address,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to save address",
    });
  }
};

// GET USER ADDRESS
export const getAddresses = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await Address.find({
      userId,
    });

    res.status(200).json({
      addresses,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch addresses",
    });
  }
};

// DELETE ADDRESS
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    await Address.findByIdAndDelete(addressId);

    res.status(200).json({
      message: "Address deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};
