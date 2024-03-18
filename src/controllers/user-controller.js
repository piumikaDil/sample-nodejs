const userService = require("../services/user-service");
const userValidate = require("../validator/user-validate");
module.exports = {
  get: async (req, res) => {
    console.log("get Success");
  },
  createUser: async (req, res) => {
    console.log(req.body);
    const { email, name, role, password } = req.body;
    try {
      if (
        (userValidate.ValidateEmail(email),
        userValidate.ValidateString(name),
        userValidate.ValidateString(password),
        userValidate.ValidateString(role))
      ) {
        const result = await userService.createUser(req.body);
        console.log("RESULT : " + JSON.stringify(result));
        if (!result.success) {
          res.status(400).send({
            message: result.message,
          });
        } else {
          res.send(JSON.stringify(result));
        }
      } else {
        res.status(400).send({
          message: "Something went wrong",
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
