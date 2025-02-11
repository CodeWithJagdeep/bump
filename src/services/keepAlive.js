const axios = require("axios");
const config = require("../config/config");

/**
 * Prevents the bot from going idle by sending periodic requests.
 */
const keepAlive = () => {
  setInterval(async () => {
    try {
      await axios.get("https://bump-i7b9.onrender.com");
      console.log("🔄 Sent dummy request to keep bot alive.");
    } catch (err) {
      console.log("⚠️ Dummy request failed (ignored).");
    }
  }, 60000); // Every 1 minute
};

module.exports = keepAlive;
