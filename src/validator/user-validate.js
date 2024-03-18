const validator = require("validator");

 exports.ValidateEmail = async (email) => {
   try {
     var result = validator.isEmail(email);
     return result;
   } catch (error) {
     throw error;
   }
 };

 exports.ValidateString = async (value) => {
   try {
     if (value === undefined || value === null || typeof value !== "string") {
       return false;
     }
     return true;
   } catch (error) {
     throw error;
   }
 };
