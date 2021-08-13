if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const routers = require("./routes");
const errorHandler = require("./middleware/errorHandler");
//==BODY PARSER==
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routers);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
