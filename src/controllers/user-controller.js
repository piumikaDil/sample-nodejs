const { isErrored } = require("stream");
const userService = require("../services/user-service");
const userValidate = require("../validator/user-validate");
module.exports = {
  get: async (req, res) => {
    console.log("get Success");
  },
  createUser: async (req, res) => {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA : ", req.body);
    const { email, name, role, password } = req.body;
    try {
      if (
        (userValidate.ValidateEmail(email),
        userValidate.ValidateString(name),
        userValidate.ValidateString(password),
        userValidate.ValidateString(role))
      ) {
        const result = await userService.createUser(req);
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
      console.error(error.message);
      res.status(500).send({
        message: error.message,
      });
    }
  },
  updateuserImage: async function (req, res) {
    try {
      const result = await userService.updateUserImage(req);
      if (result.success) {
        res.send(JSON.stringify(result));
      } else {
        res.status(400).send({
          message: result.message,
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  },

  userLogin: async (req, res) => {
    try {
      const result = await userService.userLogin(req, res);
      console.log("Result >>>>>>>> : ", result);
      if (!result.success) {
        res.status(400).send({
          message: result.message,
        });
      }
      if (result.success === true) {
        // res.json(result,"Login success!");
        res.status(200).send({ result });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
