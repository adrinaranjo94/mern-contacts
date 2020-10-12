const User = require("../database/models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200);
    res.send({ users: users || [] });
  } catch (error) {
    res.status(503);
    res.send({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    if (req.params.userId) {
      const user = await User.findById(req.params.userId);
      if (user) {
        res.status(200);
        res.send({ user: user });
      } else {
        res.status(404);
        res.send({ message: "user not found" });
      }
    } else {
      res.status(400);
      res.send({ message: "missing userId" });
    }
  } catch (error) {
    res.status(503);
    res.send({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { user } = req.body;
    if (user) {
      const userToSave = new User({ ...user });
      await userToSave.save();
      res.status(201);
      res.send({ user: userToSave });
    } else {
      res.status(400);
      res.send({ message: "user object not found" });
    }
  } catch (error) {
    res.status(503);
    res.send({ message: error.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    if (req.params.userId) {
      const user = await User.findById(req.params.userId);
      if (user) {
        await User.findByIdAndDelete(req.params.userId, (err, docs) => {
          if (err) {
            res.status(503);
            res.send({ message: error.message });
          } else {
            res.status(200);
            res.send({ user: docs, message: "user deleted" });
          }
        });
      } else {
        res.status(404);
        res.send({ message: "user not found" });
      }
    } else {
      res.status(400);
      res.send({ message: "missing userId" });
    }
  } catch (error) {
    res.status(503);
    res.send({ message: error.message });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    if (req.params.userId) {
      const userDB = await User.findById(req.params.userId);
      if (userDB) {
        const { user } = req.body;
        let emailExists = false;

        if (user.email) {
          const checkUserEmail = await User.findOne({ email: user.email });

          if (checkUserEmail) {
            if (checkUserEmail._id == req.params.userId) {
              emailExists = false;
            } else {
              emailExists = true;
            }
          } else {
            emailExists = false;
          }
        }
        console.log(emailExists);
        if (!emailExists) {
          delete user._id;
          await User.findByIdAndUpdate(
            req.params.userId,
            { $set: { ...user } },
            { new: true },
            (err, result) => {
              if (err) {
                res.status(400);
                res.send({ message: err });
              } else {
                res.status(201);
                res.send({ user: result });
              }
            }
          );
        } else {
          res.status(503);
          res.send({ message: "email: The email address is already taken!" });
        }
      } else {
        res.status(404);
        res.send({ message: "user not found" });
      }
    } else {
      res.status(400);
      res.send({ message: "missing userId" });
    }
  } catch (error) {
    res.status(503);
    res.send({ message: error.message });
  }
};
