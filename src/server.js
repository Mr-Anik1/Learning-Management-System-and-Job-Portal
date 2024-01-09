require("dotenv").config();
const http = require("http");
const { app } = require("./app");
const { dbConnect } = require("./db");

// Create server
const server = http.createServer(app);

const PORT = process.env.PORT;

// DataBase connect and server listen
const start = async () => {
  try {
    // DataBase Connection
    await dbConnect();

    // Server listen
    server.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
