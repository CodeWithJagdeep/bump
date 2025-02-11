const { Client } = require("discord.js-selfbot-v13");
const config = require("../config/config");
const { token } = require("../config/config");
const { default: axios } = require("axios");

const client = new Client();

client.on("ready", () => {
  console.log(`✅ ${client.user.username} is ready!`);
  sendMessage(); // Send message immediately
  setInterval(sendMessage, 6200000); // Every 2.5 hours
});

/**
 * Sends a bump command in the designated channel.
 */
const sendMessage = async () => {
  try {
    const getChannelId = await axios.get(
      "https://obu-discordbot.onrender.com/allbump"
    );
    let bumpChannels = getChannelId.data.data;

    for (let channelId of bumpChannels) {
      const channel = client.channels.cache.get(channelId.ChannelId);
      //   console.log(channelId);
      if (!channel) {
        console.error("⚠️ Channel not found!");
        return;
      }

      setTimeout(async () => {
        try {
          await channel.sendSlash("302050872383242240", "bump");
          console.log("✅ Slash command sent!");
        } catch (slashError) {
          console.error("❌ Error sending slash command:", slashError);
        }
      }, 2000);
    }
  } catch (error) {
    console.error("❌ Error sending message:", error);
  }
};

// Log in the bot
client.login(
  "ODMxMjIyODIyODg5MzI0NTc2.GboCKb.ikhA_WZ7ykM0tZ-_nm8XNp9Dba6wetDHqu87Sw"
);

module.exports = client;
