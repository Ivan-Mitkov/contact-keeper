const express = require("express");
const path = require("path");
const connectDb = require("./config/db");

const app = express();
//connect to DB
connectDb();
//Init middleware
//re body
app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.json({ msg: "Contact keeper API" });
});

//Define our routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
