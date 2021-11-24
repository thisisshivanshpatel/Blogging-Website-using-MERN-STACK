require("./Database/connection");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/article", require("./routes/Articlerouter"));

app.listen(PORT, () => {
  console.log(`server is listening to the port number ${PORT}`);
});
