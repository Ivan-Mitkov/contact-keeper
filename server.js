const express = require("express");
const connectDb=require('./config/db')

const app = express();
//connect to DB
connectDb()
//Init middleware
//re body
app.use(express.json({extended:false}))
app.get("/", (req, res) => {
  res.json({ msg: "Contact keeper API" });
});

//Define our routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
