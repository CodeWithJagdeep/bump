const { Client } = require("discord.js-selfbot-v13");

const client = new Client();

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);

  const CHANNEL_ID = "1327315258821443657"; // bot-testing
  const GUILD_ID = "1326785072182857729"; // Trial bot
  const sendMessage = async () => {
    // Fetch the channel
    const channel = client.channels.cache.get(CHANNEL_ID);

    if (!channel) {
      console.error("⚠️ Channel not found!");
      return;
    }

    try {
      setTimeout(async () => {
        try {
          // Send a slash command (verify the actual command)
          await channel.sendSlash("302050872383242240", "bump"); // Replace with correct bot ID
          console.log("✅ Slash command sent!");
        } catch (slashError) {
          console.error("❌ Error sending slash command:", slashError);
        }
      }, 2000);
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };
  // Send message immediately when bot starts
  sendMessage();

  // Schedule the function to run every 2 hours and 30 minutes
  setInterval(sendMessage, 6000000); // 2.5 hours in milliseconds
});

client.login(
  "ODMxMjIyODIyODg5MzI0NTc2.GboCKb.ikhA_WZ7ykM0tZ-_nm8XNp9Dba6wetDHqu87Sw"
);
