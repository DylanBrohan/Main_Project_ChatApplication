// If in production mode run this else -
if (process.env.NODE_ENV === "production") {
  module.exports = require("./keys_prod");
} else {
  module.exports = require("./keys_dev");
}

//makes the object available outside file
// module.exports = {
//   mongoURI:
//     "mongodb://DylanBrohan:Thegodfather00@ds259463.mlab.com:59463/chatai",
//   secretOrKey: "secret"
// };
