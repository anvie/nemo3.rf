/** @type {import('next').NextConfig} */

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    loader: "custom",
  },
  serverRuntimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    jwtSecretUser: process.env.JWT_SECRET_USER,
  },
  env: {
    WHITELIST_MINT_READY: process.env.WHITELIST_MINT_READY === "true" || false,
    SMART_CONTRACT_ADDRESS: process.env.SMART_CONTRACT_ADDRESS,
    SMART_CONTRACT_DEPLOYED: true,
    REGULAR_MINT_READY: true,
    RSVP_VERSION: "2",
    RSVP_MINT_SIGNATURE_CHALLENGE_CODE: "eX3Q9c1xb"
    // NODE_ENV: process.env.NODE_ENV,
  }
};

module.exports = nextConfig;
