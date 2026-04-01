const { zokou } = require("../framework/zokou")
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien")

zokou({ nomCom: "antilink", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {
  var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;

  if (!verifGroupe) {
    return repondre("❌ This command is for groups only.");
  }

  if (superUser || verifAdmin) {
    const enetatoui = await verifierEtatJid(dest);

    try {
      if (!arg || !arg[0] || arg === ' ') {
        return repondre(
          `╔══════════════════╗
║   🔗 *ANTI-LINK*   ║
╚══════════════════╝

📌 *Commands:*

▸ *antilink on* — Enable antilink
▸ *antilink off* — Disable antilink
▸ *antilink action/delete* — Delete link only
▸ *antilink action/remove* — Delete link + remove user
▸ *antilink action/warn* — Warn user first

ℹ️ Default action is *delete*`
        );
      }

      if (arg[0] === 'on') {
        if (enetatoui) {
          repondre("✅ Antilink is already enabled for this group.");
        } else {
          await ajouterOuMettreAJourJid(dest, "oui");
          repondre("✅ *Antilink enabled!*\nAll links will be deleted automatically.");
        }

      } else if (arg[0] === 'off') {
        if (enetatoui) {
          await ajouterOuMettreAJourJid(dest, "non");
          repondre("🔴 *Antilink disabled.*");
        } else {
          repondre("❌ Antilink is not enabled for this group.");
        }

      } else if (arg.join('').split("/")[0] === 'action') {
        let action = (arg.join('').split("/")[1]).toLowerCase();
        if (action === 'remove' || action === 'warn' || action === 'delete') {
          await mettreAJourAction(dest, action);
          repondre(`✅ *Antilink action updated!*\nCurrent action: *${action}*`);
        } else {
          repondre("❌ Available actions are:\n▸ delete\n▸ remove\n▸ warn");
        }

      } else {
        repondre(
          `╔══════════════════╗
║   🔗 *ANTI-LINK*   ║
╚══════════════════╝

📌 *Commands:*

▸ *antilink on* — Enable antilink
▸ *antilink off* — Disable antilink
▸ *antilink action/delete* — Delete link only
▸ *antilink action/remove* — Delete link + remove user
▸ *antilink action/warn* — Warn user first`
        );
      }

    } catch (error) {
      repondre("❌ Error: " + error);
    }

  } else {
    repondre("❌ You are not authorized to use this command. Admins only.");
  }
});
