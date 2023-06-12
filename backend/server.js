const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handling uncaught exception eg. console.log(youtube) and youtube is not defined
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});
// Config
dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDatabase();

const PORT = 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// console.log(youtube);
//Unhandled promise rejection  , when database is not connected eg. wrong URI
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
