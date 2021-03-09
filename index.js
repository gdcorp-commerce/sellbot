const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(express.static("public"));

// global configs
global.configs = require("./lib/configs");

// redirect home to Connect demo
app.get("/", (_req, res) => {
  res.redirect("/link");
});

app.use("/link", require("./routes/link"));
app.use("/collect", require("./routes/collect"));

const port = 1347;
app.listen(port, () => {
  console.log(`Sellbot listening at ${port}`);
});
