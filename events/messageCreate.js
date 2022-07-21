const discord = require("discord.js");
const superagent = require("superagent");
const translate = require("@vitalets/google-translate-api");

module.exports = async (client, message) => {
  const discord = require("discord.js");

  if (message.author.bot) {
    if (message.author.id === client.user.id) return;
    if (message.channel.id === "630152042194665493") {
      const attachment = new discord.MessageAttachment(
        "https://i.imgur.com/0qDm0YN.png",
        "parceria.png"
      );
      return message.channel.send({ files: [attachment] });
    }
  }

  if (message.channel.type === "news") {
    message.crosspost();
  }

  if (message.author.bot) return 0;

  client.emit("checkMessage", message);

  if (message.channel.id === "962803914208600124") {
    let convite =
      /((discord|invite)\.(gg|io|me|plus|link|io|gg|li)|discordapp\.com\/invite)\/.+/gi.test(
        message.content
      );
    if (convite === false) {
      message.delete();
      return message.channel
        .send({
          content: `sua parceria foi automaticamente negada por não possuir um convite válido! Tente novamente com algo válido!`,
        })
        .then((msg) => {
          setTimeout(() => msg.delete(), 30000);
        });
    }
    setTimeout(function () {
      message.delete();
      message.channel
        .send({ content: "seu pedido de parceria foi enviado para análise!" })
        .then((msg) => {
          setTimeout(() => msg.delete(), 120000);
        });
    }, 5000);
          const row = new discord.MessageActionRow().addComponents(
      new discord.MessageButton()
        .setCustomId('ap')
        .setLabel('Parceria Aceita')
        .setStyle('SUCCESS')
    ).addComponents(
      new discord.MessageButton()
        .setCustomId('rp')
        .setLabel('Parceria Rejeitada')
        .setStyle('DANGER')
    )
    client.channels.cache.get("962798017726001203").send({
      content:
        "```" +
        message.content.replace(/(@here|@everyone)/g, "").replace("`", "") +
        "\nRep: <@" +
        message.author.id +
        ">``` <@" +
        message.author.id +
        "> <@&928334170143490159>",
      components: [row],
    });
  }

  if (
    message.channel.id === "600300473848823809" &&
    message.content.includes("parceria")
  ) {
    message.reply({
      content:
        "Ooooooops! Recomendaria-te enviares a tua mensagem de parceria em <#962803914208600124> e nossa equipe analisará assim que puder!",
    });
  }

  if (message.channel.id === "630152042194665493") {
    const attachment = new discord.MessageAttachment(
      "https://i.imgur.com/0qDm0YN.png",
      "parceria.png"
    );
    return message.channel.send({
      content: "<@&926845797553807401>",
      files: [attachment],
    });
  }

  // [ - O BOT REPETE ]

  if (
    message.content.startsWith("boa tarde") ||
    message.content.startsWith("Boa tarde")
  ) {
    message.reply({ content: "Boa tarde" });
  }

  if (
    message.content.startsWith("boa noite") ||
    message.content.startsWith("Boa noite")
  ) {
    message.reply({ content: "Boa noite" });
  }

  if (
    message.content.startsWith("Bom dia") ||
    message.content.startsWith("bom dia")
  ) {
    message.reply({ content: "Bom dia" });
  }

  if (message.channel.id === "981668337127927848") {
    await translate(message.content, { to: "en" }).then(async (tapi) => {
      const { body } = await superagent
        .get(
          `https://api.udit.tk/api/chatbot?message=${encodeURIComponent(
            tapi.text
          )}&gender=male&name=Império%20Network`
        )
        .catch((e) => {
          0;
        });
      await translate(body.message, { to: "pt" }).then((rev) => {
        message.reply({ content: rev.text.replace(" -", "-") });
      });
    });
  }

  let prefix = "i?";

  if (
    !message.content.startsWith(prefix) ||
    message.author.bot ||
    message.channel.type === "dm"
  )
    return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmda = args.shift().toLowerCase();
  let command =
    client.commands.get(cmda) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmda));
  if (!command) return;

  try {
    command.run(client, message, args);
  } catch (error) {
    message.reply({ content: `Houve um erro ao executar esse comando!` });
  }
};
