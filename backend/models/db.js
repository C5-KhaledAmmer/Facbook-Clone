const mongoose = require("mongoose");

// connecting to mongodb
mongoose.connect(process.env.c).then(
  () => {
    console.log("DB Ready To Use");
  },
  (err) => {
    console.log(err);
  }
);
