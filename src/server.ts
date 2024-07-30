/* eslint-disable no-console */
import mongoose from "mongoose";

// Import the express app
import app from "./app";
import config from "./app/config";

// Connect to the database
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("Connected to the database");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}

// Call the main function
main();
