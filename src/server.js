require("dotenv").config();
const express = require("express");
const cors = require("cors");
const videoRoutes = require("./routes/videoRoutes");
const videoCategoryRoutes = require("./routes/videoCategoryRoutes");
// const logger = require("morgan");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
// app.use(logger("tiny"));

app.use("/api/v1/videos", videoRoutes);
app.use("/api/v1/videoCategories", videoCategoryRoutes);

app.listen(port, () => console.log(`app listening at port ${port}`));
