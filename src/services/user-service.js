const User = require("../models/user-model");

module.exports = {
  get: async (req, res) => {
    console.log("My service");
  },

  createUser: async (body) => {
    const { email } = body;
    try {
      const existUser = await User.findOne({ email });
      console.log("USER : ", existUser);
      if (existUser === null) {
        const user = new User(body);
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
};

//   if (!user)
//     return res.json({
//       success: false,
//       message: 'user not found, with the given email!',
//     });
