const User = require("../../Model/Accommodation/userModel");

//get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// add a new user
const addUsers = async (req, res, next) => {
  const {
    name,
    country,
    accommodations,
    destinations,
    activities,
    accommodationsRating,
    destinationsRating,
    activitiesRating,
  } = req.body;



// Creating a new user instance
  try {
    const newUser = new User({
      name,
      country,
      accommodations,
      destinations,
      activities,
      accommodationsRating,
      destinationsRating,
      activitiesRating,
    });



// Saving the new user to the database
    await newUser.save();
    return res.status(200).json({ newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



//get a user by id
const getById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



//update a user
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    country,
    accommodations,
    destinations,
    activities,
    accommodationsRating,
    destinationsRating,
    activitiesRating,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        country,
        accommodations,
        destinations,
        activities,
        accommodationsRating,
        destinationsRating,
        activitiesRating,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ updatedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// delete user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ deletedUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
  getAllUsers,
  addUsers,
  getById,
  updateUser,
  deleteUser,
};
