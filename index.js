const express = require("express");
const app = express();
app.set("view engine", "pug");
app.use(express.static("public"));

// redirect home to Connect demo
app.get("/", (_req, res) => {
  res.redirect("/connect");
});

// /connect is a demo of Connect wth Poynt
app.use("/connect", require("./routes/connect"));

const port = 1347;
app.listen(port, () => {
  console.log(`Sellbot listening at ${port}`);
});
