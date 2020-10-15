const dotenv = require("dotenv");
const path = require("path");

const env = process.env.NODE_ENV || "development";

const envPath = path.join(__dirname, "../..", ".env");

let cache;

module.exports = () => {
  if (!cache) {
    dotenv.config({ path: envPath });
    cache = Object.freeze({
      env,
      version: process.env.API_VERSION || "v1",
      port: process.env.PORT || "3000",
      secrets: {
        jwtSecret: process.env.JWT_SECRET || "",
        mongodbURL: process.env.MONGODB_URL || "",
      },
    });
  }
  return cache;
};
