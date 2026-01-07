const express = require("express");
const app = express();
const cors = require("cors");
require("./db/db");
const saasRoute = require("./routes/saasRoute");

app.use(express.json());
app.use(cors());
app.use("/api", saasRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});