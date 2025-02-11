require("dotenv").config();

module.exports = {
  token: process.env.DISCORD_TOKEN,
  port: process.env.PORT || 8888,
  pingUrl: process.env.PING_URL,
};
