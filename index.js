
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");


dotenv.config();   // Load environment variables from .env file


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,  // Use new URL parser
  useUnifiedTopology: true, // Use new Server Discovery and Monitoring engine
})
  .then(() => {  // Connection successful
    console.log("Connected to MongoDB");
    app.listen(8800, () => {
      console.log("Backend server is running!");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });


  //middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);