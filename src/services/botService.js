const { Client } = require("discord.js-selfbot-v13");
const { token } = require("../config/config");
const { default: axios } = require("axios");

const client = new Client();

client.on("ready", () => {
  console.log(`✅ ${client.user.username} is ready!`);
  sendMessage(); // Send message immediately
  setInterval(sendMessage, 2.1 * 60 * 60 * 1000); // Every 2.5 hours
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

      if (!channel) {
        console.error(`⚠️ Channel not found! (ID: ${channelId.ChannelId})`);
        continue;
      }

      const guild = channel.guild;
      const guildName = guild ? guild.name : "Unknown Guild";
      const channelName = channel.name || "Unknown Channel";

      console.log(
        `📌 Sending bump in: 
           ➤ Guild: ${guildName} (ID: ${guild?.id || "N/A"})
           ➤ Channel: ${channelName} (ID: ${channel.id})`
      );

      let count = 0;

      const intervalId = setInterval(async () => {
        if (count >= 2) {
          clearInterval(intervalId);
          return;
        }

        try {
          await channel.sendSlash("302050872383242240", "bump");
          console.log(`✅ Bump sent in #${channelName} of ${guildName}`);
          count++;
        } catch (slashError) {
          console.error(
            `❌ Error sending slash command in #${channelName}:`,
            slashError
          );
        }
      }, 5000);
    }
  } catch (error) {
    console.error("❌ Error fetching bump channels:", error);
  }
};

// Log in the bot using a secure token
client
  .login(
    "ODMxMjIyODIyODg5MzI0NTc2.GboCKb.ikhA_WZ7ykM0tZ-_nm8XNp9Dba6wetDHqu87Sw"
  )
  .catch((err) => console.error("❌ Login failed:", err));

module.exports = client;
