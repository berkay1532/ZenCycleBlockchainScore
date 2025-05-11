const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http"); // http modülünü ekledik
const ScoreRoutes = require("./routes/ScoreRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  c;
  res.send("API is running...");
});

// endpoint
app.use("/score", ScoreRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
