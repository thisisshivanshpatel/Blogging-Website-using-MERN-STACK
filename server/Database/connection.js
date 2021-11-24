const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/blog";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connected to Database`);
  })
  .catch((e) => {
    console.log(`connection not established with database`);
    process.exit(1);
  });
