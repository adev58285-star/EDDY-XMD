
const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "antimention",
  categorie: "Group",
  reaction: "🛡️"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, isAdmin, isBotAdmin } = commandeOptions;

  if (!verifGroupe) return repondre("This command is for groups only.");
  if (!isAdmin) return repondre("Access denied. This command is for Admins only.");
  if (!isBotAdmin) return repondre("Please make the bot an admin first.");

  if (!arg || arg.length === 0) {
    return repondre("Usage:\n*antimention on* - Enable protection\n*antimention off* - Disable protection");
  }

  const status = arg.toLowerCase();

  if (status === "on") {
    global.antimention = true; // Temporary state. Ideally, link this to your MongoDB.
    repondre("🛡️ **Anti-Mention is now ENABLED.** The bot will delete any unauthorized tags.");
  } else if (status === "off") {
    global.antimention = false;
    repondre("🛡️ **Anti-Mention is now DISABLED.**");
  } else {
    repondre("Please use 'on' or 'off'.");
  }
});
