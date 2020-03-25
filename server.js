const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.json({ msg: "Contact keeper API" });
});

//Define our routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
