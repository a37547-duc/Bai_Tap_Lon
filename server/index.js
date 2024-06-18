const express = require("express");
const { connectDB } = require("./db");
const bookRoutes = require("./route/bookRoutes"); // Import the bookRoutes module
const paymentRoutes = require("./route/paymentRoutes");
const cors = require("cors");
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Middleware để parse URL-encoded
app.use(express.urlencoded({ extended: true }));

// const axios = require("axios").default; // npm install axios
// const CryptoJS = require("crypto-js"); // npm install crypto-js
// // const uuid = require("uuid/v1"); // npm install uuid
// const moment = require("moment"); // npm install moment

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const port = 3000;

async function startServer() {
  // Kết nối tới MongoDB
  await connectDB();

  // route
  app.use("/", bookRoutes);

  // Bắt đầu lắng nghe yêu cầu
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
app.use("/", paymentRoutes);

// Gọi hàm để bắt đầu server
startServer();
