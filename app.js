const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();   // Load environment variables from .env file

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Backend server is running on PORT:", PORT);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// CORS Configuration
const whitelist = ['https://app.myconnectlink.com', 'http://app.myconnectlink.com', 'https://localhost:3000', 'http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],  // Add the methods you need
  allowedHeaders: ["Content-Type", "Authorization"],  // Add the headers you need
};

app.use(cors(corsOptions));

// Root URL
app.get('/', (req, res) => {
  res.send('ConnectLink Backend is running!');
});

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
