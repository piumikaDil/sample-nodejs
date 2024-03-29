const User = require("../models/user-model");
const { storage } = require("../dbConfig/cloudinary-config");
const multer = require("multer");
const upload = multer({ storage });
const cloudinary = require("../dbConfig/cloudinary-config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

module.exports = {
  get: async (req, res) => {
    console.log("My service");
  },

  createUser: async (req) => {
    const { email } = req.body;
    console.log(req.body);
    try {
      const existUser = await User.findOne({ email });
      if (existUser === null) {
        const user = new User(req.body);
        const data = await user.save();
        console.log(data);
        return { data: data, statusCode: 201, success: true };
      } else {
        return { success: false, message: "User already exists" };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  updateUserImage: async (req, res) => {
    let StoryImage = null;
    if (req.file) {
      StoryImage = await cloudinary.cloudinary.uploader.upload(
        req.file.path,
        { folder: "UserCleanImage" },
        function (error, result) {
          console.log(result, error);
        }
      );
    }
    let image = "";
    if (StoryImage != null) {
      image = StoryImage.secure_url;
    }

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            image: {
              public_id: StoryImage.public_id,
              url: StoryImage.secure_url,
            },
          },
        },
        { new: true }
      );
      if (user) {
        return { data: user, statusCode: 201, success: true };
      } else {
        return { success: false, statusCode: 400, message: "User not found" };
      }
    } catch (error) {
      logger.error(error);
      throw error;
    }
  },

  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return {
          data: user,
          statusCode: 400,
          success: false,
          message: "User not found",
        };
      }
      //   console.log(".....................", password.trim);
      //   console.log(".....................", user.password);
      //   const passwordMatch = await bcrypt.compare(String(password),String(user.password));

      //   console.log(">>>>>>>>>>>>>>>>>>>>>>> : ", passwordMatch);
      if (password.trim() !== user.password.trim()) {
        return {
          data: user,
          statusCode: 401,
          success: false,
          message: "Authentication failed",
        };
      }
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return {
        data: token,
        statusCode: 200,
        success: true,
        message: "Login Success!",
      };
    } catch (error) {
      console.error(error);
    }
  },
};
