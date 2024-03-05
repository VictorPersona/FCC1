const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", function (req, res) {
  console.log("Server is running gracefully");
  const filePath = path.join(__dirname, "index.html");
  res.sendFile(filePath);
});

app.get("/api", function (req, res) {
  const requestedDate = new Date();
  const unixTime = parseInt(requestedDate.getTime());
  const utcFormatDate = requestedDate.toUTCString();
  const response = { unix: unixTime, utc: utcFormatDate };
  console.log(response);
  res.json({ unix: unixTime, utc: utcFormatDate });
});

app.get("/api/:date", function (req, res) {
  const dateString = req.params.date;
  let requestedDate;
  let isUnix = /^-?\d+$/.test(dateString);

  if (!dateString) {
    requestedDate = new Date();
  } else if (isUnix) {
    requestedDate = new Date(parseInt(dateString));
  } else {
    requestedDate = new Date(dateString);
  }
  if (isNaN(requestedDate.getTime())) {
    res.json({ error: "Invalid Date" });
    return;
  }

  const unixTime = parseInt(requestedDate.getTime());
  const utcFormatDate = requestedDate.toUTCString();
  const response = { unix: unixTime, utc: utcFormatDate };
  console.log(response);
  res.json({ unix: unixTime, utc: utcFormatDate });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
