const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname+'../public/index.html')))
const ytdl = require("ytdl-core");

app.get("/", (req, res) => {
  res.render("index");
  let url = req.query.url;
  try {
    if (url === "") {
      console.log(url);
    } else {
      let videPath = url.split("?")[1].split("=")[1].toString();
      console.log(videPath);
      ytdl(`${url}`).pipe(fs.createWriteStream(`${videPath}.mp4`));
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log("listen" + port);
});
