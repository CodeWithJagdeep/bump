const client = require("../services/botService");

/**
 * Handles Discord events like errors.
 */
client.on("error", (error) => {
  console.error("❌ Discord Client Error:", error);
});

module.exports = client;
