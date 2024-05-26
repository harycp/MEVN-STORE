const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["https://mevn-store-full.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/img", express.static(path.join(__dirname, "./public/img")));

const db = require("./app/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.log("Cannot connect to database", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("Hy Everyone");
});

app.get("/api", (req, res) => {
  res.send("Hy Everyone");
});

require("./app/routes/product.routes")(app);
require("./app/routes/order.routes")(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
