
const PORT = 3001;
var cors = require('cors')
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
    app.listen(PORT, () => {
      console.log("Backend server is running on PORT: ", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });


//configuring CORS
var whitelist = ['https://app.myconnectlink.com', 'http://app.myconnectlink.com','https://localhost:3000','http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}



//root URL
   app.get('/', (req, res) => {
    res.send('ConnectLink Backend is running!')
  })
  
 
 
 

  //middleware
app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);