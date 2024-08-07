const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/api/users");
const conversationRoutes = require("./routes/api/conversations");

//Always require and configure near the top
require("dotenv").config();
//connect to the database must come after env
require("./config/database");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
// there's no need to mount express.urlencoded middleware
// why is that?
app.use(express.json());
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Put API routes here, before the "catch all" route
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

app.use("/api/conversations", conversationRoutes);

// mongoose.connect(`${process.env.DATABASE_URL}`, {useNewUrlParser: true, useUnifiedTopology: true})
// .then (()=>{
//   app.listen(PORT, () =>{
//     console.log(`Server running on port ${PORT}`);
//   });

// })
// .catch((error)=>{
//   console.error(`Database connection error:`, error);
// })
// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
